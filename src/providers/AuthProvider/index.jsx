"use client";
import { useRouter } from "next/navigation";
import { fetchUser } from "@/redux/features/user/user-slice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const AuthProvider = ({ children }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user.entities.user);
  const loading = useSelector((state) => state.user.loading);
  const errors = useSelector((state) => state.user.errors);

  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  useEffect(() => {
    if (errors.length) {
      router.push("/auth/login");
    } else {
      if (userData) {
        if (!userData.onboarded) {
          router.push("/onboarding");
        } else {
          router.push("/dashboard");
        }
      }
    }
  }, [userData, loading]);
  return <>{children}</>;
};

export default AuthProvider;
