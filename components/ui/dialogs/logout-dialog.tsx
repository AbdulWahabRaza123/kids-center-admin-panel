"use client";
import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { PrimaryBtn } from "../buttons/primary-btn";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SpinnerBtn } from "@/components/spinner-btn";
import { AuthStatesContext } from "@/context/auth";
import { useNotify } from "../toast/notify";
export const LogoutDialog = ({ children }: { children: React.ReactNode }) => {
  const notify = useNotify();
  const router = useRouter();
  const { setUser, setToken } = AuthStatesContext();
  const [loading, setLoading] = useState(false);
  const clearCookies = async () => {
    try {
      await axios.get("/api/auth/logout");
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  const handleLogout = async () => {
    try {
      setLoading(true);
      const flag = await clearCookies();
      if (flag) {
        setUser(null);
        setToken("");
        localStorage.clear();
        notify({
          type: "success",
          title: "Logout successful",
        });
        router.push("/signin");
      } else {
        notify({
          type: "error",
          title: "Invalid error",
        });
      }
    } catch (e) {
      console.log(e);
      notify({
        type: "error",
        title: "Invalid error",
      });
    } finally {
      setLoading(false);
    }
  };
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
            onClick={() => {
              handleLogout();
            }}
            className="w-[100px] h-[45px] text-[16px] rounded-[9px] flex flex-row items-center justify-center"
          >
            <div className="flex flex-row items-center justify-center gap-2">
              {loading && <SpinnerBtn />}
              <div>Logout</div>
            </div>
          </PrimaryBtn>
        </div>
      </DialogContent>
    </Dialog>
  );
};
