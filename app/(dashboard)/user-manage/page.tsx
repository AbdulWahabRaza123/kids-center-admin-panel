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
import {
  NanyDetails,
  ParentDetails,
  UserDetails,
} from "@/interface/user-interface";
const nanyTableHeadings = [
  "Nany ID",
  "Name",
  "Email",
  "Phone No",
  "Qualification",
  "Reg No",
  "Action",
];
const parentTableHeadings = [
  "Student ID",
  "Name",
  "Email",
  "Phone No",
  "Class",
  "Roll No",
  "Action",
];
const financeTableHeadings = ["User ID", "Email", "Action"];
const parentFilterOptions = [
  {
    title: "Roll No",
    value: "roll-no",
  },
  {
    title: "Class",
    value: "class",
  },
  {
    title: "Student Id",
    value: "student-id",
  },
];
const nanyFilterOption = [
  {
    title: "Qualification",
    value: "qualification",
  },
  {
    title: "Registration No",
    value: "reg-no",
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
  const [selectOption, setSelectOption] = useState<string>(
    selectedOption === "parent" ? "" : ""
  );
  const [nanyItems, setNanyItems] = useState<NanyDetails[]>([]);
  const [financerItems, setFinancerItems] = useState<UserDetails[]>([]);
  const [parentItems, setParentItems] = useState<ParentDetails[]>([]);
  const [search, setSearch] = useState("");
  const reset = () => {
    setSelectOption("");
    setNanyItems(naniesData || []);
    setParentItems(parentsData || []);
    setFinancerItems(financersData || []);
  };
  const applyingNanyFiltersIfSelected = (filter: string) => {
    if (selectedOption === "nany" && naniesData) {
      const sortedData = [...naniesData].sort((a, b) => {
        switch (filter) {
          case "qualification":
            return a.qualification?.localeCompare(b.qualification || "") || 0;

          case "reg-no":
            return a.reg_no?.localeCompare(b.reg_no || "") || 0;

          default:
            return 0;
        }
      });

      setNanyItems(sortedData);
    }
  };
  const applyingParentFiltersIfSelected = (filter: string) => {
    if (selectedOption === "parent" && parentsData) {
      const sortedData = [...parentsData].sort((a, b) => {
        switch (filter) {
          case "roll-no":
            return a.roll_no?.localeCompare(b.roll_no || "") || 0;

          case "class":
            return a.class?.localeCompare(b.class || "") || 0;

          case "student-id":
            return (
              String(a.student_id)?.localeCompare(String(b.student_id) || "") ||
              0
            );

          default:
            return 0;
        }
      });

      setParentItems(sortedData);
    }
  };
  //   const onSearchRoleBasedData = (e: any) => {
  //     const value=e.target.value;
  //     if (selectedOption === "parent") {
  //       //I am gonna filter all the data based on email, id and name for parents
  //       parentsData?.filter((data)=>{
  // if(data)
  //       })

  //     } else if (selectedOption === "nany") {
  //     } else if (selectedOption === "finance") {
  //     }
  //     setSearch(e.target.value);

  //   };
  const onChangeFilter = (filter: string) => {
    setSelectOption(filter);
    applyingNanyFiltersIfSelected(filter);
    applyingParentFiltersIfSelected(filter);
  };
  useEffect(() => {
    if (naniesData) {
      setNanyItems(naniesData);
    }
    if (parentsData) {
      setParentItems(parentsData);
    }
    if (financersData) {
      setFinancerItems(financersData);
    }
  }, [naniesData, parentsData, financersData]);
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
            <PrimaryBtn
              className="w-[200px] text-[16px] h-[40px] flex flex-row items-center justify-center"
              onClick={() => {
                setOpenUserDialog(true);
              }}
            >
              Create Profile
            </PrimaryBtn>
            <div className="w-full flex flex-col items-end gap-2 justify-end">
              <p className="text-[14px] text-gray-400">
                Filter by{" "}
                <span
                  onClick={reset}
                  className="text-rose-400 underline cursor-pointer"
                >
                  /(reset filter)
                </span>
              </p>
              <SelectInput
                options={
                  selectedOption === "nany"
                    ? nanyFilterOption
                    : selectedOption === "parent"
                    ? parentFilterOptions
                    : []
                }
                value={selectOption}
                setValue={onChangeFilter}
              />
            </div>
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
                <p>{parentItems?.length || 0}</p>
              </div>
            )}
            {selectedOption === "nany" && (
              <div className="flex flex-col items-start gap-2 text-white">
                <p>Nanies</p>
                <p>{nanyItems?.length || 0}</p>
              </div>
            )}
            {selectedOption === "finance" && (
              <div className="flex flex-col items-start gap-2 text-white">
                <p>Financers</p>
                <p>{financerItems?.length || 0}</p>
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
              data={parentItems}
              edit={true}
            />
          )}
          {selectedOption === "nany" && (
            <NanyTableComp
              headings={nanyTableHeadings}
              data={nanyItems}
              edit={true}
            />
          )}
          {selectedOption === "finance" && (
            <FinanceTableComp
              headings={financeTableHeadings}
              data={financerItems}
              edit={true}
            />
          )}
        </SpinnerWrapper>
      </main>
    </>
  );
}
