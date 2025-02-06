"use client";

import { useGoogleLogin } from "@react-oauth/google";
import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import GoogleImage from "../../../../public/btn-google.svg";

const GoogleLoginButton = () => {
  const responseGoogle = async (authResult) => {
    try {
      if (authResult.code) {
        console.log("Code acquired => ", JSON.stringify(authResult));
      }
    } catch (error) {
      console.log("Error while requesting Google auth code: " + error.message);
    }
  };

  const googleLogin = useGoogleLogin({
    onSuccess: responseGoogle,
    onError: (error) => console.log("Google Login Error:", error),
    flow: "auth-code",
  });

  return (
    <Button
      onClick={googleLogin}
      variant="outline"
      className="w-full border-2 border-gray-200"
    >
      <Image src={GoogleImage} alt="google-login" /> Google
    </Button>
  );
};

export default GoogleLoginButton;
