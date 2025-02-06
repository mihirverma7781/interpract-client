import Image from "next/image";
import React from "react";
import LOGO_DARK from "../../../public/LOGO_DARK.svg";

const AuthLayout = ({ children }) => {
  return (
    <section className="flex">
      <div className="bg-[#18181B] flex lg:justify-between lg:p-8 lg:min-h-screen lg:w-1/2 lg:flex-col">
        <div>
          <Image src={LOGO_DARK} alt="logo-dark" />
        </div>
        <div className="flex flex-col gap-4 text-white">
          <p className="text-lg">
            "This Library has saved me countless hours of work and helped me
            deliver stunning designs to my clients faster than ever before.”
          </p>
          <sub className="text-base">Sofia Davis</sub>
        </div>
      </div>
      <div className="bg-white lg:w-1/2 lg:min-h-screen">{children}</div>
    </section>
  );
};

export default AuthLayout;
