"use client";
import { useAllComments } from "@/actions/queries";
import { EditDisableMenuComp } from "@/components/menu-bar";
import { QRCodeDialog } from "@/components/ui/dialogs/qr-code-dialog";
import { SpinnerWrapper } from "@/components/ui/wrappers/spinner-wrapper";
import { AuthStatesContext } from "@/context/auth";
import { CommentDetails } from "@/interface/comment-interface";
import { cn } from "@/lib/utils";
import { iSOFormattedDate } from "@/logic/date-logic";
import { Ellipsis, EllipsisVertical } from "lucide-react";
import { useEffect, useState } from "react";

const tableHeadings = [
  "Id",
  "Parent Id",
  "Nanny Id",
  "Activity Id",
  "Date",
  "Description",
  "More",
];

export default function CommentPage() {
  const { user, token } = AuthStatesContext();
  const { data, isLoading, isError } = useAllComments(
    user ?? user,
    token ?? token
  );
  const [mount, setMount] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<CommentDetails | null>(null);
  const [openQRDialog, setOpenQRDialog] = useState(false);
  useEffect(() => {
    setMount(true);
  }, []);
  if (!mount) return null;

  return (
    <>
      {selectedData && openQRDialog && (
        <QRCodeDialog
          open={openQRDialog}
          setOpen={setOpenQRDialog}
          id={selectedData.id}
        />
      )}

      <main className="flex flex-col px-10">
        <div className="flex flex-row items-start justify-between">
          <h1 className="text-[26px] font-[600]">Comment Details</h1>
        </div>
        <SpinnerWrapper loading={isLoading}>
          <table className="w-full mt-10 max-h-[70vh] overflow-auto">
            <thead className="bg-[#7A1FA01A]">
              {tableHeadings.map((heading, index) => (
                <th
                  key={heading}
                  className={cn(
                    index === 5 ? "w-[400px]" : "w-[150px]",
                    "text-start p-3"
                  )}
                >
                  {heading}
                </th>
              ))}
            </thead>
            <tbody>
              {data?.map((val) => {
                return (
                  <>
                    <tr>
                      <td className="w-[50px] text-start p-3">{val.id}</td>
                      <td className="w-[50px] text-start p-3">
                        {val.userId || "-"}
                      </td>
                      <td className="w-[50px] text-start p-3">
                        {val.targetUserId || "-"}
                      </td>
                      <td className="w-[50px] ps-5 py-3 pe-3 text-start">
                        {val.activityId || "-"}
                      </td>
                      <td className="w-[250px] ps-5 py-3 pe-3 text-start">
                        {iSOFormattedDate(val.timestamp) || "-"}
                      </td>
                      <td className="w-[400px] ps-7 py-3 pe-3 text-start">
                        {val.description || "-"}
                      </td>
                      <td className="w-[200px] text-start p-3">
                        <EditDisableMenuComp
                          edit={false}
                          ban={false}
                          onClick={(selectedOpt: "edit" | "ban" | "qr") => {
                            if (selectedOpt === "qr") {
                              setSelectedData(val);
                              setOpenQRDialog(true);
                            }
                          }}
                        >
                          <EllipsisVertical className="cursor-pointer" />
                        </EditDisableMenuComp>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </SpinnerWrapper>
      </main>
    </>
  );
}
