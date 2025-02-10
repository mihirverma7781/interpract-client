"use client";

import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import classNames from "classnames";
import Link from "next/link";

const SidebarLink = ({ title, icon, path }) => {
  const pathName = usePathname();

  // Conditional class names with hover typo fixed
  const linkClasses = classNames({
    "w-full h-10 py-[10px] px-3 flex items-center gap-2 text-sm": true,
    "bg-black rounded-lg font-medium hover:bg-gray-900 text-white":
      pathName.includes(path),
    "bg-white font-medium text-black hover:bg-gray-100 rounded-lg":
      !pathName.includes(path),
  });

  return (
    <Link href={path}>
      <div className={linkClasses}>
        <div className="h-5 w-5 object-contain">
          <Image
            height={24}
            width={24}
            className="object-contain h-full"
            src={pathName.includes(path) ? icon.active : icon.inactive}
            alt={title}
          />
        </div>
        <span>{title}</span>
      </div>
    </Link>
  );
};

export default SidebarLink;
