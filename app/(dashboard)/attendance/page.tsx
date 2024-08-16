"use client";
import { useAllAttendance } from "@/actions/queries";
import { EditDisableMenuComp } from "@/components/menu-bar";
import { OverviewCard } from "@/components/ui/cards/overview-card";
import { QRCodeDialog } from "@/components/ui/dialogs/qr-code-dialog";
import { SelectInput } from "@/components/ui/inputs/select-input";
import { useNotify } from "@/components/ui/toast/notify";
import { SpinnerWrapper } from "@/components/ui/wrappers/spinner-wrapper";
import { AuthStatesContext } from "@/context/auth";
import { AttendanceDetails } from "@/interface/attendance-interface";
import { client } from "@/lib/client";
import { cn } from "@/lib/utils";
import { iSOFormattedDate, removeSeconds } from "@/logic/date-logic";
import {
  ChevronLeft,
  ChevronRight,
  Ellipsis,
  EllipsisVertical,
} from "lucide-react";
import { useEffect, useState } from "react";

const tableHeadings = [
  "Id",
  "Nanny Name",
  "Student Name",
  "Date",
  "Checkin",
  "Checkout",
  "Note",
  "More",
];
const attendanceFilterOptions = [
  {
    title: "Date",
    value: "date",
  },
  {
    title: "Time",
    value: "time",
  },
];
export default function AttendancePage() {
  const notify = useNotify();
  const { user, token } = AuthStatesContext();
  const { data, isLoading, isError, refetch } = useAllAttendance(
    user ?? user,
    token ?? token
  );
  const [mount, setMount] = useState<boolean>(false);
  const [cursor, setCursor] = useState(0);
  const [selectedData, setSelectedData] = useState<AttendanceDetails | null>(
    null
  );
  const [openQRDialog, setOpenQRDialog] = useState(false);
  const [selectOption, setSelectOption] = useState<string>("");
  const [attendanceItems, setAttendanceItems] = useState<AttendanceDetails[]>(
    []
  );
  const reset = () => {
    setSelectOption("");
    setAttendanceItems(data || []);
  };
  const onChangeFilter = (filter: string) => {
    setSelectOption(filter);
    if (filter === "date") {
      const sortedData = data?.sort((a, b) => {
        return (
          new Date(a.enteredDate).getTime() - new Date(b.enteredDate).getTime()
        );
      });
      setAttendanceItems(sortedData || []);
    } else if (filter === "time") {
      const sortedData = data?.sort((a, b) => {
        return new Date(a.checkIn).getTime() - new Date(b.checkIn).getTime();
      });
      setAttendanceItems(sortedData || []);
    }
  };
  const deleteAttendanxe = async (id: number) => {
    if (!id) {
      notify({
        title: "Id not found",
        type: "warning",
      });
    }
    try {
      const res = await client.delete(`/nany/attendance/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      refetch();
      notify({
        title: "Attendance deleted successfully",
        type: "success",
      });
    } catch (e) {
      console.log(e);
      notify({
        title: "Invalid error",
        type: "error",
      });
    }
  };
  useEffect(() => {
    setAttendanceItems(data || []);
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
          id={selectedData.attendanceId}
        />
      )}

      <main className="flex flex-col px-10">
        <div className="flex flex-row items-start justify-between">
          <h1 className="text-[26px] font-[600]">Attendance</h1>
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
              options={attendanceFilterOptions}
              value={selectOption}
              setValue={onChangeFilter}
            />
          </div>
        </div>
        {data && (
          <div className="mt-10 flex items-center gap-5 flex-wrap">
            {[
              {
                title: "Total Attendances",
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
                    " text-start p-3",
                    index === 0 ? "w-[100px]" : "w-[200px]"
                  )}
                >
                  {heading}
                </th>
              ))}
            </thead>
            <tbody>
              {attendanceItems
                ?.slice(cursor, cursor + 8)
                ?.map((val: AttendanceDetails) => {
                  return (
                    <>
                      <tr>
                        <td className="gap-2 w-[50px] text-start p-3">
                          {val.attendanceId}
                        </td>
                        <td className="w-[100px] text-start p-3">
                          {val.createdByName}
                        </td>
                        <td className="w-[100px] text-start p-3">
                          {val.createdForName}
                        </td>
                        <td className="w-[250px] ps-4 py-3 pe-3 text-start">
                          {iSOFormattedDate(val.enteredDate)}
                        </td>
                        <td className="w-[200px] ps-4 py-3 pe-3 text-start">
                          {removeSeconds(val.checkIn) || "-"}
                        </td>
                        <td className="w-[200px] ps-4 py-3 pe-3 text-start">
                          {removeSeconds(val.checkoutTime) || "-"}
                        </td>
                        <td className="w-[200px] ps-4 py-3 pe-3 text-start">
                          {val.note}
                        </td>
                        <td className="w-[200px] text-start p-3">
                          <EditDisableMenuComp
                            edit={false}
                            onClick={(selectedOpt: "edit" | "ban" | "qr") => {
                              if (selectedOpt === "qr") {
                                setSelectedData(val);
                                setOpenQRDialog(true);
                              } else if (selectedOpt === "ban") {
                                deleteAttendanxe(val.attendanceId);
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
