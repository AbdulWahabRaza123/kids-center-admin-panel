"use client";
import { PrimaryBtn } from "@/components/ui/buttons/primary-btn";
import { AddDelMenuComp, MenubarComp } from "@/components/menu-bar";
import Image from "next/image";
import { useEffect, useState } from "react";
import { EllipsisVertical } from "lucide-react";
import { CreateNewProfileDialog } from "@/components/ui/dialogs/create-new-profile";

const tableHeadings = ["Username", "Email", "QR Code", "Performance", "Active"];
const data = [
  {
    profile: "/assets/profile.svg",
    name: "Raza",
    email: "raza@gmail.com",
    qrCode: "6hsh7",
    performance: "Good",
    status: "active",
  },
  {
    profile: "/assets/profile.svg",
    name: "Raza",
    email: "raza@gmail.com",
    qrCode: "6hsh7",
    performance: "Good",
    status: "inactive",
  },
  {
    profile: "/assets/profile.svg",
    name: "Raza",
    email: "raza@gmail.com",
    qrCode: "6hsh7",
    performance: "Good",
    status: "active",
  },
];

export default function Report() {
  const [mount, setMount] = useState<boolean>(false);
  const [tableSelOption, setTableSelOption] = useState<string>("");
  useEffect(() => {
    setMount(true);
  }, []);
  if (!mount) return null;
  return (
    <main className="flex flex-col px-10">
      <div className="flex flex-row items-start justify-between">
        <h1 className="text-[26px] font-[600]">Reports / Performance</h1>
      </div>

      <table className="w-full mt-10 max-h-[70vh] overflow-auto">
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
                  <td className="w-[200px] text-start p-3">{val.qrCode}</td>
                  <td className="w-[200px] ps-5 py-3 pe-3 text-start">
                    {val.performance}
                  </td>
                  <td className="w-[200px] ps-7 py-3 pe-3 text-center">
                    {val.status === "active" ? (
                      <Image
                        src="/assets/icons/active-user.svg"
                        alt="active"
                        width={20}
                        height={20}
                        className="object-cover"
                      />
                    ) : (
                      <Image
                        src="/assets/icons/inactive-user.svg"
                        alt="active"
                        width={20}
                        height={20}
                        className="object-cover"
                      />
                    )}
                  </td>
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </main>
  );
}
