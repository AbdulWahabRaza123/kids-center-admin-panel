"use client";
import {
  useAllFinancers,
  useAllNanies,
  useAllParents,
} from "@/actions/queries";
import { SelectInput } from "@/components/ui/inputs/select-input";
import { FinanceTableComp } from "@/components/ui/tables/finance-table";
import { NanyTableComp } from "@/components/ui/tables/nany-table";
import { ParentTableComp } from "@/components/ui/tables/parent-table";
import { SpinnerWrapper } from "@/components/ui/wrappers/spinner-wrapper";
import { AuthStatesContext } from "@/context/auth";
import { Activity } from "lucide-react";
import { useEffect, useState } from "react";
const nanyTableHeadings = [
  // "User ID",
  "Nany ID",
  "Name",
  "Email",
  "Phone No",
  "Qualification",
  "Reg No",
];
const parentTableHeadings = [
  // "User ID",
  "Student ID",
  "Name",
  "Email",
  "Phone No",
  "Class",
  "Roll No",
];
const financeTableHeadings = ["User ID", "Email"];
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
];

export default function Home() {
  const { user, token, selectedOption, setSelectedOption } =
    AuthStatesContext();
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
  const [mount, setMount] = useState<boolean>(false);
  useEffect(() => {
    setMount(true);
  }, []);
  if (!mount) return null;
  return (
    <main className="flex flex-col px-10">
      <div className="flex flex-row items-center justify-between">
        <h1 className="text-[26px] font-[600]">Welcome!</h1>
        <SelectInput
          options={options}
          value={selectedOption}
          setValue={setSelectedOption}
        />
      </div>
      <div className="flex items-center gap-5 flex-wrap mt-7 mb-3">
        {[naniesData?.length, parentsData?.length, financersData?.length].map(
          (item, index) => (
            <div
              key={index}
              className="flex flex-col relative items-start px-10 justify-center w-[320px] h-[100px] shadow-md border-[1px] border-gray-400/40 gap-1 rounded-[14px]"
            >
              <p className="text-[24px] text-black/60 font-[700]">
                {options[index].title}
              </p>
              <p className="text-[24px] text-black/60 font-[600]">{item}</p>
              <Activity className="absolute top-[15px] right-[10px] text-primary" />
            </div>
          )
        )}
      </div>
      <SpinnerWrapper
        loading={
          selectedOption === "nany"
            ? naniesLoading
            : selectedOption === "parent"
            ? parentsLoading
            : selectedOption === "finance"
            ? financersLoading
            : false
        }
      >
        {selectedOption === "parent" && (
          <ParentTableComp
            headings={parentTableHeadings}
            data={parentsData}
            edit={false}
          />
        )}
        {selectedOption === "nany" && (
          <NanyTableComp
            headings={nanyTableHeadings}
            data={naniesData}
            edit={false}
          />
        )}
        {selectedOption === "finance" && (
          <FinanceTableComp
            headings={financeTableHeadings}
            data={financersData}
            edit={false}
          />
        )}
      </SpinnerWrapper>
    </main>
  );
}
