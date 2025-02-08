import Image from "next/image";
import React from "react";
import LOGO_DARK from "../../../public/LOGO_DARK.svg";

const AuthLayout = ({ children }) => {
  return (
    <section className="flex">
      <div className=" hidden bg-[#18181B] md:flex justify-between p-8 min-h-screen w-1/2 flex-col">
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
      <div className="bg-white w-full md:w-1/2 lg:min-h-screen">{children}</div>
    </section>
  );
};

export default AuthLayout;
