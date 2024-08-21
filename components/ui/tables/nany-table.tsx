import { EditDisableMenuComp } from "@/components/menu-bar";
import { NanyDetails } from "@/interface/user-interface";
import { ChevronLeft, ChevronRight, EllipsisVertical } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { CreateOrEditProfileDialog } from "../dialogs/create-edit-profile";
import { UserBanConfirmationDialog } from "../dialogs/user-ban-confirmation-dialog";
import { QRCodeDialog } from "../dialogs/qr-code-dialog";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import { AuthStatesContext } from "@/context/auth";
import { useNotify } from "../toast/notify";
import { useAllDeactivatedNanies, useAllNanies } from "@/actions/queries";
import { client } from "@/lib/client";
const SelectStatus = ({
  val,
  banUser,
}: {
  val: NanyDetails;
  banUser: (id: number) => void;
}) => {
  const [selectStatus, setSelectStatus] = useState(
    val.disabled === 1 ? true : false
  );

  const changeStatus = async (val: boolean, id: number) => {
    if (!val) {
      setSelectStatus(true);
      banUser(id);
    } else {
    }
  };
  return (
    <>
      <Toggle
        id="cheese-status"
        defaultChecked={true}
        checked={selectStatus}
        onChange={(e) => {
          const status = e.target.checked;
          console.log("This is status ", status);
          changeStatus(status, val.user_id);
        }}
      />
    </>
  );
};
export const NanyTableComp = ({
  headings,
  data,
  edit = false,
  deactivate = false,
}: {
  headings: string[];
  data: NanyDetails[] | undefined;
  edit: boolean;
  deactivate?: boolean;
}) => {
  const notify = useNotify();
  const { user, token } = AuthStatesContext();
  const [cursor, setCursor] = useState(0);
  const { refetch: refetchDeactivatedUsers } = useAllDeactivatedNanies(
    user ?? user,
    token ?? token
  );
  const { refetch: refetchUsers } = useAllNanies(user ?? user, token ?? token);
  const [selectedData, setSelectedData] = useState<NanyDetails | null>(null);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openBanDialog, setOpenBanDialog] = useState(false);
  const [openQRDialog, setOpenQRDialog] = useState(false);
  const activateUser = async (id: number) => {
    if (!id || !token) {
      notify({
        type: "warning",
        title: "Invalid error",
      });
      return;
    }

    try {
      const res = await client.get(`/auth/users/enable/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      refetchUsers();
      refetchDeactivatedUsers();
      notify({
        type: "success",
        title: "User enabled successfully",
      });
    } catch (e) {
      console.log(e);
      notify({
        type: "error",
        title: "Invalid error",
      });
    }
  };
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
      {selectedData && openBanDialog && (
        <UserBanConfirmationDialog
          open={openBanDialog}
          setOpen={setOpenBanDialog}
          id={selectedData.user_id}
          role="nany"
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
          {headings?.map((heading) => (
            <th key={heading} className="w-[200px] text-start p-3">
              {heading}
            </th>
          ))}
        </thead>
        <tbody>
          {data?.slice(cursor, cursor + 8)?.map((val: NanyDetails) => {
            // if (val?.disabled === 1) {
            //   return <></>;
            // }
            return (
              <>
                <tr>
                  {/* <td className="w-[200px] text-start p-3">
                    {val.user_id || "-"}
                  </td> */}
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
                  {deactivate && (
                    <>
                      <SelectStatus
                        val={val}
                        banUser={() => {
                          activateUser(val.user_id);
                        }}
                      />
                    </>
                  )}
                  {edit && (
                    <td className="w-[200px] text-start p-3">
                      <EditDisableMenuComp
                        onClick={(selectedOpt) => {
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
