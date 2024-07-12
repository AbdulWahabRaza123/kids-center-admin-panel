"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { LogoutDialog } from "./ui/dialogs/logout-dialog";

export const Sidebar = ({
  menu,
}: {
  menu: {
    name: string;
    activeIcon: string;
    noneActiveIcon: string;
    link: string;
  }[];
}) => {
  const pathname = usePathname();
  const [active, setActive] = useState(pathname);
  return (
    <div className="w-[230px] bg-[#7A1FA01A] h-screen overflow-auto hide-scroll flex flex-col items-center fixed">
      <Image
        src="/assets/signin/logo.svg"
        width={200}
        height={80}
        alt="logo"
        className="object-cover w-full my-5"
      />
      <div className="mt-7 flex flex-col gap-3 w-full">
        {menu?.map((item, index) => {
          if (item.link === "#logout") {
            return (
              <LogoutDialog key={index}>
                <div
                  onClick={() => setActive(item.link)}
                  className={cn(
                    "flex items-center gap-2 p-3 rounded-md transition-all text-black w-full",
                    item.link === active && "bg-white"
                  )}
                >
                  <Image
                    loader={({ src }) => src}
                    src={
                      active === item.link
                        ? item.activeIcon
                        : item.noneActiveIcon
                    }
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
                </div>
              </LogoutDialog>
            );
          } else {
            return (
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
                  src={
                    active === item.link ? item.activeIcon : item.noneActiveIcon
                  }
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
            );
          }
        })}
      </div>
    </div>
  );
};
