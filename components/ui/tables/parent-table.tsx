import { EditDisableMenuComp } from "@/components/menu-bar";
import { ParentDetails } from "@/interface/user-interface";
import { ChevronLeft, ChevronRight, EllipsisVertical } from "lucide-react";
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
  const [cursor, setCursor] = useState(0);
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
      <table className="w-full mt-10 max-h-[75vh] overflow-auto">
        <thead className="bg-[#7A1FA01A] shadow-md">
          {headings.map((heading) => (
            <th key={heading} className="w-[200px] text-start p-3">
              {heading}
            </th>
          ))}
        </thead>
        <tbody className=" shadow-sm py-14">
          {data?.slice(cursor, cursor + 8)?.map((val: ParentDetails) => {
            if (val?.disabled === 1) {
              return <></>;
            }
            return (
              <>
                <tr>
                  {/* <td className="w-[200px] text-start p-3">
                    {val.user_id || "-"}
                  </td> */}
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
