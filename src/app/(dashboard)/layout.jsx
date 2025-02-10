import Sidebar from "@/components/custom/Sidebar";
import React from "react";

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex">
      <aside className="w-1/4 max-w-60 min-w-52 border-r border-gray-100">
        <Sidebar />
      </aside>
      <section className="w-3/4 flex-1 flex flex-col">
        <header className="h-20 border-b border-gray-100">Header</header>
        <div className="h-[calc(100vh-80px)] bg-slate-50">{children}</div>
      </section>
    </div>
  );
};

export default DashboardLayout;
