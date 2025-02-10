"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import React from "react";

const DashMainCard = ({
  title,
  content,
  mainClickHandler,
  secClickHandler,
  ImageUrl,
  mainBtnText,
  secBtnText,
}) => {
  return (
    <div className="flex p-8 bg-white rounded-xl">
      <div className="flex flex-col gap-5 ">
        <h2 className="text-3xl font-semibold">
          {title} <span className="font-bold text-4xl text-orange-500">.</span>
        </h2>
        <p className="text-sm text-gray-500">{content}</p>
        <div className="flex gap-5 items-center">
          {mainClickHandler && (
            <Button
              className="bg-gray-700 text-white hover:border hover:border-orange-600 hover:bg-white hover:text-orange-500"
              onClick={mainClickHandler}
            >
              {mainBtnText}
            </Button>
          )}
          {secClickHandler && (
            <Button className="" variant="outline" onClick={secClickHandler}>
              {secBtnText}
            </Button>
          )}
        </div>
      </div>
      {/* <div className="hidden lg:flex w-[150px] flex-1">
        <Image
          height={150}
          width={150}
          className="w-full object-contain"
          src={ImageUrl}
          alt={title}
        />
      </div> */}
    </div>
  );
};

export default DashMainCard;
