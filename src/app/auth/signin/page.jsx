"use client";
import Link from "next/link";
import * as yup from "yup";
import GoogleImage from "../../../../public/btn-google.svg";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import GoogleLoginButton from "@/components/custom/GoogleLoginButton";

const formSchema = yup
  .object({
    email: yup.string().required(),
    password: yup.string().min(8).max(20).required(),
  })
  .required();

const Signin = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {},
  });
  const onSubmit = () => console.log("first");

  return (
    <div className="p-8 flex flex-col w-full">
      <Link
        className="ml-auto text-sidechick-default font-medium hover:text-orange-600 hover:transition-all"
        href={"/auth/signup"}
      >
        Signup
      </Link>

      <div className="p-6 min-w-[350px] mx-auto mt-20 flex flex-col gap-6">
        <div className="flex flex-col text-center gap-1">
          <h2 className="text-[24px] font-semibold">Login to Account</h2>
          <p className="text-sm text-gray-400">
            Enter your details below to login into your account
          </p>
        </div>
        <form
          className="flex flex-col gap-2"
          action=""
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* email */}
          <div className="flex flex-col gap-[6px]">
            <Label className="text-sm">Email</Label>
            <Input
              type="email"
              placeholder="ex. jhondoe@gmail.com"
              className="w-full"
              {...register("email")}
            />
            <p className="text-xs font-medium text-red-600">
              {errors.email?.message}
            </p>
          </div>
          {/* password */}
          <div className="flex flex-col gap-[6px]">
            <Label className="text-sm">Password</Label>
            <Input
              type="password"
              placeholder="***********"
              className="w-full"
              {...register("password")}
            />
            <p className="text-xs font-medium text-red-600">
              {errors.password?.message}
            </p>
          </div>
          <Button type="submit" className="">
            Login
          </Button>
        </form>
        <div className=" flex items-center gap-2 w-full">
          <Separator className=" flex-1 bg-gray-200" />
          <p className="text-gray-400 text-xs">OR CONTINUE WITH</p>
          <Separator className=" flex-1 bg-gray-200" />
        </div>
        <div className="">
          <GoogleLoginButton />
        </div>
        <div>
          <p className="text-gray-400 leading-6 text-sm text-center">
            By Clicking continue, you agree to our{" "}
            <Link className="underline" href={"/terms-of-service"}>
              Terms <br /> of Service
            </Link>{" "}
            and{" "}
            <Link className="underline" href={"/privacy-policy"}>
              Privacy Policy.
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
