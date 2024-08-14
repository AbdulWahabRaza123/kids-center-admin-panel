"use client";
import { useAllFees } from "@/actions/queries";
import { EditDisableMenuComp } from "@/components/menu-bar";
import { QRCodeDialog } from "@/components/ui/dialogs/qr-code-dialog";
import { SpinnerWrapper } from "@/components/ui/wrappers/spinner-wrapper";
import { AuthStatesContext } from "@/context/auth";
import { FeeDetails } from "@/interface/fees-intrface";
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
  "Received from",
  "Month",
  "Date",
  "Mode",
  "Pending",
  "Status",
  "More",
];

export default function FinancePage() {
  const { user, token } = AuthStatesContext();
  const { data, isLoading, isError } = useAllFees(user ?? user, token ?? token);
  const [cursor, setCursor] = useState(0);
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
              {data?.slice(cursor, cursor + 8)?.map((val: FeeDetails) => {
                return (
                  <>
                    <tr>
                      <td className="w-[50px] text-start p-3">{val.id}</td>
                      <td className="w-[100px] text-start p-3">
                        {val.createdForEmail}
                      </td>
                      <td className="w-[200px] text-start p-3">{val.month}</td>
                      <td className="w-[300px] ps-4 py-3 pe-3 text-start">
                        {iSOFormattedDate(val.payment_date)}
                      </td>
                      <td className="w-[200px] ps-4 py-3 pe-3 text-start">
                        {val.pay_mode}
                      </td>
                      <td className="w-[200px] ps-4 py-3 pe-3 text-start">
                        {val.total_pending}
                      </td>
                      <td className="w-[200px] ps-4 py-3 pe-3 text-start">
                        {val.status}
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
