"use client";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@/components/ui/menubar";
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
                className="cursor-pointer hover:bg-white/80 bg-white rounded-[10px]"
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
export const AddDelMenuComp = ({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: (val: string) => void;
}) => {
  return (
    <>
      <Menubar className="border-none cursor-pointer">
        <MenubarMenu>
          <MenubarTrigger className="p-3">{children}</MenubarTrigger>
          <MenubarContent className="w-full shadow-md bg-[#F2F2F2] rounded-[20px]">
            <MenubarItem
              onClick={() => {
                onClick("add");
              }}
              className="cursor-pointer flex flex-row items-center gap-2 rounded-[10px]"
            >
              <Image
                src="/assets/icons/add-table.svg"
                alt="add table"
                width={20}
                height={20}
                className="object-cover"
              />
              <p className="text-[#2D8C00] text-[14px]">Add</p>
            </MenubarItem>
            <MenubarItem
              onClick={() => {
                onClick("del");
              }}
              className="cursor-pointer flex flex-row items-center gap-2 rounded-[10px]"
            >
              <Image
                src="/assets/icons/del-table.svg"
                alt="add table"
                width={20}
                height={20}
                className="object-cover"
              />
              <p className="text-[#FF0000] text-[14px]">Delete</p>
            </MenubarItem>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>
    </>
  );
};
