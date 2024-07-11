import { EditDelMenuComp } from "@/components/menu-bar";
import { NanyDetails } from "@/interface/user-interface";
import { EllipsisVertical } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { CreateOrEditProfileDialog } from "../dialogs/create-edit-profile";

export const NanyTableComp = ({
  headings,
  data,
  edit = false,
}: {
  headings: string[];
  data: NanyDetails[] | undefined;
  edit: boolean;
}) => {
  const [selectedData, setSelectedData] = useState<NanyDetails | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  return (
    <>
      {selectedData && (
        <CreateOrEditProfileDialog
          open={openEditDialog}
          setOpen={setOpenEditDialog}
          data={selectedData}
          edit={edit}
        />
      )}
      <table className="w-full mt-10 max-h-[70vh] overflow-auto">
        <thead className="bg-[#7A1FA01A]">
          {headings?.map((heading) => (
            <th key={heading} className="w-[200px] text-start p-3">
              {heading}
            </th>
          ))}
        </thead>
        <tbody>
          {data?.map((val: NanyDetails) => {
            return (
              <>
                <tr>
                  <td className="w-[200px] text-start p-3">
                    {val.user_id || "-"}
                  </td>
                  <td className="w-[200px] text-start p-3">
                    {val.nany_id || "-"}
                  </td>
                  <td className="flex flex-row items-center gap-2 w-[200px] text-start p-3">
                    {val.nany_name ? (
                      <>
                        <Image
                          src="/assets/profile.svg"
                          width={30}
                          height={30}
                          alt="profile"
                          className="rounded-full object-cover"
                        />
                        <p>{val.nany_name || "-"}</p>
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
                    {val.qualification || "-"}
                  </td>
                  <td className="w-[200px] text-start p-3">
                    {val.reg_no || "-"}
                  </td>
                  {edit && (
                    <td className="w-[200px] text-start p-3">
                      <EditDelMenuComp
                        onClick={(selectedOpt) => {
                          if (selectedOpt === "edit") {
                            setSelectedData(val);
                            setOpenEditDialog(true);
                          }
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
