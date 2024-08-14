"use client";
import { useAllFees } from "@/actions/queries";
import { EditDisableMenuComp } from "@/components/menu-bar";
import { OverviewCard } from "@/components/ui/cards/overview-card";
import { QRCodeDialog } from "@/components/ui/dialogs/qr-code-dialog";
import { SearchInput } from "@/components/ui/inputs/search-input";
import { SelectInput } from "@/components/ui/inputs/select-input";
import { useNotify } from "@/components/ui/toast/notify";
import { SpinnerWrapper } from "@/components/ui/wrappers/spinner-wrapper";
import { AuthStatesContext } from "@/context/auth";
import { FeeDetails } from "@/interface/fees-intrface";
import { client } from "@/lib/client";
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
  const notify = useNotify();
  const { user, token } = AuthStatesContext();
  const { data, isLoading, isError, refetch } = useAllFees(
    user ?? user,
    token ?? token
  );
  const [cursor, setCursor] = useState(0);
  const [mount, setMount] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<FeeDetails | null>(null);
  const [openQRDialog, setOpenQRDialog] = useState(false);
  const [selectOption, setSelectOption] = useState<string>("");
  const [feeItems, setFeeItems] = useState<FeeDetails[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [search, setSearch] = useState("");
  const reset = () => {
    setSelectOption("");
    setFeeItems(data || []);
  };
  const onSearchRoleBasedData = (e: any) => {
    const value = e.target.value;

    const temp = data?.filter(
      (d) =>
        d.id.toString()?.includes(value) ||
        d.month?.toLowerCase().includes(value?.toLowerCase()) ||
        d?.createdByEmail?.includes(value) ||
        d?.createdForEmail?.includes(value)
    );
    if (temp) {
      setFeeItems(temp);
    }

    if (!value) {
      setFeeItems(data || []);
    }
    setSearch(value);
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
  const findingTotalPending = (items: FeeDetails[]) => {
    const sum = items?.reduce((acc, val) => acc + Number(val.total_pending), 0);
    return sum;
  };
  const deleteFee = async (id: number) => {
    if (!id) {
      notify({
        title: "Id not found",
        type: "warning",
      });
    }
    try {
      setLoading(true);
      const res = await client.delete(`/parent/fee/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      refetch();
      notify({
        title: "Fee deleted successfully",
        type: "success",
      });
    } catch (e) {
      console.log(e);
      notify({
        title: "Invalid error",
        type: "error",
      });
    } finally {
      setLoading(false);
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
            <SearchInput value={search} setValue={onSearchRoleBasedData} />
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

        {data && (
          <div className="mt-10 flex items-center gap-5 flex-wrap">
            {[
              {
                title: "Total Pending",
                value: findingTotalPending(data),
              },
              {
                title: "No of Fee's",
                value: data?.length,
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
              {tableHeadings.map((heading) => (
                <th key={heading} className="w-[200px] text-start p-3">
                  {heading}
                </th>
              ))}
            </thead>
            <tbody>
              {feeItems?.slice(cursor, cursor + 8)?.map((val) => {
                return (
                  <>
                    <tr>
                      <td className="w-[30px] text-start p-3">{val.id}</td>
                      <td className="w-[30px] text-start p-3">
                        {val.createdForEmail || "-"}
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
                          onClick={(selectedOpt: "edit" | "ban" | "qr") => {
                            if (selectedOpt === "qr") {
                              setSelectedData(val);
                              setOpenQRDialog(true);
                            } else if (selectedOpt === "ban") {
                              deleteFee(val.id);
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
