"use client";
import { useAllFiles } from "@/actions/queries";
import { EditDisableMenuComp } from "@/components/menu-bar";
import { Spinner } from "@/components/spinner";
import { PrimaryBtn } from "@/components/ui/buttons/primary-btn";
import { OverviewCard } from "@/components/ui/cards/overview-card";
import { AssignAFileDialog } from "@/components/ui/dialogs/add-file-dialog";
import { QRCodeDialog } from "@/components/ui/dialogs/qr-code-dialog";
import { useNotify } from "@/components/ui/toast/notify";
import { SpinnerWrapper } from "@/components/ui/wrappers/spinner-wrapper";
import { AuthStatesContext } from "@/context/auth";
import { FileDetails } from "@/interface/file-interface";
import { client } from "@/lib/client";
import { maskEmail } from "@/logic/user-logic";
import {
  ChevronLeft,
  ChevronRight,
  Ellipsis,
  EllipsisVertical,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const tableHeadings = ["Id", "Nanny", "Parent", "Name", "link", "More"];

export default function FilePage() {
  const notify = useNotify();
  const { user, token } = AuthStatesContext();
  const { data, isLoading, isError, refetch } = useAllFiles(
    user ?? user,
    token ?? token
  );
  console.log("This is user files ", data);
  const [cursor, setCursor] = useState(0);
  const [mount, setMount] = useState<boolean>(false);
  const [selectedData, setSelectedData] = useState<FileDetails | null>(null);
  const [openQRDialog, setOpenQRDialog] = useState(false);
  const [openAddFileDialog, setOpenAddFileDialog] = useState(false);
  const [fileItems, setFileItems] = useState<FileDetails[]>([]);
  const deleteFile = async (id: number) => {
    if (!id) {
      notify({
        title: "Id not found",
        type: "warning",
      });
    }
    try {
      const res = await client.delete(`/parent/file/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      refetch();
      notify({
        title: "File deleted successfully",
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
        {data && (
          <div className="mt-10 flex items-center gap-5 flex-wrap">
            {[
              {
                title: "Total Files",
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
              {tableHeadings.map((heading) => (
                <th key={heading} className="w-[200px] text-start p-3">
                  {heading}
                </th>
              ))}
            </thead>
            <tbody>
              {fileItems?.slice(cursor, cursor + 8)?.map((val: FileDetails) => {
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

                      <td className="w-[200px] text-start p-3">
                        <EditDisableMenuComp
                          edit={false}
                          onClick={(selectedOpt: "edit" | "ban" | "qr") => {
                            if (selectedOpt === "qr") {
                              setSelectedData(val);
                              setOpenQRDialog(true);
                            } else if (selectedOpt === "ban") {
                              deleteFile(val.id);
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
