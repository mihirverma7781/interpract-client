"use client";

import { Button } from "@/components/ui/button";
import { fetchAllAnswers } from "@/redux/features/answer/answer-slice";
import { Volume2 } from "lucide-react";
import { ArrowRight } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import React from "react";
import { use, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

const FeedbackPage = ({ params }) => {
  const dispatch = useDispatch();
  const { slug } = use(params);

  const allAnswers = useSelector((state) => state.answer.answers);
  const answersLoading = useSelector((state) => state.answer.loading);

  const [activeQuestion, setActiveQuestion] = useState(0);
  const [rating, setRating] = useState(0);
  const [overAllRating, setOverallRating] = useState(0);

  useEffect(() => {
    dispatch(fetchAllAnswers({ id: slug }));
  }, []);

  useEffect(() => {
    const rating = allAnswers[activeQuestion]?.rating[0];
    setRating(rating);
  }, [answersLoading, allAnswers]);

  useEffect(() => {
    const rating = allAnswers?.map((answer) => answer.rating[0]);
    console.log("rating", rating);
    const overallRating =
      rating.reduce((a, b) => Number(a) + Number(b), 0) / allAnswers.length;
    setOverallRating(overallRating);
  }, [answersLoading, allAnswers]);

  if (answersLoading) {
    return <div> Loading... </div>;
  }

  return (
    <div className="flex flex-col">
      <div className="bg-white p-4 rounded-xl mb-6">
        <h1 className="text-3xl font-bold text-orange-500">Congratulations!</h1>

        <div className="flex flex-col gap-1 mt-6">
          <p className="text-sm font-semibold text-black ">
            Here Is Your Interview Results{" "}
          </p>
          <p className="text-sm font-normal text-gray-500">
            {" "}
            Below are the results and feedback for each of your answered
            question
          </p>
        </div>
        <hr className="my-4" />
        <div>
          <h3 className="font-semibold text-xl text-black">
            Your Overall Interview Rating: {overAllRating}/5
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-10 gap-2">
        {allAnswers?.length &&
          allAnswers.map((question, index) => (
            <Button
              key={index}
              onClick={() => setActiveQuestion(index)}
              className={
                activeQuestion === index
                  ? `text-orange-500 border border-orange-500 flex bg-white`
                  : `text-sm border border-gray-200 flex bg-white`
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
      <div className="mt-5">
        <div>
          <div className="mt-4 bg-white p-4 rounded-lg">
            <h2 className="font-base leading-7 tracking-normal">
              Question:{" "}
              {allAnswers?.length && allAnswers[activeQuestion]?.question}
            </h2>
          </div>

          <div className={"mt-4 bg-white p-4 rounded-lg b"}>
            <h2
              className={
                rating < 3
                  ? "font-bold leading-7 tracking-normal text-red-500"
                  : "font-bold leading-7 tracking-normal text-green-600"
              }
            >
              {" "}
              Rating: {allAnswers?.length && allAnswers[activeQuestion]?.rating}
            </h2>
          </div>

          <div
            className={
              rating < 3
                ? "mt-4 bg-red-50 p-4 rounded-lg border-red-200 border"
                : "mt-4 bg-green-50 p-4 rounded-lg border-green-200 border"
            }
          >
            <h2
              className={
                rating < 3
                  ? "font-medium leading-7 tracking-normal text-red-800"
                  : "font-medium leading-7 tracking-normal text-green-900"
              }
            >
              {" "}
              <span
                className={
                  rating < 3
                    ? "font-semibold text-red-500 flex gap-2 items-center"
                    : "font-bold text-green-600 flex gap-2 items-center "
                }
              >
                Your Answer:{" "}
              </span>
              {allAnswers?.length && allAnswers[activeQuestion]?.userAnswer}
            </h2>
          </div>

          <div
            className={
              "mt-4 bg-green-50 p-4 rounded-lg border-green-200 border"
            }
          >
            <h2
              className={"font-medium leading-7 tracking-normal text-green-900"}
            >
              {" "}
              <span
                className={"font-bold text-green-600 flex gap-2 items-center "}
              >
                Correct Answer:{" "}
              </span>
              {allAnswers?.length && allAnswers[activeQuestion]?.correctAnswer}
            </h2>
          </div>

          <div
            className={"mt-4 bg-blue-50 p-4 rounded-lg border-blue-200 border"}
          >
            <h2
              className={"font-medium leading-7 tracking-normal text-blue-900"}
            >
              {" "}
              <span
                className={"font-bold text-blue-600 flex gap-2 items-center "}
              >
                Feedback:{" "}
              </span>
              {allAnswers?.length && allAnswers[activeQuestion]?.feedback}
            </h2>
          </div>
        </div>
      </div>

      <div className="flex flex-row gap-4 items-center justify-end mt-6">
        {activeQuestion > 0 ? (
          <Button
            onClick={() => setActiveQuestion((prevCount) => prevCount - 1)}
          >
            {" "}
            <ArrowLeft /> Prev
          </Button>
        ) : null}
        {activeQuestion < allAnswers?.length - 1 ? (
          <Button
            onClick={() => setActiveQuestion((prevCount) => prevCount + 1)}
          >
            Next <ArrowRight />
          </Button>
        ) : null}

        <Link href={`/mock-interview`}>
          <Button className="bg-red-500 hover:bg-red-400">Back to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default FeedbackPage;
