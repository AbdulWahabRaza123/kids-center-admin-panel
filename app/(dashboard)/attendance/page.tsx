"use client";
import { useAllAttendance } from "@/actions/queries";
import { QRCodeDialog } from "@/components/ui/dialogs/qr-code-dialog";
import { SpinnerWrapper } from "@/components/ui/wrappers/spinner-wrapper";
import { AuthStatesContext } from "@/context/auth";
import { AttendanceDetails } from "@/interface/attendance-interface";
import { Ellipsis } from "lucide-react";
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
              {data?.map((val: AttendanceDetails) => {
                return (
                  <>
                    <tr>
                      <td className="flex flex-row items-center gap-2 w-[200px] text-start p-3">
                        {val.attendanceId}
                      </td>
                      <td className="w-[200px] text-start p-3">
                        {val.createdByName}
                      </td>
                      <td className="w-[200px] text-start p-3">
                        {val.createdForName}
                      </td>
                      <td className="w-[200px] ps-5 py-3 pe-3 text-start">
                        {val.enteredDate}
                      </td>
                      <td className="w-[200px] ps-7 py-3 pe-3 text-center">
                        {val.checkIn}
                      </td>
                      <td className="w-[200px] ps-7 py-3 pe-3 text-center">
                        {val.note}
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
