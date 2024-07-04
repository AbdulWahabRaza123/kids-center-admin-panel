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
import { PrimaryBtn } from "../buttons/primary-btn";
export const CreateNewProfileDialog = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [name, setName] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [attendance, setAttendance] = useState("");
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>

      <DialogContent className="bg-white border-[1px] border-[#00f4ff] rounded-[20px] max-w-[700px] h-[60vh] flex flex-col gap-7 p-5">
        <div className="flex flex-row items-center gap-3">
          <Image
            src="/assets/icons/profile.svg"
            alt="profile"
            width={20}
            height={20}
            className="object-cover"
          />
          <h1 className="text-[20px]">Create New Profile</h1>
        </div>
        <div className="flex flex-row items-center gap-3 mt-3">
          <TextInput
            type="text"
            placeholder="devid,jhons..."
            title="Student Name"
            value={name}
            setValue={setName}
            className="w-[50%]"
          />
          <TextInput
            type="text"
            placeholder="dgdu7d8d"
            title="QR Code"
            value={qrCode}
            setValue={setQrCode}
            className="w-[50%]"
          />
        </div>
        <TextInput
          type="text"
          placeholder="%"
          title="Attendance"
          value={attendance}
          setValue={setAttendance}
        />
        <div className="flex flex-row items-center justify-end w-full gap-4">
          {/* <PrimaryBtn
            onClick={() => console.log("Save")}
            className="w-[100px] h-[45px] bg-[#F7F7F7] text-[16px] text-black rounded-[9px] flex flex-row items-center justify-center"
          >
            <div>Cancel</div>
          </PrimaryBtn> */}
          <PrimaryBtn
            onClick={() => console.log("Save")}
            className="w-[100px] h-[45px] text-[16px] rounded-[9px] flex flex-row items-center justify-center"
          >
            <div>Save</div>
          </PrimaryBtn>
        </div>
      </DialogContent>
    </Dialog>
  );
};
