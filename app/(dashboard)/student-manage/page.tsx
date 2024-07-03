"use client";
import { PrimaryBtn } from "@/components/ui/buttons/primary-btn";
import { SelectInput } from "@/components/ui/inputs/select-input";
import Image from "next/image";
import { useEffect, useState } from "react";

const options = [
  {
    title: "Student",
    value: "student",
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
export default function StudentManagement() {
  const [mount, setMount] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
  useEffect(() => {
    setMount(true);
  }, []);
  if (!mount) return null;
  return (
    <main className="flex flex-col px-10">
      <div className="flex flex-row items-start justify-between">
        <h1 className="text-[26px] font-[600]">Student Management</h1>
        <PrimaryBtn
          className="w-[200px] text-[16px] h-[40px] flex flex-row items-center justify-center"
          onClick={() => console.log("Create Profile")}
        >
          Create Profile
        </PrimaryBtn>
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
          <div className="flex flex-col items-start gap-2 text-white">
            <p>Students</p>
            <p>280</p>
          </div>
        </div>
      </div>

      <table className="w-full mt-10">
        <thead className="bg-[#7A1FA01A]">
          {tableHeadings.map((heading) => (
            <th key={heading} className="w-[200px] text-start p-3">
              {heading}
            </th>
          ))}
        </thead>
        <tbody>
          {data.map((val) => {
            return (
              <>
                <tr>
                  <td className="flex flex-row items-center gap-2 w-[200px] text-start p-3">
                    <Image
                      src={val.profile}
                      width={30}
                      height={30}
                      alt="profile"
                      className="rounded-full object-cover"
                    />
                    <p>{val.name}</p>
                  </td>
                  <td className="w-[200px] text-start p-3">{val.email}</td>
                  <td className="w-[200px] text-start p-3">
                    {val.performance}
                  </td>
                  <td className="w-[200px] text-start p-3">Action</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
