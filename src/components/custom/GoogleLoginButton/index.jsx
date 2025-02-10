"use client";

import { useGoogleLogin } from "@react-oauth/google";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import GoogleImage from "../../../../public/btn-google.svg";
import { useDispatch } from "react-redux";
import { googleUserLogin } from "@/redux/features/user/user-slice";
import { useSelector } from "react-redux";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const GoogleLoginButton = () => {
  const router = useRouter();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.entities.user);
  const loading = useSelector((state) => state.user.loading);
  const errors = useSelector((state) => state.user.errors);
  const responseGoogle = async (authResult) => {
    try {
      if (authResult.code) {
        dispatch(googleUserLogin({ auth_code: authResult.code }));
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

  useEffect(() => {
    if (!errors.length) {
      if (userData) {
        console.log("User Data: ", userData);
        toast({
          variant: "success",
          title: "Success",
          description: "You are logged in successfully",
        });
        if (!userData.onboarded) {
          router.push("/onboarding");
        } else {
          router.push("/dashboard");
        }
      }
    } else {
      console.log("Errors: ", errors);
      toast({
        variant: "destructive",
        title: "Error",
        description: errors[0].message,
      });
    }
  }, [loading, userData]);

  return (
    <Button
      onClick={googleLogin}
      variant="outline"
      className="w-full border-2 border-gray-200"
      disabled={loading}
    >
      {loading && <Loader2 className="animate-spin" />}
      {!loading && <Image src={GoogleImage} alt="google-login" />}{" "}
      {loading ? "loading..." : "Google"}
    </Button>
  );
};

export default GoogleLoginButton;
