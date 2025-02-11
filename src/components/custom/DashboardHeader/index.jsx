"use client";

import React, { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { SIDE_BAR_LINKS } from "@/constants/sidebar-links";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ChevronDown, Bell, Plus } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import InterviewConfigModal from "../InterviewConfigModal";

const DashboardHeader = () => {
  const pathname = usePathname();
  const userData = useSelector((state) => state.user.entities.user);
  const [heading, setHeading] = useState("Dashboard");
  const [openModal, setOpenModal] = useState(false);

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
          <Button
            className="text-sm font-medium bg-orange-500 hover:bg-orange-500/90"
            onClick={() => setOpenModal(!openModal)}
          >
            {" "}
            <Plus /> Create Mock Exam
          </Button>
          <InterviewConfigModal open={openModal} setOpen={setOpenModal} />
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
