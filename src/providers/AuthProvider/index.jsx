"use client";
import { useRouter } from "next/navigation";
import { fetchUser } from "@/redux/features/user/user-slice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AuthProvider = ({ cookieData, children }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user.entities.user);
  const loading = useSelector((state) => state.user.loading);
  const errors = useSelector((state) => state.user.errors);

  useEffect(() => {
    if (cookieData) {
      dispatch(fetchUser());
    }
  }, []);

  useEffect(() => {
    if (userData && !loading) {
      if (!userData.onboarded) {
        router.push("/onboarding");
      } else {
        router.push("/dashboard");
      }
    } else {
      router.push("/auth/signin");
    }
  }, [cookieData]);
  return <>{children}</>;
};

export default AuthProvider;
// useEffect(() => {
//   if (!loading && userData) {
//     if (userData.onboarded) {
//       router.push("/dashboard");
//     }
//   }
// }, [loading, userData]);
