import { EditDelMenuComp } from "@/components/menu-bar";
import { ParentDetails } from "@/interface/user-interface";
import { EllipsisVertical } from "lucide-react";
import Image from "next/image";

export const ParentTableComp = ({
  headings,
  data,
  edit = false,
}: {
  headings: string[];
  data: ParentDetails[] | undefined;
  edit: boolean;
}) => {
  return (
    <>
      <table className="w-full mt-10 max-h-[70vh] overflow-auto">
        <thead className="bg-[#7A1FA01A]">
          {headings.map((heading) => (
            <th key={heading} className="w-[200px] text-start p-3">
              {heading}
            </th>
          ))}
        </thead>
        <tbody>
          {data?.map((val: ParentDetails) => {
            return (
              <>
                <tr>
                  <td className="w-[200px] text-start p-3">
                    {val.user_id || "-"}
                  </td>
                  <td className="w-[200px] text-start p-3">
                    {val.student_id || "-"}
                  </td>
                  <td className="flex flex-row items-center gap-2 w-[200px] text-start p-3">
                    {val.student_name ? (
                      <>
                        <Image
                          src="/assets/profile.svg"
                          width={30}
                          height={30}
                          alt="profile"
                          className="rounded-full object-cover"
                        />
                        <p>{val.student_name || "-"}</p>
                      </>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="w-[200px] text-start p-3">
                    {val.email || "-"}
                  </td>
                  <td className="w-[200px] text-start p-3">
                    {val.phone_no || "-"}
                  </td>
                  <td className="w-[200px] text-start p-3">
                    {val.class || "-"}
                  </td>
                  <td className="w-[200px] text-start p-3">
                    {val.roll_no || "-"}
                  </td>
                  {edit && (
                    <td className="w-[200px] text-start p-3">
                      <EditDelMenuComp
                        onClick={(selectedOpt) => {
                          console.log("This is selected option");
                        }}
                      >
                        <EllipsisVertical className="cursor-pointer" />
                      </EditDelMenuComp>
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
