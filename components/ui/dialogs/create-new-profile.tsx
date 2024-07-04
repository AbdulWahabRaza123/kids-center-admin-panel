"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { TextInput } from "../inputs/text-input";
export const CreateNewProfileDialog = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [name, setName] = useState("");
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogHeader>
        <div className="flex flex-row items-center gap-3">
          <Image
            src="/assets/icons/profile.svg"
            alt="profile"
            width={20}
            height={20}
            className="object-cover"
          />
          <h1>Create New Profile</h1>
        </div>
      </DialogHeader>
      <DialogContent className="bg-primary border-[1px] border-[#00f4ff] rounded-[20px] max-w-[700px] h-[60vh] overflow-auto flex flex-col items-center justify-center gap-7 p-5">
        <div className="flex flex-row items-center gap-3">
          <TextInput
            type="text"
            placeholder="devid,jhons..."
            title="Student Name"
            value={name}
            setValue={setName}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};
