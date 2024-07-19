"use client";
import { PrimaryBtn } from "@/components/ui/buttons/primary-btn";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CreateOrEditProfileDialog } from "@/components/ui/dialogs/create-edit-profile";
import {
  useAllFinancers,
  useAllNanies,
  useAllParents,
} from "@/actions/queries";
import { SpinnerWrapper } from "@/components/ui/wrappers/spinner-wrapper";
import { ParentTableComp } from "@/components/ui/tables/parent-table";
import { NanyTableComp } from "@/components/ui/tables/nany-table";
import { SelectInput } from "@/components/ui/inputs/select-input";
import { AuthStatesContext } from "@/context/auth";
import { FinanceTableComp } from "@/components/ui/tables/finance-table";
const nanyTableHeadings = [
  // "User ID",
  "Nany ID",
  "Name",
  "Email",
  "Phone No",
  "Qualification",
  "Reg No",
  "Action",
];
const parentTableHeadings = [
  // "User ID",
  "Student ID",
  "Name",
  "Email",
  "Phone No",
  "Class",
  "Roll No",
  "Action",
];
const financeTableHeadings = ["User ID", "Email", "Action"];

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
    title: "Finance",
    value: "finance",
  },
];

export default function StudentManagement() {
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
  const [openUserDialog, setOpenUserDialog] = useState(false);
  const [mount, setMount] = useState<boolean>(false);
  // const [value, setValue] = useState<string>("parent");
  useEffect(() => {
    setMount(true);
  }, []);
  if (!mount) return null;
  return (
    <>
      <CreateOrEditProfileDialog
        open={openUserDialog}
        setOpen={setOpenUserDialog}
        edit={false}
      />
      <main className="flex flex-col px-10">
        <div className="flex flex-row items-start justify-between">
          <h1 className="text-[26px] font-[600]">User Management</h1>
          <div className="flex flex-col items-end gap-2">
            <SelectInput
              options={options}
              value={selectedOption}
              setValue={setSelectedOption}
            />

            <PrimaryBtn
              className="w-[200px] text-[16px] h-[40px] flex flex-row items-center justify-center"
              onClick={() => {
                setOpenUserDialog(true);
              }}
            >
              Create Profile
            </PrimaryBtn>
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
            {selectedOption === "parent" && (
              <div className="flex flex-col items-start gap-2 text-white">
                <p>Parents</p>
                <p>{parentsData?.length || 0}</p>
              </div>
            )}
            {selectedOption === "nany" && (
              <div className="flex flex-col items-start gap-2 text-white">
                <p>Nanies</p>
                <p>{naniesData?.length || 0}</p>
              </div>
            )}
            {selectedOption === "finance" && (
              <div className="flex flex-col items-start gap-2 text-white">
                <p>Financers</p>
                <p>{financersData?.length || 0}</p>
              </div>
            )}
          </div>
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
              edit={true}
            />
          )}
          {selectedOption === "nany" && (
            <NanyTableComp
              headings={nanyTableHeadings}
              data={naniesData}
              edit={true}
            />
          )}
          {selectedOption === "finance" && (
            <FinanceTableComp
              headings={financeTableHeadings}
              data={financersData}
              edit={true}
            />
          )}
        </SpinnerWrapper>
      </main>
    </>
  );
}
