"use client";
import { useAllComments, useAllFeedback } from "@/actions/queries";
import { QRCodeDialog } from "@/components/ui/dialogs/qr-code-dialog";
import { SpinnerWrapper } from "@/components/ui/wrappers/spinner-wrapper";
import { AuthStatesContext } from "@/context/auth";
import { feedbackDetails } from "@/interface/feedback-interface";
import { cn } from "@/lib/utils";
import { iSOFormattedDate } from "@/logic/date-logic";
import { Ellipsis } from "lucide-react";
import { useEffect, useState } from "react";

const tableHeadings = [
  "Id",
  "Sender Id",
  "Rating",
  "Date",
  "Description",
  "More",
];

export default function FeedbackPage() {
  const { user, token } = AuthStatesContext();
  const { data, isLoading, isError } = useAllFeedback(
    user ?? user,
    token ?? token
  );
  const [mount, setMount] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<feedbackDetails | null>(
    null
  );
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
          <h1 className="text-[26px] font-[600]">Feedback Details</h1>
        </div>
        <SpinnerWrapper loading={isLoading}>
          <table className="w-full mt-10 max-h-[70vh] overflow-auto">
            <thead className="bg-[#7A1FA01A]">
              {tableHeadings.map((heading, index) => (
                <th
                  key={heading}
                  className={cn(
                    index === 4 ? "w-[400px]" : "w-[150px]",
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
                        {val.rating || "-"}
                      </td>
                      <td className="w-[250px] ps-5 py-3 pe-3 text-start">
                        {iSOFormattedDate(val.timestamp) || "-"}
                      </td>
                      <td className="w-[400px] ps-7 py-3 pe-3 text-start">
                        {val.description || "-"}
                      </td>
                      <td className="w-[150px] ps-7 py-3 pe-3 text-center">
                        <Ellipsis
                          onClick={() => {
                            setSelectedData(val);
                            setOpenQRDialog(true);
                          }}
                          className="cursor-pointer"
                        />
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
