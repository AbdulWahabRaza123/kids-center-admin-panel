"use client";
import { PrimaryBtn } from "@/components/ui/buttons/primary-btn";
import Image from "next/image";
import { useEffect, useState } from "react";
import { EllipsisVertical } from "lucide-react";
import { CreateNewProfileDialog } from "@/components/ui/dialogs/create-new-profile";
import { useAllNanies, useAllParents } from "@/actions/queries";
import { SpinnerWrapper } from "@/components/ui/wrappers/spinner-wrapper";
import { ParentTableComp } from "@/components/ui/tables/parent-table";
import { NanyTableComp } from "@/components/ui/tables/nany-table";
import { SelectInput } from "@/components/ui/inputs/select-input";
const nanyTableHeadings = [
  "User ID",
  "Nany ID",
  "Name",
  "Email",
  "Phone No",
  "Qualification",
  "Reg No",
  "Action",
];
const parentTableHeadings = [
  "User ID",
  "Student ID",
  "Name",
  "Email",
  "Phone No",
  "Class",
  "Roll No",
  "Action",
];
const options = [
  {
    title: "Parent",
    value: "parent",
  },
  {
    title: "Nanny",
    value: "nany",
  },
];
const tableHeadings = ["Username", "Email", "Performance", "Action"];
const data = [
  {
    profile: "/assets/profile.svg",
    name: "Raza",
    email: "raza@gmail.com",
    performance: "Good",
  },
  {
    profile: "/assets/profile.svg",
    name: "Raza",
    email: "raza@gmail.com",
    performance: "Good",
  },
  {
    profile: "/assets/profile.svg",
    name: "Raza",
    email: "raza@gmail.com",
    performance: "Good",
  },
];
const tableOptions = [
  {
    name: "Edit",
    value: "edit",
  },
  {
    name: "Delete",
    value: "delete",
  },
];
export default function StudentManagement() {
  const {
    data: naniesData,
    isLoading: naniesLoading,
    error: naniesError,
  } = useAllNanies();
  const {
    data: parentsData,
    isLoading: parentsLoading,
    error: parentsError,
  } = useAllParents();
  const [mount, setMount] = useState<boolean>(false);
  const [value, setValue] = useState<string>("parent");
  useEffect(() => {
    setMount(true);
  }, []);
  if (!mount) return null;
  return (
    <main className="flex flex-col px-10">
      <div className="flex flex-row items-start justify-between">
        <h1 className="text-[26px] font-[600]">User Management</h1>
        <div className="flex flex-col items-end gap-2">
          <SelectInput options={options} value={value} setValue={setValue} />

          <CreateNewProfileDialog>
            <PrimaryBtn
              className="w-[200px] text-[16px] h-[40px] flex flex-row items-center justify-center"
              onClick={() => console.log("Create Profile")}
            >
              Create Profile
            </PrimaryBtn>
          </CreateNewProfileDialog>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center">
        <div className="bg-primary p-3 flex flex-row items-center justify-start w-[300px] gap-2 rounded-[10px] mt-6 mb-2">
          <Image
            src="/assets/dashboard/student.svg"
            width={70}
            height={70}
            alt="search"
            className="object-cover"
          />
          {value === "parent" && (
            <div className="flex flex-col items-start gap-2 text-white">
              <p>Parents</p>
              <p>{parentsData?.length || 0}</p>
            </div>
          )}
          {value === "nany" && (
            <div className="flex flex-col items-start gap-2 text-white">
              <p>Nanies</p>
              <p>{naniesData?.length || 0}</p>
            </div>
          )}
        </div>
      </div>

      <SpinnerWrapper loading={naniesLoading || parentsLoading}>
        {value === "parent" && (
          <ParentTableComp
            headings={parentTableHeadings}
            data={parentsData}
            edit={true}
          />
        )}
        {value === "nany" && (
          <NanyTableComp
            headings={nanyTableHeadings}
            data={naniesData}
            edit={true}
          />
        )}
      </SpinnerWrapper>
    </main>
  );
}
