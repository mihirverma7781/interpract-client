"use client";

import {
  fetchCurrentInterview,
  resetActiveInterview,
  updateDuration,
} from "@/redux/features/interview/interview-slice";
import { use, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import QuestionSection from "./_components/QuestionSection";
import RecordAnswerSection from "./_components/RecordAnswerSection";
import { fetchAllAnswers } from "@/redux/features/answer/answer-slice";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import moment, { duration } from "moment";

const StartInterview = ({ params, searchParams }) => {
  const { slug } = use(params);
  const dispatch = useDispatch();

  const [activeQuestion, setActiveQuestion] = useState(0);
  const [saveLoading, setSaveLoading] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const timeRef = useRef(0);

  const currentInterview = useSelector(
    (state) => state.interview.activeInterview.data
  );
  const loading = useSelector(
    (state) => state.interview.activeInterview.loading
  );
  const errors = useSelector((state) => state.interview.activeInterview.errors);
  const userData = useSelector((state) => state.user.entities.user);

  const allAnswers = useSelector((state) => state.answer.answers);
  const answersLoading = useSelector((state) => state.answer.loading);

  const endInterviewHandler = () => {
    setEndTime(moment.now());
  };

  const beforeUnloadHandler = (event) => {
    event.preventDefault();
    const data = {
      id: slug,
      input: {
        timeTaken: timeRef.current,
        attempted: false,
      },
    };
    dispatch(updateDuration(data));
    return (event.returnValue =
      "Your interview will be submitted. Sure want to exit?");
  };

  useEffect(() => {
    if (!currentInterview || !Object.keys(currentInterview).length) {
      dispatch(fetchCurrentInterview(slug));
    }
  }, [slug, dispatch, currentInterview]);

  // Reset active interview
  useEffect(() => {
    return () => {
      dispatch(resetActiveInterview());
    };
  }, []);

  // Fetch Answers
  useEffect(() => {
    dispatch(fetchAllAnswers({ id: slug }));
  }, [saveLoading]);

  // Before unload event
  useEffect(() => {
    window.addEventListener("beforeunload", beforeUnloadHandler, {
      capture: true,
    });

    return () =>
      window.removeEventListener("beforeunload", beforeUnloadHandler, {
        capture: true,
      });
  }, [slug, currentInterview]);

  useEffect(() => {
    timeRef.current = elapsed;
  }, [elapsed]);

  if (loading || !currentInterview?.content?.length) {
    return <div> Loading... </div>;
  }

  return (
    <div className="flex flex-1 flex-col gap-5">
      <div className="flex w-full flex-col md:flex-row gap-4 justify-between">
        <section className="flex-1">
          <QuestionSection
            questions={currentInterview?.content}
            activeQuestion={activeQuestion}
            setActiveQuestion={setActiveQuestion}
            answers={allAnswers}
            interviewId={slug}
          />
        </section>
        <section className="flex-1">
          <RecordAnswerSection
            questions={currentInterview?.content}
            activeQuestion={activeQuestion}
            answers={allAnswers}
            interviewId={slug}
            setSaveLoading={setSaveLoading}
            elapsed={elapsed}
            setElapsed={setElapsed}
          />
        </section>
      </div>

      <div className="flex flex-row gap-4 items-center justify-start">
        {activeQuestion > 0 ? (
          <Button
            onClick={() => setActiveQuestion((prevCount) => prevCount - 1)}
          >
            {" "}
            <ArrowLeft /> Prev
          </Button>
        ) : null}
        {activeQuestion < currentInterview?.content?.length - 1 ? (
          <Button
            onClick={() => setActiveQuestion((prevCount) => prevCount + 1)}
          >
            Next <ArrowRight />
          </Button>
        ) : null}
        {activeQuestion === currentInterview?.content?.length - 1 ? (
          <Link href={`/mock-interview/${slug}/feedback`}>
            {" "}
            <Button className="bg-red-500 hover:bg-red-600">
              End Interview
            </Button>{" "}
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default StartInterview;
