"use client";
import React, { useState } from "react";
import { SearchInput } from "./ui/inputs/search-input";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import { MenubarComp } from "./menu-bar";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AuthStatesContext } from "@/context/auth";
import {
  useAllFees,
  useAllFinancers,
  useAllNanies,
  useAllParents,
} from "@/actions/queries";
import { maskEmail } from "@/logic/user-logic";
const options = [
  {},
  // {
  //   name: "Home",
  //   value: "home",
  // },
  // {
  //   name: "Logout",
  //   value: "logout",
  // },
];
const Navbar = () => {
  const { user, selectedOption, setSelectedOption, token } =
    AuthStatesContext();
  const {
    data: nanyData,
    isLoading: isNanyLoading,
    isError: isNanyError,
  } = useAllNanies(user ?? user, token ?? token);
  const {
    data: parentData,
    isLoading: isParentLoading,
    isError: isParentError,
  } = useAllParents(user ?? user, token ?? token);
  const {
    data: financeData,
    isLoading: isFinanceLoading,
    isError: isFinanceError,
  } = useAllFinancers(user ?? user, token ?? token);
  const { data: feeData, isLoading: isFeeLoading } = useAllFees(
    user ?? user,
    token ?? token
  );

  const [search, setSearch] = useState("");
  const [recommededData, setRecommededData] = useState<any>([]);

  const onSearchData = (e: any) => {
    const value = e.target.value;
    setSearch(value);
    //going to search the data and store in recommendedData according to the options
    if (user.role !== "finance") {
      if (selectedOption === "parent") {
        const filteredData = parentData?.filter(
          (data) =>
            data?.email?.includes(value) ||
            data?.student_id === value ||
            data?.roll_no === value ||
            data?.class === value
        );
        if (filteredData && filteredData?.length > 0) {
          setRecommededData(filteredData);
        }
      } else if (selectedOption === "nany") {
        const filteredData = nanyData?.filter(
          (data) =>
            data?.email?.includes(value) ||
            data?.qualification?.includes(value) ||
            data?.reg_no?.includes(value)
        );
        if (filteredData && filteredData?.length > 0) {
          setRecommededData(filteredData);
        }
      }
    } else {
      if (user.role === "finance") {
        const filteredData = feeData?.filter(
          (data) =>
            data?.id === value ||
            data?.status === value ||
            data?.created_for_id === value
        );
        if (filteredData && filteredData?.length > 0) {
          setRecommededData(filteredData);
        }
      } else {
        const filteredData = financeData?.filter(
          (data) => data?.email?.includes(value) || data.role.includes(value)
        );
        if (filteredData && filteredData?.length > 0) {
          setRecommededData(filteredData);
        }
      }
      setSearch(value);
    }
    if (!value) {
      setRecommededData([]);
    }
  };
  return (
    <div className="h-[90px] w-full flex flex-row items-center justify-between px-10">
      <div className="w-[350px] relative">
        <SearchInput
          value={search}
          setValue={onSearchData}
          className="relative"
        />
        {recommededData.length > 0 && (
          <div className="absolute top-[50px] w-full bg-white shadow-lg rounded-[10px]">
            {recommededData.map((data: any) =>
              user.role === "finance" ? (
                <>
                  <div
                    className="flex flex-col items-start p-2 hover:bg-slate-400/10"
                    key={data.id}
                  >
                    {/* <p className="text-ellipsis line-clamp-1">{data.id}</p> */}
                    <p className="text-ellipsis line-clamp-1">
                      Created For: {data.created_for_id}
                    </p>
                    <p className="text-ellipsis line-clamp-1 text-[12px]">
                      Status:{data.status}
                    </p>
                  </div>
                </>
              ) : (
                <div
                  className="flex flex-row items-center gap-2 p-2 hover:bg-slate-400/10"
                  key={data.id}
                >
                  <Image
                    src="/assets/profile.svg"
                    alt="profile"
                    width={50}
                    height={50}
                    className="rounded-full object-cover"
                  />
                  <div className="flex flex-col text-start">
                    <p className="text-ellipsis line-clamp-1">{data.email}</p>
                    <p className="text-[10px] text-gray-400">{data.role}</p>
                  </div>
                </div>
              )
            )}
          </div>
        )}
      </div>

      <div className="flex flex-row items-center gap-2">
        <div className="flex flex-row items-center gap-2 cursor-pointer hover:bg-slate-400/10 active:bg-slate-400/20 p-2 rounded-[10px]">
          <Image
            src="/assets/profile.svg"
            alt="profile"
            width={50}
            height={50}
            className="rounded-full object-cover"
          />
          <div className="flex flex-col text-start">
            <p className="text-ellipsis line-clamp-1">
              {maskEmail(user?.email)}
            </p>
            <p className="text-[10px] text-gray-400">{user?.role}</p>
          </div>
          <ChevronDown className="text-gray-400 w-7 h-7" />
        </div>
        {/* </MenubarComp> */}
      </div>
    </div>
  );
};

export default Navbar;
