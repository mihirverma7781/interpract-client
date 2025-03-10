"use client";

import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { MicIcon } from "lucide-react";
import { StopCircleIcon } from "lucide-react";
import { WebcamIcon } from "lucide-react";
import { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import Webcam from "react-webcam";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle } from "lucide-react";
import { saveAnswer } from "@/redux/features/answer/answer-slice";

const RecordAnswerSection = ({
  questions,
  activeQuestion,
  answers,
  interviewId,
  setSaveLoading,
}) => {
  const { toast } = useToast();
  const dispatch = useDispatch();
  const {
    error,
    interimResult,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  const [userAnswer, setUserAnswer] = useState("");

  useEffect(() => {
    results.map((result) => {
      setUserAnswer((prevAns) => prevAns + result?.transcript);
    });
  }, [results]);

  const saveUserAnswer = async () => {
    if (isRecording) {
      stopSpeechToText();
      if (!userAnswer || userAnswer.length < 10) {
        toast({
          title: "Error",
          description: "Answer is to short. Please record again!",
        });
        return;
      } else {
        // Save answer to the database
        await dispatch(
          saveAnswer({
            questionId: activeQuestion + 1,
            userAnswer: userAnswer,
            correctAnswer: questions[activeQuestion]?.answer,
            question: questions[activeQuestion]?.question,
            interviewId: interviewId,
          }),
        ).finally(() => {
          setSaveLoading((prev) => !prev);
        });
        setUserAnswer(null);
      }
    } else {
      startSpeechToText();
    }
  };

  const checkIfAnswered = () => {
    console.log("active", activeQuestion);
    return answers?.filter(
      (answer) => answer?.questionId == activeQuestion + 1,
    );
  };

  return (
    <div>
      <div className=" relative flex flex-col justify-center items-center bg-gray-100 rounded-xl p-5 py-10">
        <WebcamIcon className="absolute  h-52 w-52 text-gray-500" />
        <Webcam
          style={{
            height: "auto",
            minHeight: 300,
            maxHeight: 400,
            zIndex: 10,
            width: "auto",
            borderRadius: 15,
          }}
        />
      </div>
      <div className="flex mt-4 flex-1">
        {answers?.length && checkIfAnswered().length > 0 ? (
          <Button
            variant="outline"
            className="border-green-500 text-green-500 hover:text-green-600 hover:border-green-600 hover:bg-green-100 mx-auto"
          >
            <CheckCircle /> Answered
          </Button>
        ) : (
          <Button
            variant="outline"
            className={
              isRecording
                ? `border-red-500 text-red-500 hover:text-red-600 hover:border-red-600 hover:bg-red-100 mx-auto animate-pulse`
                : `border-gray-500 text-gray-500 hover:text-gray-600 hover:border-gray-600 hover:bg-gray-100 mx-auto`
            }
            onClick={saveUserAnswer}
          >
            {isRecording ? (
              <>
                {" "}
                <StopCircleIcon /> <span> Stop Recording </span>
              </>
            ) : (
              <>
                <MicIcon className="w-4 h-4" /> <span>Record Answer </span>{" "}
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default RecordAnswerSection;
