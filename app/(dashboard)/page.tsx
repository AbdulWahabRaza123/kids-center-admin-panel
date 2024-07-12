"use client";
import {
  useAllFinancers,
  useAllNanies,
  useAllParents,
  useAllTeachers,
} from "@/actions/queries";
import { SelectInput } from "@/components/ui/inputs/select-input";
import { FinanceTableComp } from "@/components/ui/tables/finance-table";
import { NanyTableComp } from "@/components/ui/tables/nany-table";
import { ParentTableComp } from "@/components/ui/tables/parent-table";
import { TeacherTableComp } from "@/components/ui/tables/teacher-table";
import { SpinnerWrapper } from "@/components/ui/wrappers/spinner-wrapper";
import { AuthStatesContext } from "@/context/auth";
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
const financeTableHeadings = ["User ID", "Email"];
const teacherTableHeadings = ["User ID", "Email"];
const options = [
  {
    title: "Parent",
    value: "parent",
  },
  {
    title: "Nanny",
    value: "nany",
  },
  {
    title: "Financer",
    value: "finance",
  },
  {
    title: "Teacher",
    value: "teacher",
  },
];

export default function Home() {
  const { user, token } = AuthStatesContext();
  const {
    data: naniesData,
    isLoading: naniesLoading,
    error: naniesError,
  } = useAllNanies(user ?? user, token ?? token);
  const {
    data: parentsData,
    isLoading: parentsLoading,
    error: parentsError,
  } = useAllParents(user ?? user, token ?? token);
  const {
    data: financersData,
    isLoading: financersLoading,
    error: financersError,
  } = useAllFinancers(user ?? user, token ?? token);
  const {
    data: teacherData,
    isLoading: teacherLoading,
    error: teacherError,
  } = useAllTeachers(user ?? user, token ?? token);
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
      <SpinnerWrapper
        loading={
          value === "nany"
            ? naniesLoading
            : value === "parent"
            ? parentsLoading
            : value === "finance"
            ? financersLoading
            : value === "teacher"
            ? teacherLoading
            : false
        }
      >
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
        {value === "finance" && (
          <FinanceTableComp
            headings={financeTableHeadings}
            data={financersData}
            edit={false}
          />
        )}
        {value === "teacher" && (
          <TeacherTableComp
            headings={teacherTableHeadings}
            data={teacherData}
            edit={false}
          />
        )}
      </SpinnerWrapper>
    </main>
  );
}
