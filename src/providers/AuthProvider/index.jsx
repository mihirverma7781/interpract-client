"use client";
import { useRouter, usePathname } from "next/navigation";
import { fetchUser } from "@/redux/features/user/user-slice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AuthProvider = ({ cookieData, children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();

  const userData = useSelector((state) => state.user.entities.user);
  const loading = useSelector((state) => state.user.loading);

  const [isFetched, setIsFetched] = useState(false); // Track API completion

  useEffect(() => {
    if (cookieData) {
      dispatch(fetchUser()).finally(() => setIsFetched(true)); // Wait for API to finish
    } else {
      setIsFetched(true); // No cookie, mark as fetched
    }
  }, []);

  useEffect(() => {
    if (!isFetched) return; // Ensure API is done before routing logic

    if (userData) {
      if (!userData.onboarded) {
        router.push("/onboarding");
      } else if (pathname === "/auth/signin" || pathname === "/onboarding") {
        router.push("/dashboard");
      }
    } else if (!loading) {
      router.push("/auth/signin");
    }
  }, [userData, loading, pathname, isFetched]);

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
