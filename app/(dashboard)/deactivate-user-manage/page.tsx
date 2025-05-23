"use client";
import { PrimaryBtn } from "@/components/ui/buttons/primary-btn";
import Image from "next/image";
import { useEffect, useState } from "react";
import { CreateOrEditProfileDialog } from "@/components/ui/dialogs/create-edit-profile";
import {
  useAllDeactivatedFinancers,
  useAllDeactivatedNanies,
  useAllDeactivatedParents,
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
import { SearchInput } from "@/components/ui/inputs/search-input";
const nanyTableHeadings = [
  "Nany ID",
  "Name",
  "Email/Username",
  "Phone No",
  "Qualification",
  "Reg No",
  "Action",
];
const parentTableHeadings = [
  "Student ID",
  "Name",
  "Email/Username",
  "Phone No",
  "Class",
  "Roll No",
  "Action",
];
const financeTableHeadings = ["User ID", "Email"];
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
  } = useAllDeactivatedNanies(user ?? user, token ?? token);
  const {
    data: parentsData,
    isLoading: parentsLoading,
    error: parentsError,
  } = useAllDeactivatedParents(user ?? user, token ?? token);
  const {
    data: financersData,
    isLoading: financersLoading,
    error: financersError,
  } = useAllDeactivatedFinancers(user ?? user, token ?? token);
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
  const onSearchRoleBasedData = (e: any) => {
    const value = e.target.value;
    if (selectedOption === "parent") {
      const temp = parentsData?.filter(
        (data) =>
          data?.email.includes(value) ||
          data?.student_name?.toLowerCase()?.includes(value) ||
          data?.user_id?.toString()?.includes(value)
      );
      if (temp) {
        setParentItems(temp);
      }
    } else if (selectedOption === "nany") {
      const temp = naniesData?.filter(
        (data) =>
          data?.email?.toString()?.includes(value) ||
          data?.nany_name?.toLowerCase()?.includes(value) ||
          data?.user_id?.toString()?.includes(value)
      );
      if (temp) {
        setNanyItems(temp);
      }
    } else if (selectedOption === "finance") {
      const temp = financersData?.filter((data) => data?.email.includes(value));
      if (temp) {
        setFinancerItems(temp);
      }
    }
    if (!value) {
      if (selectedOption === "parent") {
        setParentItems(parentsData || []);
      } else if (selectedOption === "nany") {
        setNanyItems(naniesData || []);
      }
    } else if (selectedOption === "finance") {
      setFinancerItems(financersData || []);
    }
    setSearch(value);
  };
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
      <main className="flex flex-col px-10">
        <div className="flex flex-row items-start justify-between">
          <h1 className="text-[26px] font-[600]">User Management</h1>
          <div className="flex flex-col items-end gap-2">
            <SearchInput value={search} setValue={onSearchRoleBasedData} />

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
                <p>Students</p>
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
              edit={false}
              deactivate={true}
            />
          )}
          {selectedOption === "nany" && (
            <NanyTableComp
              headings={nanyTableHeadings}
              data={nanyItems}
              edit={false}
              deactivate={true}
            />
          )}
          {selectedOption === "finance" && (
            <FinanceTableComp
              headings={financeTableHeadings}
              data={financerItems}
              edit={false}
              deactivate={true}
            />
          )}
        </SpinnerWrapper>
      </main>
    </>
  );
}
