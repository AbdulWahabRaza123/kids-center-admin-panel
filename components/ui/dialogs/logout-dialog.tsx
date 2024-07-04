"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { PrimaryBtn } from "../buttons/primary-btn";
export const LogoutDialog = ({ children }: { children: React.ReactNode }) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>

      <DialogContent className="bg-white border-[1px] border-[#00f4ff] rounded-[20px] max-w-[700px] h-[60vh] overflow-auto flex flex-col items-center justify-center gap-7 p-5">
        <Image
          src="/assets/logout.svg"
          alt="logout"
          width={100}
          height={100}
          className="object-cover"
        />
        <h1 className="text-[20px] font-[700] text-center text-primary">
          Logout
        </h1>
        <p>Are you sure you want to logout?</p>

        <div className="flex flex-row items-center justify-center w-full gap-4">
          <PrimaryBtn
            onClick={() => console.log("Logout")}
            className="w-[100px] h-[45px] text-[16px] rounded-[9px] flex flex-row items-center justify-center"
          >
            <div>Logout</div>
          </PrimaryBtn>
        </div>
      </DialogContent>
    </Dialog>
  );
};
