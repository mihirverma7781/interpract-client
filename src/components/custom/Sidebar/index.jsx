import React from "react";
import Image from "next/image";
import SidebarMenu from "../SidebarMenu";
import DashboardLogo from "../../../../public/dashboard-logo.svg";

const Sidebar = () => {
  return (
    <div className="w-full flex flex-col flex-1 bg-white px-4 py-10  h-screen">
      <div>
        <Image src={DashboardLogo} alt="logo" />
      </div>
      <div className="mt-12 h-auto overflow-y-scroll">
        {" "}
        <SidebarMenu />
      </div>
    </div>
  );
};

export default Sidebar;
