"use client";
import React, { useEffect, useState } from "react";

const InterviewTimer = ({ elapsed, setElapsed }) => {
  useEffect(() => {
    const clock = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(clock);
  }, []);

  const hr = Math.floor(elapsed / 3600);
  const min = Math.floor((elapsed % 3600) / 60);
  const sec = elapsed % 60;

  return (
    <div className="ml-auto p-2 bg-red-500 mb-5 rounded-lg text-white font-semibold flex items-center justify-center">
      Time Elapsed: {hr.toString().padStart(2, "0")} :{" "}
      {min.toString().padStart(2, "0")} : {sec.toString().padStart(2, "0")}
    </div>
  );
};

export default InterviewTimer;
