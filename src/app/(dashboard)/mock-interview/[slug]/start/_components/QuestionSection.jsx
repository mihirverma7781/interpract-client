"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { Volume2 } from "lucide-react";
import { Lightbulb } from "lucide-react";
import { useState } from "react";

const QuestionSection = ({
  questions,
  activeQuestion,
  answers,
  setActiveQuestion,
}) => {
  const textToSpeech = (text) => {
    if ("speechSynthesis" in window) {
      const speech = new SpeechSynthesisUtterance(text);
      window.speechSynthesis.speak(speech);
    } else {
      alert("Your browser does not support text to speech");
    }
  };

  const checkIfAnswered = () => {
    console.log("active", activeQuestion);
    return answers?.filter(
      (answer) => answer?.questionId == activeQuestion + 1,
    );
  };

  return (
    <div className=" max-w-full overflow-x-hidden">
      <div className="grid grid-cols-5 gap-2">
        {questions?.length &&
          questions.map((question, index) => (
            <Button
              key={index}
              onClick={() => setActiveQuestion(index)}
              className={
                activeQuestion === index
                  ? `text-orange-500 border border-orange-500 flex`
                  : `text-sm border border-gray-200 flex`
              }
              variant="ghost"
            >
              {activeQuestion === index ? (
                <span className="flex items-center gap-1">
                  {" "}
                  <CheckCircle /> Que. #{index + 1}
                </span>
              ) : (
                <span> Que. #{index + 1}</span>
              )}
            </Button>
          ))}
      </div>

      <div className="mt-5 bg-white p-4 rounded-lg">
        <h2 className="font-medium leading-7 tracking-normal">
          {" "}
          <span className="font-bold text-orange-500 flex gap-2 items-center ">
            <Volume2
              className="text-orange-500 cursor-pointer"
              onClick={() => textToSpeech(questions[activeQuestion]?.question)}
            />
            Question:{" "}
          </span>
          {questions?.length && questions[activeQuestion]?.question}
        </h2>
      </div>

      <div className=" mt-4 border border-blue-400 rounded-lg p-4 bg-blue-100">
        <h2 className="flex gap-2 items-center text-blue-600 font-medium">
          <Lightbulb /> <strong> Note:</strong>
        </h2>
        <p className="text-sm text-blue-600 mt-2">
          Click on record answer when you want to answer the question. At the
          end of the interview we will give you the feedback along with the
          corrections for each of your answer to compare it.{" "}
        </p>
      </div>
    </div>
  );
};

export default QuestionSection;
