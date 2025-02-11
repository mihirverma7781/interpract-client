"use client";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const formSchema = yup
  .object({
    experience: yup.number().required("Experience needed is required"),
    jobDescription: yup.string().required("Job role is required"),
    techStack: yup.string().required("Tech stack is required"),
    difficulty: yup
      .string()
      .transform((value) => value.toLowerCase())
      .oneOf(["easy", "medium", "hard"], "Invalid difficulty level")
      .required("Difficulty is required"),
    company: yup.string(),
  })
  .required();

const InterviewConfigModal = ({ open, setOpen }) => {
  const [selectedTech, setSelectedTech] = useState([]);
  const {
    handleSubmit,
    register,
    formState: { errors },
    clearErrors,
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {},
  });
  const onSubmit = (data) => console.log("Interview Configuration: ", data);

  return (
    <>
      <Dialog open={open} setOpen={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Set Interview Configuration</DialogTitle>
            <DialogDescription>
              Make changes to your interview here. Click start test when you're
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col">
            <form
              className="flex flex-col gap-2"
              action=""
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="flex gap-2 items-center">
                {/* experience */}
                <div className="flex flex-col gap-[6px]">
                  <Label className="text-sm">Experience</Label>
                  <Input
                    type="number"
                    placeholder="ex. 5"
                    className="w-full"
                    {...register("experience")}
                  />
                  <p className="text-xs font-medium text-red-600">
                    {errors.experience?.message}
                  </p>
                </div>
                {/* job role */}
                <div className="flex flex-col gap-[6px]">
                  <Label className="text-sm">Job Role</Label>
                  <Input
                    type="text"
                    placeholder="Ex. System Architect, SDE-II etc."
                    className="w-full"
                    {...register("jobDescription")}
                  />
                  <p className="text-xs font-medium text-red-600">
                    {errors.jobDescription?.message}
                  </p>
                </div>
              </div>

              {/* tech-stack / requried tech */}
              <div className="flex flex-col gap-[6px]">
                <Label className="text-sm">
                  Tech Stack / Reuired Tech for Job
                </Label>
                <Input
                  type="text"
                  placeholder="Ex. Node.js, React.js"
                  className="w-full"
                  {...register("techStack")}
                />
                <p className="text-xs font-medium text-red-600">
                  {errors.techStack?.message}
                </p>
              </div>

              {/* difficulty level */}
              <div className="flex flex-col gap-[6px]">
                <Label className="text-sm">
                  Difficulty Level (type any one)
                </Label>
                <Input
                  type="text"
                  placeholder="Ex. Easy | Medium | Hard"
                  className="w-full"
                  {...register("difficulty")}
                />
                <p className="text-xs font-medium text-red-600">
                  {errors.difficulty?.message}
                </p>
              </div>

              {/* dream company */}
              <div className="flex flex-col gap-[6px]">
                <Label className="text-sm">Dream Company</Label>
                <Input
                  type="text"
                  placeholder="Ex. Google, Amazon etc."
                  className="w-full"
                  {...register("company")}
                />
                <p className="text-xs font-medium text-red-600">
                  {errors.company?.message}
                </p>
              </div>

              <div className="flex w-full items-center gap-4 justify-between mt-5">
                <Button
                  type=""
                  variant="ghost"
                  className="font-semibold"
                  onClick={() => {
                    clearErrors();
                    setOpen(!open);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-orange-500 text-white font-medium"
                >
                  Start Interview
                </Button>
              </div>
            </form>
          </div>
          {/* <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter> */}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default InterviewConfigModal;
