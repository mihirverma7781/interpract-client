"use client";

import React from "react";
import DashMainCard from "@/components/custom/DashMainCard";
import HeroImage from "../../../../public/mock-main.png";

const MockInterview = () => {
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
        <div> </div>
      </div>
    </div>
  );
};

export default MockInterview;
