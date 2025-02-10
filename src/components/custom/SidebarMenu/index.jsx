import React from "react";
import SidebarLink from "@/components/custom/SidebarLink";
import { SIDE_BAR_LINKS } from "@/constants/sidebar-links";

const SidebarMenu = () => {
  return (
    <div className="w-full flex flex-col gap-3">
      {SIDE_BAR_LINKS.map((link) => {
        return (
          <SidebarLink
            key={link.title}
            title={link.title}
            icon={link.icon}
            path={link.path}
          />
        );
      })}
    </div>
  );
};

export default SidebarMenu;
