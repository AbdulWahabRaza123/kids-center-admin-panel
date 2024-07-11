"use client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
import { Ban, Edit } from "lucide-react";
import Image from "next/image";

export const MenubarComp = ({
  children,
  options,
  onClick,
}: {
  children: React.ReactNode;
  onClick: (val: string) => void;
  options: {
    name: string;
    value: string;
  }[];
}) => {
  return (
    <>
      <Menubar className="border-none cursor-pointer">
        <MenubarMenu>
          <MenubarTrigger className="p-3">{children}</MenubarTrigger>
          <MenubarContent className="w-full bg-white">
            {options.map((option) => (
              <MenubarItem
                onClick={() => {
                  onClick(option.value);
                }}
                key={option.value}
                className="cursor-pointer font-[600] hover:bg-slate-400/30 active:bg-slate-400/20 rounded-[10px]"
              >
                {option.name}
              </MenubarItem>
            ))}
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </>
  );
};
export const EditDisableMenuComp = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: (val: "edit" | "ban") => void;
}) => {
  return (
    <>
      <Menubar className="border-none cursor-pointer">
        <MenubarMenu>
          <MenubarTrigger className="p-3">{children}</MenubarTrigger>
          <MenubarContent className="w-full shadow-md bg-[#F2F2F2] rounded-[20px]">
            <MenubarItem
              onClick={() => {
                onClick("edit");
              }}
              className="cursor-pointer flex flex-row items-center gap-2 rounded-[10px]"
            >
              <Edit className="w-[20px] h-[20px] text-[#2D8C00]" />
              <p className="text-[#2D8C00] text-[14px]">Edit</p>
            </MenubarItem>
            <MenubarItem
              onClick={() => {
                onClick("ban");
              }}
              className="cursor-pointer flex flex-row items-center gap-2 rounded-[10px]"
            >
              {/* <Image
                src="/assets/icons/del-table.svg"
                alt="add table"
                width={20}
                height={20}
                className="object-cover"
              /> */}
              <Ban className="w-[20px] h-[20px] text-[#FF0000]" />
              <p className="text-[#FF0000] text-[14px]">Disable</p>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </>
  );
};
