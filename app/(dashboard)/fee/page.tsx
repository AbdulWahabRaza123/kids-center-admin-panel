"use client";
import { useAllFees } from "@/actions/queries";
import { QRCodeDialog } from "@/components/ui/dialogs/qr-code-dialog";
import { SpinnerWrapper } from "@/components/ui/wrappers/spinner-wrapper";
import { AuthStatesContext } from "@/context/auth";
import { FeeDetails } from "@/interface/fees-intrface";
import { Ellipsis } from "lucide-react";
import { useEffect, useState } from "react";

const tableHeadings = [
  "Id",
  "Receiver Id",
  "Month",
  "Date",
  "Mode",
  "Pending",
  "Status",
  "More",
];

export default function FeePage() {
  const { user, token } = AuthStatesContext();
  const { data, isLoading, isError } = useAllFees(user ?? user, token ?? token);
  const [mount, setMount] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<FeeDetails | null>(null);
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
          <h1 className="text-[26px] font-[600]">Fee Details</h1>
        </div>
        <SpinnerWrapper loading={isLoading}>
          <table className="w-full mt-10 max-h-[70vh] overflow-auto">
            <thead className="bg-[#7A1FA01A]">
              {tableHeadings.map((heading) => (
                <th key={heading} className="w-[200px] text-start p-3">
                  {heading}
                </th>
              ))}
            </thead>
            <tbody>
              {data?.map((val) => {
                return (
                  <>
                    <tr>
                      <td className="flex flex-row items-center gap-2 w-[200px] text-start p-3">
                        {val.id}
                      </td>
                      <td className="w-[200px] text-start p-3">
                        {val.created_for_id || "-"}
                      </td>
                      <td className="w-[200px] text-start p-3">
                        {val.month || "-"}
                      </td>
                      <td className="w-[200px] ps-5 py-3 pe-3 text-start">
                        {val.payment_date || "-"}
                      </td>
                      <td className="w-[200px] ps-7 py-3 pe-3 text-center">
                        {val.pay_mode || "-"}
                      </td>
                      <td className="w-[200px] ps-7 py-3 pe-3 text-center">
                        {val.total_pending || "-"}
                      </td>
                      <td className="w-[200px] ps-7 py-3 pe-3 text-center">
                        {val.status || "-"}
                      </td>
                      <td className="w-[200px] ps-7 py-3 pe-3 text-center">
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
