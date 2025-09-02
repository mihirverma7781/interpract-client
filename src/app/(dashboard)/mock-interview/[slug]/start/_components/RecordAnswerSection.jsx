"use client";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { MicIcon } from "lucide-react";
import { StopCircleIcon } from "lucide-react";
import { WebcamIcon } from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";
import Webcam from "react-webcam";
import { useToast } from "@/hooks/use-toast";
import { CheckCircle } from "lucide-react";
import { saveAnswer } from "@/redux/features/answer/answer-slice";
import InterviewTimer from "@/components/custom/InterviewTimer";

const RecordAnswerSection = ({
  questions,
  activeQuestion,
  answers,
  interviewId,
  setSaveLoading,
  elapsed,
  setElapsed
}) => {
  const { toast } = useToast();
  const dispatch = useDispatch();

  // Manual speech recognition state management
  const [isRecording, setIsRecording] = useState(false);
  const [userAnswer, setUserAnswer] = useState("");
  const [interimResult, setInterimResult] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const recognitionRef = useRef(null);
  const isInitializingRef = useRef(false);
  const webcamRef = useRef(null);
  const lastVideoTimeRef = useRef(-1);

  // Initialize speech recognition
  const initializeRecognition = useCallback(() => {
    if (
      !("webkitSpeechRecognition" in window) &&
      !("SpeechRecognition" in window)
    ) {
      toast({
        title: "Error",
        description: "Speech recognition not supported in this browser.",
      });
      return null;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();

    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = "en-US";
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      console.log("Speech recognition started");
      setIsRecording(true);
      isInitializingRef.current = false;
    };

    recognition.onresult = (event) => {
      console.log("Speech recognition result event:", event);
      let interim = "";
      let final = "";

      // Check if event.results exists and has length
      if (!event.results || event.results.length === 0) {
        console.log("No results in speech event");
        return;
      }

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const result = event.results[i];
        
        // Check if result exists and has transcript
        if (!result || !result[0] || typeof result[0].transcript !== 'string') {
          console.log("Invalid result structure at index", i);
          continue;
        }
        
        const transcript = result[0].transcript;
        
        if (result.isFinal) {
          final += transcript + " ";
        } else {
          interim += transcript;
        }
      }

      console.log("Final transcript:", final);
      console.log("Interim transcript:", interim);

      if (final.trim()) {
        setUserAnswer((prev) => {
          const newAnswer = (prev || "") + final;
          console.log("Updated answer:", newAnswer);
          return newAnswer;
        });
      }
      
      setInterimResult(interim);
    };

    recognition.onerror = (event) => {
      console.error("Speech recognition error:", event.error);
      setIsRecording(false);
      isInitializingRef.current = false;

      if (event.error === "aborted") {
        // This is expected when we manually stop
        return;
      }

      // Handle specific error cases
      let errorMessage = "Please try again.";
      switch (event.error) {
        case "no-speech":
          errorMessage = "No speech detected. Please speak clearly and try again.";
          break;
        case "audio-capture":
          errorMessage = "Microphone access denied. Please allow microphone access.";
          break;
        case "not-allowed":
          errorMessage = "Microphone permission denied. Please enable microphone access.";
          break;
        case "network":
          errorMessage = "Network error. Please check your connection and try again.";
          break;
        default:
          errorMessage = `Error: ${event.error}. Please try again.`;
      }

      toast({
        title: "Speech Recognition Error",
        description: errorMessage,
      });
    };

    recognition.onend = () => {
      console.log("Speech recognition ended");
      setIsRecording(false);
      setInterimResult("");
      isInitializingRef.current = false;
    };

    return recognition;
  }, [toast]);

  // Force stop any existing recognition
  const forceStopRecognition = useCallback(() => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.abort();
      } catch (error) {
        console.log("Error aborting recognition:", error);
      }
      recognitionRef.current = null;
    }
    setIsRecording(false);
    setInterimResult("");
    isInitializingRef.current = false;
  }, []);

  // Start recording
  const startRecording = useCallback(async () => {
    if (isInitializingRef.current || isRecording) {
      console.log("Already recording or initializing");
      return;
    }

    try {
      // Request microphone permission first
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch (permissionError) {
        console.error("Microphone permission denied:", permissionError);
        toast({
          title: "Microphone Access Required",
          description: "Please allow microphone access to record your answer.",
        });
        return;
      }

      // Force stop any existing recognition
      forceStopRecognition();

      // Wait a moment for cleanup
      await new Promise((resolve) => setTimeout(resolve, 200));

      isInitializingRef.current = true;
      const recognition = initializeRecognition();

      if (!recognition) {
        isInitializingRef.current = false;
        return;
      }

      recognitionRef.current = recognition;
      setUserAnswer("");
      setInterimResult("");

      recognition.start();
    } catch (error) {
      console.error("Failed to start recording:", error);
      isInitializingRef.current = false;
      setIsRecording(false);
      toast({
        title: "Error",
        description: "Failed to start recording. Please try again.",
      });
    }
  }, [isRecording, forceStopRecognition, initializeRecognition, toast]);

  // Stop recording
  const stopRecording = useCallback(() => {
    if (recognitionRef.current && isRecording) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.log("Error stopping recognition:", error);
        forceStopRecognition();
      }
    }
  }, [isRecording, forceStopRecognition]);

  // Main function to handle recording toggle and saving
  const handleRecordingAction = useCallback(async () => {
    if (isProcessing) return;

    setIsProcessing(true);

    try {
      if (isRecording) {
        // Stop recording and save
        stopRecording();

        // Wait for recording to stop
        await new Promise((resolve) => setTimeout(resolve, 500));

        const finalAnswer = (userAnswer || "").trim();
        
        console.log("Final answer to save:", finalAnswer);
        
        if (!finalAnswer || finalAnswer.length < 10) {
          toast({
            title: "Error",
            description: "Answer is too short. Please record again!",
          });
          setIsProcessing(false);
          return;
        }

        // Validate required data before saving
        if (!questions || !questions[activeQuestion]) {
          toast({
            title: "Error",
            description: "Question data not available. Please refresh and try again.",
          });
          setIsProcessing(false);
          return;
        }

        // Save answer to database
        setSaveLoading(true);
        const saveData = {
          questionId: activeQuestion + 1,
          userAnswer: finalAnswer,
          correctAnswer: questions[activeQuestion]?.answer || "",
          question: questions[activeQuestion]?.question || "",
          interviewId: interviewId,
        };
        
        console.log("Saving answer with data:", saveData);
        
        await dispatch(saveAnswer(saveData));
        setSaveLoading(false);

        toast({
          title: "Success",
          description: "Answer saved successfully!",
        });
      } else {
        // Start recording
        await startRecording();
      }
    } catch (error) {
      console.error("Recording action error:", error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
      setSaveLoading(false);
    } finally {
      setIsProcessing(false);
    }
  }, [
    isProcessing,
    isRecording,
    userAnswer,
    activeQuestion,
    questions,
    interviewId,
    dispatch,
    toast,
    setSaveLoading,
    stopRecording,
    startRecording,
  ]);

  // Cleanup when question changes
  useEffect(() => {
    forceStopRecognition();
    setUserAnswer("");
  }, [activeQuestion, forceStopRecognition]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      forceStopRecognition();
    };
  }, [forceStopRecognition]);

  const checkIfAnswered = () => {
    return answers?.filter(
      (answer) => answer?.questionId == activeQuestion + 1
    );
  };

  return (
    <div>
      <InterviewTimer elapsed={elapsed} setElapsed={setElapsed} />

      <div className="relative flex flex-col justify-center items-center bg-gray-100 rounded-2xl px-5 py-7">
        <WebcamIcon className="absolute h-52 w-52 text-gray-500" />
        <Webcam
          ref={webcamRef}
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

      {/* Display current transcript */}
      {(userAnswer || interimResult) && (
        <div className="mt-4 p-3 bg-gray-50 rounded-lg border">
          <p className="text-sm text-gray-600 mb-2">Current Answer:</p>
          <p className="text-gray-800">
            {userAnswer}
            {interimResult && (
              <span className="text-blue-600 italic">{interimResult}</span>
            )}
          </p>
        </div>
      )}

      <div className="flex mt-4 flex-1">
        {answers?.length && checkIfAnswered().length > 0 ? (
          <Button
            variant="outline"
            className="border-green-500 text-green-500 hover:text-green-600 hover:border-green-600 hover:bg-green-100 mx-auto"
            disabled
          >
            <CheckCircle className="w-4 h-4 mr-2" /> Answered
          </Button>
        ) : (
          <Button
            variant="outline"
            className={
              isRecording
                ? `border-red-500 text-red-500 hover:text-red-600 hover:border-red-600 hover:bg-red-100 mx-auto animate-pulse`
                : `border-blue-500 text-blue-500 hover:text-blue-600 hover:border-blue-600 hover:bg-blue-100 mx-auto`
            }
            onClick={handleRecordingAction}
            disabled={isProcessing || isInitializingRef.current}
          >
            {isProcessing ? (
              <>
                <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-gray-300 border-t-blue-600"></div>
                <span>Processing...</span>
              </>
            ) : isRecording ? (
              <>
                <StopCircleIcon className="w-4 h-4 mr-2" />
                <span>Stop & Save</span>
              </>
            ) : (
              <>
                <MicIcon className="w-4 h-4 mr-2" />
                <span>Record Answer</span>
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
};

export default RecordAnswerSection;