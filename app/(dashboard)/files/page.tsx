"use client";
import { useAllFiles } from "@/actions/queries";
import { Spinner } from "@/components/spinner";
import { PrimaryBtn } from "@/components/ui/buttons/primary-btn";
import { AssignAFileDialog } from "@/components/ui/dialogs/add-file-dialog";
import { QRCodeDialog } from "@/components/ui/dialogs/qr-code-dialog";
import { SpinnerWrapper } from "@/components/ui/wrappers/spinner-wrapper";
import { AuthStatesContext } from "@/context/auth";
import { FileDetails } from "@/interface/file-interface";
import { maskEmail } from "@/logic/user-logic";
import { Ellipsis } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const tableHeadings = ["Id", "Nanny", "Parent", "Name", "link", "More"];

export default function FilePage() {
  const { user, token } = AuthStatesContext();
  const { data, isLoading, isError } = useAllFiles(
    user ?? user,
    token ?? token
  );
  // console.log("data", data);
  const [mount, setMount] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<FileDetails | null>(null);
  const [openQRDialog, setOpenQRDialog] = useState(false);
  const [openAddFileDialog, setOpenAddFileDialog] = useState(false);
  const [fileItems, setFileItems] = useState<FileDetails[]>([]);
  useEffect(() => {
    setFileItems(data || []);
  }, [data]);
  useEffect(() => {
    setMount(true);
  }, []);
  if (!mount || isLoading)
    return (
      <div className="flex items-center justify-center h-[60vh]">
        <Spinner />
      </div>
    );

  return (
    <>
      {selectedData && openQRDialog && (
        <QRCodeDialog
          open={openQRDialog}
          setOpen={setOpenQRDialog}
          id={selectedData?.id}
        />
      )}
      {openAddFileDialog && (
        <AssignAFileDialog
          open={openAddFileDialog}
          setOpen={setOpenAddFileDialog}
        />
      )}

      <main className="flex flex-col px-10">
        <div className="flex flex-row items-start justify-between">
          <h1 className="text-[26px] font-[600]">File Details</h1>
          <PrimaryBtn
            className="w-[200px] text-[16px] h-[40px] flex flex-row items-center justify-center"
            onClick={() => {
              setOpenAddFileDialog(true);
            }}
          >
            Assign File
          </PrimaryBtn>
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
              {fileItems?.map((val: FileDetails) => {
                return (
                  <>
                    <tr>
                      <td className="w-[50px] text-start p-3">
                        {val.id || "-"}
                      </td>
                      <td className="w-[200px] text-start p-3">
                        {maskEmail(val.createdByEmail) || "-"}
                      </td>
                      <td className="w-[200px] text-start p-3">
                        {maskEmail(val.createdForEmail) || "-"}
                      </td>
                      <td className="w-[200px] text-start p-3">
                        {val.name || "-"}
                      </td>
                      <td className="w-[200px] text-start p-3 underline text-blue-600">
                        {val?.file_link ? (
                          <Link href={val.file_link || "#link"} target="_blank">
                            Link
                          </Link>
                        ) : (
                          "-"
                        )}
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
