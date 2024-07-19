"use client";
import { useAllActivities } from "@/actions/queries";
import { EditDisableMenuComp } from "@/components/menu-bar";
import { DeleteConfirmationDialog } from "@/components/ui/dialogs/delete-confirmation";
import { QRCodeDialog } from "@/components/ui/dialogs/qr-code-dialog";
import { ActivityDrawer } from "@/components/ui/drawers/activity-drawer";
import { useNotify } from "@/components/ui/toast/notify";
import { SpinnerWrapper } from "@/components/ui/wrappers/spinner-wrapper";
import { AuthStatesContext } from "@/context/auth";
import { UserActivityDetails } from "@/interface/activities-interface";
import { client } from "@/lib/client";
import { Ellipsis, EllipsisVertical } from "lucide-react";
import { useEffect, useState } from "react";

const tableHeadings = [
  "Id",
  "Nanny Name",
  "Parent Name",
  "Checkin",
  "Checkout",
  "Options",
  "More",
];

export default function ActivityPage() {
  const notify = useNotify();

  const { user, token } = AuthStatesContext();
  const { data, isLoading, isError, refetch } = useAllActivities(
    user ?? user,
    token ?? token
  );
  const [mount, setMount] = useState<boolean>(false);
  const [loading, setLoading] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openQRDialog, setOpenQRDialog] = useState(false);
  const [selectedData, setSelectedData] = useState<UserActivityDetails | null>(
    null
  );
  const handleDelete = async (id: number) => {
    if (!id || !token) {
      notify({
        type: "warning",
        title: "Invalid error",
      });
      return;
    }

    try {
      setLoading(true);
      const res = await client.delete(`/activities/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log("This is my response nany ", res);
      refetch();
      notify({
        type: "success",
        title: "Activity deleted successfully",
      });
      setOpenConfirm(false);
    } catch (e) {
      console.log(e);
      notify({
        type: "error",
        title: "Invalid error",
      });
    } finally {
      setLoading(false);
    }
  };
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
      {selectedData && (
        <DeleteConfirmationDialog
          open={openConfirm}
          setOpen={setOpenConfirm}
          id={selectedData.id}
          onSelect={handleDelete}
          loading={loading}
        />
      )}
      <main className="flex flex-col px-10">
        <div className="flex flex-row items-start justify-between">
          <h1 className="text-[26px] font-[600]">Daily Activities</h1>
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
                      <td className="w-[50px] text-start p-3">{val.id}</td>
                      <td className="w-[200px] text-start p-3">
                        {val.createdBy.nanyDetails?.name}
                      </td>
                      <td className="w-[50px] text-start p-3">
                        {val.createdFor.studentDetails?.name}
                      </td>
                      <td className="w-[200px] ps-5 py-3 pe-3 text-start">
                        {val.checkinTime}
                      </td>
                      <td className="w-[200px] ps-7 py-3 pe-3 text-center">
                        {val.checkoutTime}
                      </td>

                      <td className="w-[200px] text-start p-3">
                        <EditDisableMenuComp
                          edit={false}
                          ban={false}
                          onClick={(selectedOpt: "edit" | "ban" | "qr") => {
                            // if (selectedOpt === "ban") {
                            //   setSelectedData(val);
                            //   setOpenConfirm(true);
                            // } else

                            if (selectedOpt === "qr") {
                              setSelectedData(val);
                              setOpenQRDialog(true);
                            }
                            console.log("This is selected option");
                          }}
                        >
                          <EllipsisVertical className="cursor-pointer" />
                        </EditDisableMenuComp>
                      </td>

                      <td className="w-[200px] ps-4 py-3 text-start">
                        <ActivityDrawer data={val}>
                          <Ellipsis className="cursor-pointer" />
                        </ActivityDrawer>
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
