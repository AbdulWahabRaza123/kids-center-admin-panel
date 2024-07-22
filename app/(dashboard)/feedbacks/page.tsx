"use client";
import { useAllComments, useAllFeedback } from "@/actions/queries";
import { EditDisableMenuComp } from "@/components/menu-bar";
import { OverviewCard } from "@/components/ui/cards/overview-card";
import { QRCodeDialog } from "@/components/ui/dialogs/qr-code-dialog";
import { SelectInput } from "@/components/ui/inputs/select-input";
import { useNotify } from "@/components/ui/toast/notify";
import { SpinnerWrapper } from "@/components/ui/wrappers/spinner-wrapper";
import { AuthStatesContext } from "@/context/auth";
import { feedbackDetails } from "@/interface/feedback-interface";
import { client } from "@/lib/client";
import { cn } from "@/lib/utils";
import { iSOFormattedDate } from "@/logic/date-logic";
import { Ellipsis, EllipsisVertical } from "lucide-react";
import { useEffect, useState } from "react";

const tableHeadings = [
  "Id",
  "User Id",
  "Rating",
  "Date",
  "Description",
  "More",
];
const feedbackFilterOptions = [
  {
    title: "Rating",
    value: "rating",
  },
  {
    title: "Date",
    value: "date",
  },
];
export default function FeedbackPage() {
  const notify = useNotify();
  const { user, token } = AuthStatesContext();
  const { data, isLoading, isError, refetch } = useAllFeedback(
    user ?? user,
    token ?? token
  );
  const [mount, setMount] = useState<boolean>(false);
  const [selectOption, setSelectOption] = useState<string>("");
  const [selectedData, setSelectedData] = useState<feedbackDetails | null>(
    null
  );
  const [feedbackItems, setFeedbackItems] = useState<feedbackDetails[]>([]);
  const [openQRDialog, setOpenQRDialog] = useState(false);
  const reset = () => {
    setSelectOption("");
    setFeedbackItems(data || []);
  };
  const onChangeFilter = (filter: string) => {
    setSelectOption(filter);
    if (filter === "rating") {
      const sortedData = data?.sort((a, b) => {
        return Number(a.rating) - Number(b.rating);
      });
      setFeedbackItems(sortedData || []);
    } else if (filter === "date") {
      const sortedData = data?.sort((a, b) => {
        return (
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
        );
      });
      setFeedbackItems(sortedData || []);
    }
  };
  const findAverageRating = (items: feedbackDetails[]) => {
    let sum = 0;
    items.forEach((item) => {
      sum += parseFloat(item.rating);
    });
    return (sum / feedbackItems.length).toFixed(2);
  };
  const deleteFeedback = async (id: number) => {
    if (!id) {
      notify({
        title: "Id not found",
        type: "warning",
      });
    }
    try {
      const res = await client.delete(`/feedback/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      refetch();
      notify({
        title: "Feedback deleted successfully",
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
    setFeedbackItems(data || []);
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
          <h1 className="text-[26px] font-[600]">Feedback Details</h1>
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
              options={feedbackFilterOptions}
              value={selectOption}
              setValue={onChangeFilter}
            />
          </div>
        </div>

        {data && (
          <div className="mt-10 flex items-center gap-5 flex-wrap">
            {[
              {
                title: "Total Feedbacks",
                value: data.length,
              },
              {
                title: "Average Rating",
                value: parseFloat(findAverageRating(data)),
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
                    index === 4 ? "w-[400px]" : "w-[150px]",
                    "text-start p-3"
                  )}
                >
                  {heading}
                </th>
              ))}
            </thead>
            <tbody>
              {feedbackItems?.map((val) => {
                return (
                  <>
                    <tr>
                      <td className="w-[50px] text-start p-3">{val.id}</td>
                      <td className="w-[50px] text-start p-3">
                        {val.userId || "-"}
                      </td>
                      <td className="w-[50px] text-start p-3">
                        {val.rating || "-"}
                      </td>
                      <td className="w-[250px] ps-5 py-3 pe-3 text-start">
                        {iSOFormattedDate(val.timestamp) || "-"}
                      </td>
                      <td className="w-[400px] ps-7 py-3 pe-3 text-start">
                        {val.description || "-"}
                      </td>
                      <td className="w-[200px] text-start p-3">
                        <EditDisableMenuComp
                          edit={false}
                          onClick={(selectedOpt: "edit" | "ban" | "qr") => {
                            if (selectedOpt === "qr") {
                              setSelectedData(val);
                              setOpenQRDialog(true);
                            } else if (selectedOpt === "ban") {
                              deleteFeedback(val.id);
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
        {data?.length === 0 && (
          <div className="h-[60vh] flex items-center justify-center text-gray-400">
            No data found
          </div>
        )}
      </main>
    </>
  );
}
