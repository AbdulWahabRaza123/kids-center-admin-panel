"use client";
import { useAllActivities } from "@/actions/queries";
import { EditDisableMenuComp } from "@/components/menu-bar";
import { OverviewCard } from "@/components/ui/cards/overview-card";
import { DeleteConfirmationDialog } from "@/components/ui/dialogs/delete-confirmation";
import { QRCodeDialog } from "@/components/ui/dialogs/qr-code-dialog";
import { ActivityDrawer } from "@/components/ui/drawers/activity-drawer";
import { SelectInput } from "@/components/ui/inputs/select-input";
import { useNotify } from "@/components/ui/toast/notify";
import { SpinnerWrapper } from "@/components/ui/wrappers/spinner-wrapper";
import { AuthStatesContext } from "@/context/auth";
import { UserActivityDetails } from "@/interface/activities-interface";
import { client } from "@/lib/client";
import { maskEmail } from "@/logic/user-logic";
import {
  ChevronLeft,
  ChevronRight,
  Ellipsis,
  EllipsisVertical,
} from "lucide-react";
import { useEffect, useState } from "react";

const tableHeadings = [
  "Id",
  "Nanny Email",
  "Student Email",
  "Checkin",
  "Checkout",
  "Total Activities",
  "Options",
  "More",
];
const activitiesFilterOption = [
  {
    title: "Check In",
    value: "check-in",
  },
  {
    title: "Check Out",
    value: "check-out",
  },
];
export default function ActivityPage() {
  const notify = useNotify();

  const { user, token } = AuthStatesContext();
  const { data, isLoading, isError, refetch } = useAllActivities(
    user ?? user,
    token ?? token
  );

  const [mount, setMount] = useState<boolean>(false);
  const [cursor, setCursor] = useState(0);
  const [loading, setLoading] = useState(false);
  const [openConfirm, setOpenConfirm] = useState(false);
  const [openQRDialog, setOpenQRDialog] = useState(false);
  const [selectedData, setSelectedData] = useState<UserActivityDetails | null>(
    null
  );
  const [selectOption, setSelectOption] = useState<string>("");
  const [activitiesItems, setActivitiesItems] = useState<UserActivityDetails[]>(
    []
  );
  const reset = () => {
    setSelectOption("");
    setActivitiesItems(data || []);
  };
  const onChangeFilter = (filter: string) => {
    setSelectOption(filter);
    //setting the filters for daily activities as well in the ascending order
    let filteredData = data?.sort(
      (a: UserActivityDetails, b: UserActivityDetails) => {
        if (filter === "check-in") {
          return a.checkinTime.localeCompare(b.checkinTime);
        } else if (filter === "check-out") {
          return a.checkoutTime.localeCompare(b.checkoutTime);
        }
        return 0; // Return a default value when the filter option is neither "check-in" nor "check-out"
      }
    );
    setActivitiesItems(filteredData || []);
  };
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
    if (data) {
      setActivitiesItems(data);
    }
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
          <div>
            <h1 className="text-[26px] font-[600]">Daily Activities</h1>
          </div>
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
              options={activitiesFilterOption}
              value={selectOption}
              setValue={onChangeFilter}
            />
          </div>
        </div>
        {data && (
          <div className="mt-10 flex items-center gap-5 flex-wrap">
            {[
              {
                title: "All Activities",
                value: data.length | 0,
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
              {activitiesItems?.slice(cursor, cursor + 8)?.map((val) => {
                return (
                  <>
                    <tr>
                      <td className="w-[50px] text-start p-3">{val.id}</td>
                      <td className="w-[200px] text-start p-3">
                        {val.createdBy?.email || "-"}
                      </td>
                      <td className="w-[50px] text-start p-3">
                        {val.createdFor?.email || "-"}
                      </td>
                      <td className="w-[200px] ps-5 py-3 pe-3 text-start">
                        {val.checkinTime}
                      </td>
                      <td className="w-[200px] ps-7 py-3 pe-3 text-start">
                        {val.checkoutTime}
                      </td>
                      <td className="w-[200px] py-3 text-center">
                        {val.activities.length}
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
