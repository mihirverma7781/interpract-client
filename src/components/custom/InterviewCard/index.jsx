"use client";

import Link from "next/link";
import React from "react";
import moment from "moment/moment";
import { Button } from "@/components/ui/button";
import { capitalizeCase } from "@/utils/utility-functions";

const InterviewCard = ({
  id,
  techStack,
  difficulty,
  jobDescription,
  company,
  experience,
  dateCreated,
}) => {
  return (
    <div className="flex flex-col rounded-sm">
      <div className="p-5 bg-gray-100 flex flex-col gap-2 rounded-t-lg">
        <h5 className="text-xl font-bold">{capitalizeCase(jobDescription)}</h5>
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-gray-600">
            {experience} Years of experience
          </p>{" "}
          <p className="text-sm font-semibold text-gray-600">30 mins left</p>
        </div>
      </div>

      <div className="flex flex-col p-5 bg-white gap-5 rounded-b-lg">
        <div className="flex items-center justify-between">
          {" "}
          <p className="text-sm font-semibold text-gray-600">
            {" "}
            Date Created: {moment(dateCreated).format("ll")}
          </p>{" "}
          <p className="text-sm font-semibold text-gray-600">
            {capitalizeCase(difficulty)}
          </p>
        </div>
        <div className="flex items-center gap-5">
          <Button variant="outline" className="h-9 font-semibold flex-1">
            Check Feedback
          </Button>
          <Link href={`/mock-interview/${id}`}>
            <Button className="h-9 text-white bg-slate-600 font-semibold flex-1 hover:bg-slate-600/90">
              Start Interview
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default InterviewCard;
