import { EditDisableMenuComp } from "@/components/menu-bar";
import { UserDetails } from "@/interface/user-interface";
import { EllipsisVertical } from "lucide-react";
import Image from "next/image";

export const FinanceTableComp = ({
  headings,
  data,
  edit = false,
}: {
  headings: string[];
  data: UserDetails[] | undefined;
  edit: boolean;
}) => {
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
          {data?.map((val: UserDetails) => {
            return (
              <>
                <tr>
                  <td className="w-[200px] text-start p-3">{val.id || "-"}</td>
                  <td className="w-[200px] text-start p-3">
                    {val.email || "-"}
                  </td>
                  {edit && (
                    <td className="w-[200px] text-start p-3">
                      <EditDisableMenuComp
                        onClick={(selectedOpt) => {
                          console.log("This is selected option");
                        }}
                      >
                        <EllipsisVertical className="cursor-pointer" />
                      </EditDisableMenuComp>
                    </td>
                  )}
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
