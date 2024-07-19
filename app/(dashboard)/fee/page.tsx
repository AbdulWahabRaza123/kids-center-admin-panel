"use client";
import { useAllFees } from "@/actions/queries";
import { EditDisableMenuComp } from "@/components/menu-bar";
import { QRCodeDialog } from "@/components/ui/dialogs/qr-code-dialog";
import { SelectInput } from "@/components/ui/inputs/select-input";
import { SpinnerWrapper } from "@/components/ui/wrappers/spinner-wrapper";
import { AuthStatesContext } from "@/context/auth";
import { FeeDetails } from "@/interface/fees-intrface";
import { iSOFormattedDate } from "@/logic/date-logic";
import { Ellipsis, EllipsisVertical } from "lucide-react";
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
const feeFilterOptions = [
  {
    title: "Date",
    value: "date",
  },
  {
    title: "Mode",
    value: "mode",
  },
  {
    title: "Pending",
    value: "pending",
  },
  {
    title: "Status",
    value: "status",
  },
];
export default function FeePage() {
  const { user, token } = AuthStatesContext();
  const { data, isLoading, isError } = useAllFees(user ?? user, token ?? token);
  const [mount, setMount] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<FeeDetails | null>(null);
  const [openQRDialog, setOpenQRDialog] = useState(false);
  const [selectOption, setSelectOption] = useState<string>("");
  const [feeItems, setFeeItems] = useState<FeeDetails[]>([]);
  const reset = () => {
    setSelectOption("");
    setFeeItems(data || []);
  };
  const onChangeFilter = (filter: string) => {
    setSelectOption(filter);
    if (filter === "date") {
      const sortedData = data?.sort((a, b) => {
        return (
          new Date(a.payment_date).getTime() -
          new Date(b.payment_date).getTime()
        );
      });
      setFeeItems(sortedData || []);
    } else if (filter === "mode") {
      const sortedData = data?.sort((a, b) => {
        return a.pay_mode.localeCompare(b.pay_mode);
      });
      setFeeItems(sortedData || []);
    } else if (filter === "pending") {
      const sortedData = data?.sort((a, b) => {
        return Number(a.total_pending) - Number(b.total_pending);
      });
      setFeeItems(sortedData || []);
    } else if (filter === "status") {
      const sortedData = data?.sort((a, b) => {
        return a.status.localeCompare(b.status);
      });
      setFeeItems(sortedData || []);
    }
  };
  useEffect(() => {
    setFeeItems(data || []);
  }, [data]);
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
          <div className="flex flex-col items-end gap-2 justify-end">
            <p className="text-[14px] text-gray-400">
              Filter by{" "}
              <span
                onClick={reset}
                className="text-rose-400 underline cursor-pointer"
              >
                /(reset filter)
              </span>
            </p>
            <SelectInput
              options={feeFilterOptions}
              value={selectOption}
              setValue={onChangeFilter}
            />
          </div>
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
              {feeItems?.map((val) => {
                return (
                  <>
                    <tr>
                      <td className="flex flex-row items-center gap-2 w-[30px] text-start p-3">
                        {val.id}
                      </td>
                      <td className="w-[30px] text-start p-3">
                        {val.created_for_id || "-"}
                      </td>
                      <td className="w-[200px] text-start p-3">
                        {val.month || "-"}
                      </td>
                      <td className="w-[300px] ps-4 py-3 pe-3 text-start">
                        {iSOFormattedDate(val.payment_date) || "-"}
                      </td>
                      <td className="w-[200px] ps-4 py-3 pe-3 text-start">
                        {val.pay_mode || "-"}
                      </td>
                      <td className="w-[200px] ps-4 py-3 pe-3 text-start">
                        {val.total_pending || "-"}
                      </td>
                      <td className="w-[200px] ps-4 py-3 pe-3 text-start">
                        {val.status || "-"}
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
