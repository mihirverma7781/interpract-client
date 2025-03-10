"use client";

import React, { useEffect } from "react";
import DashMainCard from "@/components/custom/DashMainCard";
import HeroImage from "../../../../public/mock-main.png";
import { useSelector, useDispatch } from "react-redux";
import { fetchAllInterviews } from "@/redux/features/interview/interview-slice";
import InterviewCard from "@/components/custom/InterviewCard";

const MockInterview = () => {
  const dispatch = useDispatch();
  const interviews = useSelector((state) => state.interview.interviews);
  const loading = useSelector((state) => state.interview.loading);
  useEffect(() => {
    if (!interviews.length) {
      dispatch(fetchAllInterviews());
    }
  }, []);

  const mainClickHandler = () => {
    console.log("Main Button Clicked");
  };
  return (
    <div>
      <DashMainCard
        title={"Take a Mock Interview"}
        content={
          "Maximize your chances of success by taking a mock interview. This will allow you to pinpoint areas needing more study, refine your test-taking strategies, and build confidence before the real interview."
        }
        mainBtnText={"Start Mock Interview"}
        mainClickHandler={mainClickHandler}
        ImageUrl={HeroImage}
      />

      <div className="flex flex-col w-full mt-9">
        <div className="flex flex-col gap-1">
          <h6 className="font-semibold text-base">Interview History </h6>
          <p className="text-sm text-gray-500">
            Manage your hostorical interview data for your betterment{" "}
          </p>
        </div>
        <div className="mt-10">
          {loading && !interviews.length ? (
            <p> Loading...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {interviews?.map((interviewData) => {
                return (
                  <InterviewCard
                    key={interviewData?.id}
                    id={interviewData.id}
                    techStack={interviewData.techStack}
                    difficulty={interviewData.difficulty}
                    jobDescription={interviewData.jobDescription}
                    company={interviewData.company}
                    experience={interviewData.experience}
                    dateCreated={interviewData.createdAt}
                  />
                );
              })}{" "}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MockInterview;
