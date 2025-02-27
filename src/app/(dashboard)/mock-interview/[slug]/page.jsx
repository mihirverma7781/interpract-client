"use client";

import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { use } from "react";
import {
  fetchCurrentInterview,
  resetActiveInterview,
} from "@/redux/features/interview/interview-slice";

const Interview = ({ params, searchParams }) => {
  const { slug } = use(params);
  const dispatch = useDispatch();

  const currentInterview = useSelector(
    (state) => state.interview.activeInterview.data,
  );
  const loading = useSelector(
    (state) => state.interview.activeInterview.loading,
  );
  const errors = useSelector((state) => state.interview.activeInterview.errors);

  useEffect(() => {
    if (!currentInterview || !Object.keys(currentInterview).length)
      dispatch(fetchCurrentInterview(slug));
  }, []);

  useEffect(() => {
    return () => {
      dispatch(resetActiveInterview());
    };
  }, []);
  return <div>Interview ID: {slug} </div>;
};

export default Interview;
