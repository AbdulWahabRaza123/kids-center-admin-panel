"use client";
import { useAllActivities } from "@/actions/queries";
import { ActivityDrawer } from "@/components/ui/drawers/activity-drawer";
import { SpinnerWrapper } from "@/components/ui/wrappers/spinner-wrapper";
import { AuthStatesContext } from "@/context/auth";
import { Ellipsis } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

const tableHeadings = [
  "Id",
  "Nanny id",
  "Parent id",
  "Checkin",
  "Checkout",
  "More",
];

export default function ActivityPage() {
  const { user, token } = AuthStatesContext();
  const { data, isLoading, isError } = useAllActivities(
    user ?? user,
    token ?? token
  );
  const [mount, setMount] = useState<boolean>(false);
  useEffect(() => {
    setMount(true);
  }, []);
  if (!mount) return null;

  return (
    <main className="flex flex-col px-10">
      <div className="flex flex-row items-start justify-between">
        <h1 className="text-[26px] font-[600]">Daily Activities</h1>
      </div>
      <SpinnerWrapper loading={isLoading}>
        <table className="w-full mt-10 max-h-[70vh] overflow-auto">
          <thead className="bg-[#7A1FA01A]">
            {tableHeadings.map((heading) => (
              <th key={heading} className="w-[200px] text-start p-3">
                {heading}
              </th>
            ))}
          </thead>
          <tbody>
            {data?.map((val) => {
              return (
                <>
                  <tr>
                    <td className="flex flex-row items-center gap-2 w-[200px] text-start p-3">
                      {val.id}
                    </td>
                    <td className="w-[200px] text-start p-3">
                      {val.createdById}
                    </td>
                    <td className="w-[200px] text-start p-3">
                      {val.createdForId}
                    </td>
                    <td className="w-[200px] ps-5 py-3 pe-3 text-start">
                      {val.checkinTime}
                    </td>
                    <td className="w-[200px] ps-7 py-3 pe-3 text-center">
                      {val.checkoutTime}
                    </td>
                    <td className="w-[200px] ps-7 py-3 pe-3 text-center">
                      <ActivityDrawer data={val}>
                        <Ellipsis className="cursor-pointer" />
                      </ActivityDrawer>
                    </td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
      </SpinnerWrapper>
    </main>
  );
}
