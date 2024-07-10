"use client";
import { useAllNanies, useAllParents } from "@/actions/queries";
import { Spinner } from "@/components/spinner";
import { SelectInput } from "@/components/ui/inputs/select-input";
import { ParentTableComp } from "@/components/ui/tables/parent-table";
import { NanyDetails, ParentDetails } from "@/interface/user-interface";
import Image from "next/image";
import { useEffect, useState } from "react";

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

const data = [
  {
    id: 1,
    profile: "/assets/profile.svg",
    name: "Raza",
    class: "English",
    age: 20,
    gender: "Male",
    teacherName: "David",
    email: "raza@gmail.com",
  },
  {
    id: 2,
    profile: "/assets/profile.svg",
    name: "Raza",
    class: "English",
    age: 20,
    gender: "Male",
    teacherName: "David",
    email: "raza@gmail.com",
  },
  {
    id: 3,
    profile: "/assets/profile.svg",
    name: "Raza",
    class: "English",
    age: 20,
    gender: "Male",
    teacherName: "David",
    email: "raza@gmail.com",
  },
];

const SpinnerWrapper = ({
  loading,
  children,
}: {
  loading: boolean;
  children: React.ReactNode;
}) => {
  if (loading) {
    return (
      <div className="h-[70vh] w-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  } else {
    return <>{children}</>;
  }
};
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
        <ParentTableComp data={parentsData} />
      </SpinnerWrapper>
    </main>
  );
}
