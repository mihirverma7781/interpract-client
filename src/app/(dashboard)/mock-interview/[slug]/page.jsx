"use client";

import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { use } from "react";
import {
  fetchCurrentInterview,
  resetActiveInterview,
} from "@/redux/features/interview/interview-slice";
import { Button } from "@/components/ui/button";
import { WebcamIcon } from "lucide-react";
import Webcam from "react-webcam";
import Link from "next/link";
import { fetchAllAnswers } from "@/redux/features/answer/answer-slice";

const Interview = ({ params, searchParams }) => {
  const { slug } = use(params);
  const dispatch = useDispatch();

  const [instruction, setInstruction] = useState(true);
  const [webcamEnabled, setWebcamEnabled] = useState(false);

  const currentInterview = useSelector(
    (state) => state.interview.activeInterview.data,
  );
  const loading = useSelector(
    (state) => state.interview.activeInterview.loading,
  );
  const errors = useSelector((state) => state.interview.activeInterview.errors);
  const userData = useSelector((state) => state.user.entities.user);

  useEffect(() => {
    if (!currentInterview || !Object.keys(currentInterview).length)
      dispatch(fetchCurrentInterview(slug));
  }, []);

  useEffect(() => {
    return () => {
      dispatch(resetActiveInterview());
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (instruction) {
    return (
      <div className="flex flex-col lg:flex-row gap-4">
        <div className="flex lg:w-1/2 flex-1 p-5  bg-white lg:min-h-[calc(100vh-150px)] ">
          <div>
            <h5 className="text-lg font-medium text-orange-500">
              Hey {userData?.firstName + " " + userData?.lastName} ,
            </h5>
            <h2 className="mt-3 text-[42px] font-bold leading-tight text-black">
              Welcome to {currentInterview?.jobDescription} interview
              <span className="text-orange-500">.</span>
            </h2>

            <div className="mt-6 flex flex-col gap-2">
              <div className="flex flex-col gap-2 p-2 bg-gray-100 rounded-md">
                <sub className="text-sm font-medium text-gray-500">
                  Job Description
                </sub>
                <p className="font-medium text-black">
                  {currentInterview?.jobDescription.toUpperCase()}
                </p>
              </div>
              <div className="flex flex-col gap-2 p-2 bg-gray-100 rounded-md">
                <sub className="text-sm font-medium text-gray-500">
                  Experience
                </sub>
                <p className="font-medium text-black">
                  {currentInterview?.experience} Years
                </p>
              </div>
              <div className="flex flex-col gap-2 p-2 bg-gray-100 rounded-md">
                <sub className="text-sm font-medium text-gray-500">
                  Tech Stack
                </sub>
                <p className="font-medium text-black">
                  {currentInterview?.techStack}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex lg:w-1/2 flex-1 p-5 lg:min-h-[calc(100vh-150px)] items-center">
          <div>
            <h2 className="mt-3 text-[42px] font-medium  leading-tight text-black">
              Instructions
            </h2>
            <p className="text-red-500 text-base">
              Enable your webcam & microphone *
            </p>

            <ol
              start="1"
              className="list-decimal flex flex-col gap-2 mt-10 pl-4"
            >
              <li>
                {" "}
                This is a timed test. Please make sure you are not interrupted
                during the test, as the timer cannot be paused once started.
              </li>
              <li>Please ensure you have a stable internet connection.</li>
              <li>
                We recommend you to try the sample test for a couple of minutes,
                before taking the main test.
              </li>
              <li>
                Before taking the test, please go through the FAQs to resolve
                your queries related to the test or the ExamPract platform.
              </li>
            </ol>
            {webcamEnabled ? (
              <div className="mt-10 mx-auto rounded-lg  ">
                <Webcam
                  onUserMedia={() => setWebcamEnabled(true)}
                  onUserMediaError={() => setWebcamEnabled(false)}
                  style={{
                    height: 250,
                    margin: "auto",
                    borderRadius: "10px",
                  }}
                />
              </div>
            ) : (
              <div className="p-10 bg-gray-100 mt-6 rounded-lg">
                <WebcamIcon className="h-14 w-14 mx-auto" />
              </div>
            )}

            <div className="mt-10 flex gap-4 ">
              <Button
                variant="outline"
                className="text-gray-500 font-medium flex-1"
                onClick={() => setWebcamEnabled(true)}
              >
                {" "}
                Enable Microphone & Camera{" "}
              </Button>
              <Link
                href={webcamEnabled ? `/mock-interview/${slug}/start` : "#"}
              >
                <Button className="font-medium bg-orange-500 hover:bg-orange-500/90 flex-1">
                  {" "}
                  Start Interview
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <div>Interview ID: {slug} </div>;
};

export default Interview;
