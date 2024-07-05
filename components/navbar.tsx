"use client";
import React from "react";
import { SearchInput } from "./ui/inputs/search-input";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { MenubarComp } from "./menu-bar";
import axios from "axios";
import { useRouter } from "next/navigation";
const options = [
  //   {
  //     name: "Profile",
  //     value: "profile",
  //   },
  {
    name: "Logout",
    value: "logout",
  },
];
const Navbar = () => {
  const router = useRouter();
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
      const flag = await clearCookies();
      if (flag) {
        localStorage.clear();
        alert("logout success");
        router.push("/");
      } else {
        alert("Invalid error occured");
      }
    } catch (e) {
      console.log(e);
      alert("invalid error");
    }
  };
  return (
    <div className="h-[90px] w-full flex flex-row items-center justify-between px-10">
      <div className="w-[350px]">
        <SearchInput />
      </div>
      <div className="flex flex-row items-center gap-2">
        <Image
          src={"/assets/icons/bell.svg"}
          width={30}
          height={30}
          alt="bell"
          className="object-cover mt-2"
        />
        <MenubarComp
          options={options}
          onClick={(selectedOpt) => {
            if (selectedOpt === "logout") {
              handleLogout();
            }
            // console.log("This is selected option ", selectedOpt);
          }}
        >
          <div className="flex flex-row items-center gap-2 cursor-pointer hover:bg-slate-400/10 active:bg-slate-400/20 p-2 rounded-[10px]">
            <Image
              src="/assets/profile.svg"
              alt="profile"
              width={50}
              height={50}
              className="rounded-full object-cover"
            />
            <div className="flex flex-col">
              <p>Raza</p>
              <p className="text-[10px] text-gray-400">admin</p>
            </div>
            <ChevronDown className="text-gray-400 w-7 h-7" />
          </div>
        </MenubarComp>
      </div>
    </div>
  );
};

export default Navbar;
