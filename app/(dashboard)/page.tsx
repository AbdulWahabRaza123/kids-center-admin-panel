"use client";
import { useAllNanies, useAllParents } from "@/actions/queries";
import { SelectInput } from "@/components/ui/inputs/select-input";
import { NanyTableComp } from "@/components/ui/tables/nany-table";
import { ParentTableComp } from "@/components/ui/tables/parent-table";
import { SpinnerWrapper } from "@/components/ui/wrappers/spinner-wrapper";
import { useEffect, useState } from "react";
const nanyTableHeadings = [
  "User ID",
  "Nany ID",
  "Name",
  "Email",
  "Phone No",
  "Qualification",
  "Reg No",
];
const parentTableHeadings = [
  "User ID",
  "Student ID",
  "Name",
  "Email",
  "Phone No",
  "Class",
  "Roll No",
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

export default function Home() {
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
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-[26px] font-[600]">Welcome!</h1>
        <SelectInput options={options} value={value} setValue={setValue} />
      </div>
      <SpinnerWrapper loading={naniesLoading || parentsLoading}>
        {value === "parent" && (
          <ParentTableComp
            headings={parentTableHeadings}
            data={parentsData}
            edit={false}
          />
        )}
        {value === "nany" && (
          <NanyTableComp
            headings={nanyTableHeadings}
            data={naniesData}
            edit={false}
          />
        )}
      </SpinnerWrapper>
    </main>
  );
}
