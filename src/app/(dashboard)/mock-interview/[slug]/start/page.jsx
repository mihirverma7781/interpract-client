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
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

const StartInterview = ({ params, searchParams }) => {
  const { slug } = use(params);
  const dispatch = useDispatch();
  const router = useRouter();
  const { toast } = useToast();

  const [activeQuestion, setActiveQuestion] = useState(0);
  const [saveLoading, setSaveLoading] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const timeRef = useRef(0);

  const currentInterview = useSelector(
    (state) => state.interview.activeInterview.data
  );

  const updateDurationData = useSelector(
    (state) => state.interview.updateDuration
  );

  const loading = useSelector(
    (state) => state.interview.activeInterview.loading
  );

  const errors = useSelector((state) => state.interview.activeInterview.errors);
  const userData = useSelector((state) => state.user.entities.user);

  const allAnswers = useSelector((state) => state.answer.answers);
  const answersLoading = useSelector((state) => state.answer.loading);

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

  const endInterviewHandler = async (event) => {
    event.preventDefault();

    const data = {
      id: slug,
      input: {
        timeTaken: timeRef.current,
        attempted: true,
      },
    };

    dispatch(updateDuration(data));
  };

  // redirect if already attempted
  useEffect(()=> {
    if(currentInterview?.attempted) {
      router.push("/mock-interview");
    }
  },[currentInterview])

  // Fetch current interview
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

  useEffect(() => {
    console.log("useeffeccttt triggereddddd")
    if(!updateDurationData?.errors?.length) {
      if(updateDurationData?.data) {
        toast({
          variant: "success",
          title: "Inteview Ended",
          description: "Interview attempted successfully",
        });

        router.push("/mock-interview");
      }
    } else {
      console.log("Errors: ", errors);
      toast({
        variant: "destructive",
        title: "Error",
        description: errors[0],
      });
    }
  }, [updateDurationData?.data, updateDurationData?.loading]);

  if (loading || !currentInterview?.content?.length || currentInterview?.attempted) {
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
            <Button
              onClick={endInterviewHandler}
              className="bg-red-500 hover:bg-red-600"
            >
              End Interview
            </Button>{" "}
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default StartInterview;
