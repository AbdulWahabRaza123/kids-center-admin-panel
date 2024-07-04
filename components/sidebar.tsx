"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
const sidebarItems = [
  {
    name: "Dashboard",
    activeIcon: "/assets/sidebar-icons/active/home.svg",
    noneActiveIcon: "/assets/sidebar-icons/non-active/home.svg",
    link: "/",
  },
  {
    name: "User Management",
    activeIcon: "/assets/sidebar-icons/active/people.svg",
    noneActiveIcon: "/assets/sidebar-icons/non-active/people.svg",
    link: "/student-manage",
  },
  {
    name: "Reports",
    activeIcon: "/assets/sidebar-icons/active/reports.svg",
    noneActiveIcon: "/assets/sidebar-icons/non-active/reports.svg",
    link: "/report",
  },
  {
    name: "Profile",
    activeIcon: "/assets/sidebar-icons/active/profile.svg",
    noneActiveIcon: "/assets/sidebar-icons/non-active/profile.svg",
    link: "/profile",
  },
  {
    name: "Communication",
    activeIcon: "/assets/sidebar-icons/active/communication.svg",
    noneActiveIcon: "/assets/sidebar-icons/non-active/communication.svg",
    link: "#",
  },
  {
    name: "QR Code",
    activeIcon: "/assets/sidebar-icons/active/qr-code.svg",
    noneActiveIcon: "/assets/sidebar-icons/non-active/qr-code.svg",
    link: "#",
  },
  {
    name: "Settings",
    activeIcon: "/assets/sidebar-icons/active/settings.svg",
    noneActiveIcon: "/assets/sidebar-icons/non-active/settings.svg",
    link: "#",
  },
  {
    name: "Logout",
    activeIcon: "/assets/sidebar-icons/active/logout.svg",
    noneActiveIcon: "/assets/sidebar-icons/non-active/logout.svg",
    link: "#",
  },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const [active, setActive] = useState(pathname);
  return (
    <div className="w-[230px] bg-[#7A1FA01A] h-screen overflow-auto flex flex-col items-center fixed">
      <Image
        src="/assets/signin/logo.svg"
        width={200}
        height={80}
        alt="logo"
        className="object-cover w-full my-5"
      />
      <div className="mt-7 flex flex-col gap-3 w-full">
        {sidebarItems?.map((item, index) => (
          <Link
            key={index}
            href={item.link}
            onClick={() => setActive(item.link)}
            className={cn(
              "flex items-center gap-2 p-3 rounded-md transition-all text-black w-full",
              item.link === active && "bg-white"
            )}
          >
            <Image
              loader={({ src }) => src}
              src={active === item.link ? item.activeIcon : item.noneActiveIcon}
              width={20}
              height={20}
              alt={item.name}
              className="object-cover"
            />
            <p
              className={cn(
                active === item.link ? "text-primary" : "text-black"
              )}
            >
              {item.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};
