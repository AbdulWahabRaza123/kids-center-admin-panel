"use client";
import { SelectInput } from "@/components/ui/inputs/select-input";
import Image from "next/image";
import { useEffect, useState } from "react";

const options = [
  {
    title: "Student",
    value: "student",
  },
];
const tableHeadings = [
  "ID",
  "Name",
  "Class",
  "Age",
  "Gender",
  "Teacher",
  "Email",
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
export default function Home() {
  const [mount, setMount] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");
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
                  <td className="w-[200px] text-start p-3">{val.id}</td>
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
                  <td className="w-[200px] text-start p-3">{val.class}</td>
                  <td className="w-[200px] text-start p-3">{val.age}</td>
                  <td className="w-[200px] text-start p-3">{val.gender}</td>
                  <td className="w-[200px] text-start p-3">
                    {val.teacherName}
                  </td>
                  <td className="w-[200px] text-start p-3">{val.email}</td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
