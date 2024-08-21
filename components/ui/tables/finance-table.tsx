"use client";
import { EditDisableMenuComp } from "@/components/menu-bar";
import { UserDetails } from "@/interface/user-interface";
import { ChevronLeft, ChevronRight, EllipsisVertical } from "lucide-react";
import { useState } from "react";

export const FinanceTableComp = ({
  headings,
  data,
  edit = false,
  deactivate = false,
}: {
  headings: string[];
  data: UserDetails[] | undefined;
  edit: boolean;
  deactivate?: boolean;
}) => {
  const [cursor, setCursor] = useState(0);
  return (
    <>
      <table className="w-full mt-10 max-h-[70vh] overflow-auto">
        <thead className="bg-[#7A1FA01A]">
          {headings?.map((heading) => (
            <th key={heading} className="w-[200px] text-start p-3">
              {heading}
            </th>
          ))}
        </thead>
        <tbody>
          {data?.slice(cursor, cursor + 8)?.map((val: UserDetails) => {
            return (
              <>
                <tr>
                  <td className="w-[200px] text-start p-3">{val.id || "-"}</td>
                  <td className="w-[200px] text-start p-3">
                    {val.email || "-"}
                  </td>
                  {/* {edit && (
                    <td className="w-[200px] text-start p-3">
                      <EditDisableMenuComp
                        onClick={(selectedOpt) => {
                          console.log("This is selected option");
                        }}
                      >
                        <EllipsisVertical className="cursor-pointer" />
                      </EditDisableMenuComp>
                    </td>
                  )} */}
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
      {(!data || data?.length === 0) && (
        <div className="h-[60vh] flex items-center justify-center text-gray-400">
          No data found
        </div>
      )}
      <div className="flex items-center justify-end gap-4 my-7">
        {data && cursor > 0 && (
          <div
            onClick={() => {
              setCursor(cursor - 8);
            }}
            className="flex items-center gap-1 cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5 " />
            <p className="text-[12px]">Prev</p>
          </div>
        )}
        {data && cursor + 8 < data?.length && (
          <div
            onClick={() => {
              setCursor(cursor + 8);
            }}
            className="flex items-center gap-1 cursor-pointer"
          >
            <p className="text-[12px]">Next</p>
            <ChevronRight className="w-5 h-5 " />
          </div>
        )}
      </div>
    </>
  );
};
