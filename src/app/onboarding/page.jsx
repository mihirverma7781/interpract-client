"use client";

import React, { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import MultiSelect from "@/components/ui/multi-select";
import { techStackOptions } from "@/constants/tech-stack";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { onboardUser } from "@/redux/features/user/user-slice";
import { Loader2 } from "lucide-react";

// Your form validation schema with yup
const formSchema = yup
  .object({
    currentJobRole: yup.string().required(),
    experience: yup.number().required(),
  })
  .required();

const OnboardingPage = () => {
  const userData = useSelector((state) => state.user.entities.user);
  const loading = useSelector((state) => state.user.loading);

  const dispatch = useDispatch();
  const router = useRouter();
  const [selectedTech, setSelectedTech] = useState([]);

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {
      experience: 0,
    },
  });

  // Handle form submission
  const onSubmit = (data) => {
    const mergedData = {
      techStack: selectedTech,
      jobDescription: data.currentJobRole,
      experience: data.experience,
    };
    try {
      dispatch(onboardUser(mergedData));
      router.push("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!loading && userData) {
      if (userData.onboarded) {
        console.log("userData:", userData);
        router.push("/dashboard");
      }
    }
  }, [loading, userData]);

  return (
    <section className="min-h-screen flex justify-center items-center w-full">
      <div className="flex-1 p-8 min-w-[350px] max-w-[450px] mx-auto  flex flex-col gap-6 bg-white border border-gray-200 rounded-2xl transform transition duration-300 hover:scale-105">
        <div className="flex flex-col text-center gap-1">
          <h2 className="text-2xl font-bold text-gray-800">Profile Details</h2>
          <p className="text-sm text-gray-600">
            Enter your details for a personalized <br /> experience.
          </p>
        </div>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
          {/* Current job role */}
          <div className="flex flex-col gap-[6px]">
            <Label className="text-sm">Current Job Role</Label>
            <Input
              placeholder="ex. System Architect"
              className="w-full transition duration-200"
              {...register("currentJobRole")}
            />
            <p className="text-xs font-medium text-red-600">
              {errors.currentJobRole?.message}
            </p>
          </div>
          {/* Experience */}
          <div className="flex flex-col gap-[6px]">
            <Label className="text-sm">Experience (in years)</Label>
            <Input
              placeholder="ex. 10 Years"
              className="w-full transition duration-200"
              type="number"
              {...register("experience")}
            />
            <p className="text-xs font-medium text-red-600">
              {errors.experience?.message}
            </p>
          </div>
          {/* Tech Stack */}
          <div className="flex flex-col gap-[6px]">
            <Label className="text-sm">Tech Stack</Label>
            <MultiSelect
              options={techStackOptions}
              onValueChange={(data) => setSelectedTech(data)}
              placeholder="Select your tech stack"
              variant="inverted"
              animation={2}
            />
            <p className="text-xs font-medium text-red-600">
              {errors.techStack?.message}
            </p>
          </div>
          <Button
            className="mt-8  text-white font-semibold py-2 px-4 rounded-lg transition duration-300  active:bg-orange-800"
            disabled={loading}
          >
            {loading && <Loader2 className="animate-spin" />}
            {loading ? "loading..." : "Get Started"}
          </Button>
        </form>
      </div>
    </section>
  );
};

export default OnboardingPage;
