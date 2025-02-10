"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { SIDE_BAR_LINKS } from "@/constants/sidebar-links";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, Bell, Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
    email: yup.string().required(),
    password: yup.string().min(8).max(20).required(),
  })
  .required();

const DashboardHeader = () => {
  const pathname = usePathname();
  const userData = useSelector((state) => state.user.entities.user);
  const [heading, setHeading] = useState("Dashboard");

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
    defaultValues: {},
  });
  const onSubmit = () => console.log("first");

  useEffect(() => {
    for (let link of SIDE_BAR_LINKS) {
      if (link.path === pathname) {
        setHeading(link.title);
        break;
      }
    }
  }, [pathname]);

  return (
    <header className="h-20 border-b border-gray-100 flex items-center justify-between py-[10px] px-8 flex-1">
      <h5 className="text-lg font-semibold">{heading}</h5>
      <div className="flex items-center gap-4">
        <div>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="text-sm font-medium bg-orange-500 hover:bg-orange-500/90">
                {" "}
                <Plus /> Create Mock Exam
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Set Interview Configuration</DialogTitle>
                <DialogDescription>
                  Make changes to your interview here. Click start test when
                  you're done.
                </DialogDescription>
              </DialogHeader>
              <div className="flex flex-col">
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
              </div>
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
        <div>
          {" "}
          <span className="h-8 w-0.5 bg-gray-200 block rounded-xl"> </span>
        </div>
        <div className="flex gap-3">
          <Button className="rounded-full" variant="outline" size="icon">
            <Bell size={16} />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2">
              <Avatar>
                <AvatarImage
                  src={userData?.profileImage}
                  alt={userData?.firstName}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="text-sm font-medium">
                {userData?.firstName} {userData?.lastName}
              </p>
              <ChevronDown size={18} className="-mx-1" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
