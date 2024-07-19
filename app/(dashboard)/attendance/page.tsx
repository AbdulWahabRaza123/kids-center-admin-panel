"use client";
import { useAllAttendance } from "@/actions/queries";
import { EditDisableMenuComp } from "@/components/menu-bar";
import { QRCodeDialog } from "@/components/ui/dialogs/qr-code-dialog";
import { SelectInput } from "@/components/ui/inputs/select-input";
import { SpinnerWrapper } from "@/components/ui/wrappers/spinner-wrapper";
import { AuthStatesContext } from "@/context/auth";
import { AttendanceDetails } from "@/interface/attendance-interface";
import { cn } from "@/lib/utils";
import { iSOFormattedDate } from "@/logic/date-logic";
import { Ellipsis, EllipsisVertical } from "lucide-react";
import { useEffect, useState } from "react";

const tableHeadings = [
  "Id",
  "Nanny Name",
  "Student Name",
  "Date",
  "Time",
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
  const { user, token } = AuthStatesContext();
  const { data, isLoading, isError } = useAllAttendance(
    user ?? user,
    token ?? token
  );
  const [mount, setMount] = useState<boolean>(false);
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
        <SpinnerWrapper loading={isLoading}>
          <table className="w-full mt-10 max-h-[70vh] overflow-auto">
            <thead className="bg-[#7A1FA01A]">
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
              {attendanceItems?.map((val: AttendanceDetails) => {
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
                        {val.checkIn}
                      </td>
                      <td className="w-[200px] ps-4 py-3 pe-3 text-start">
                        {val.note}
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
