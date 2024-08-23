"use client";
import { useAllComments } from "@/actions/queries";
import { EditDisableMenuComp } from "@/components/menu-bar";
import { OverviewCard } from "@/components/ui/cards/overview-card";
import { QRCodeDialog } from "@/components/ui/dialogs/qr-code-dialog";
import { useNotify } from "@/components/ui/toast/notify";
import { SpinnerWrapper } from "@/components/ui/wrappers/spinner-wrapper";
import { AuthStatesContext } from "@/context/auth";
import { CommentDetails } from "@/interface/comment-interface";
import { client } from "@/lib/client";
import { cn } from "@/lib/utils";
import { iSOFormattedDate } from "@/logic/date-logic";
import {
  ChevronLeft,
  ChevronRight,
  Ellipsis,
  EllipsisVertical,
} from "lucide-react";
import { useEffect, useState } from "react";

const tableHeadings = [
  "Id",
  "Student Name",
  "Nanny Name",
  "Activity Id",
  "Date",
  "Description",
  "More",
];

export default function CommentPage() {
  const notify = useNotify();
  const { user, token } = AuthStatesContext();
  const { data, isLoading, isError, refetch } = useAllComments(
    user ?? user,
    token ?? token
  );
  const [cursor, setCursor] = useState(0);
  const [mount, setMount] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<CommentDetails | null>(null);
  const [openQRDialog, setOpenQRDialog] = useState(false);
  const deleteComment = async (id: number) => {
    if (!id) {
      notify({
        title: "Id not found",
        type: "warning",
      });
    }
    try {
      const res = await client.delete(`/comment/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      notify({
        title: "Comment deleted successfully",
        type: "success",
      });
      refetch();
    } catch (e) {
      console.log(e);
      notify({
        title: "Invalid error",
        type: "error",
      });
    }
  };
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
          id={selectedData.commentId}
        />
      )}

      <main className="flex flex-col px-10">
        <div className="flex flex-row items-start justify-between">
          <h1 className="text-[26px] font-[600]">Comment Details</h1>
        </div>

        {data && (
          <div className="mt-10 flex items-center gap-5 flex-wrap">
            {[
              {
                title: "Total Comments",
                value: data.length,
              },
            ].map((item) => (
              <OverviewCard
                key={item.title}
                title={item.title}
                value={item.value}
              />
            ))}
          </div>
        )}

        <SpinnerWrapper loading={isLoading}>
          <table className="w-full mt-10 max-h-[70vh] overflow-auto">
            <thead className="bg-[#7A1FA01A] shadow-md">
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
              {data?.slice(cursor, cursor + 8)?.map((val) => {
                return (
                  <>
                    <tr>
                      <td className="w-[50px] text-start p-3">
                        {val.commentId}
                      </td>
                      <td className="w-[50px] text-start p-3">
                        {val.userEmail || "-"}
                      </td>
                      <td className="w-[50px] text-start p-3">
                        {val.targetUserEmail || "-"}
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
                          onClick={(selectedOpt: "edit" | "ban" | "qr") => {
                            if (selectedOpt === "qr") {
                              setSelectedData(val);
                              setOpenQRDialog(true);
                            } else if (selectedOpt === "ban") {
                              deleteComment(val.commentId);
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
      </main>
    </>
  );
}
