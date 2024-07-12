import { EditDisableMenuComp } from "@/components/menu-bar";
import { ParentDetails } from "@/interface/user-interface";
import { EllipsisVertical } from "lucide-react";
import Image from "next/image";
import { CreateOrEditProfileDialog } from "../dialogs/create-edit-profile";
import { useState } from "react";
import { UserBanConfirmationDialog } from "../dialogs/user-ban-confirmation-dialog";
import { QRCodeDialog } from "../dialogs/qr-code-dialog";

export const ParentTableComp = ({
  headings,
  data,
  edit = false,
}: {
  headings: string[];
  data: ParentDetails[] | undefined;
  edit: boolean;
}) => {
  const [selectedData, setSelectedData] = useState<ParentDetails | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openBanDialog, setOpenBanDialog] = useState(false);
  const [openQRDialog, setOpenQRDialog] = useState(false);

  return (
    <>
      {selectedData && openEditDialog && (
        <CreateOrEditProfileDialog
          open={openEditDialog}
          setOpen={setOpenEditDialog}
          data={selectedData}
          edit={edit}
        />
      )}
      {selectedData && openBanDialog && (
        <UserBanConfirmationDialog
          open={openBanDialog}
          setOpen={setOpenBanDialog}
          id={selectedData.user_id}
          role="parent"
        />
      )}
      {selectedData && openQRDialog && (
        <QRCodeDialog
          open={openQRDialog}
          setOpen={setOpenQRDialog}
          id={selectedData.user_id}
        />
      )}
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
            if (val?.disabled === 1) {
              return <></>;
            }
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
                      <EditDisableMenuComp
                        onClick={(selectedOpt: "edit" | "ban" | "qr") => {
                          if (selectedOpt === "edit") {
                            setSelectedData(val);
                            setOpenEditDialog(true);
                          } else if (selectedOpt === "ban") {
                            setSelectedData(val);
                            setOpenBanDialog(true);
                          } else if (selectedOpt === "qr") {
                            setSelectedData(val);
                            setOpenQRDialog(true);
                          }
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
