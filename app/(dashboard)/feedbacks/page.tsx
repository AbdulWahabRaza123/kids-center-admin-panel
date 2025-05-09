"use client";
import { useAllComments, useAllFeedback } from "@/actions/queries";
import { EditDisableMenuComp } from "@/components/menu-bar";
import { OverviewCard } from "@/components/ui/cards/overview-card";
import { QRCodeDialog } from "@/components/ui/dialogs/qr-code-dialog";
import { SearchInput } from "@/components/ui/inputs/search-input";
import { SelectInput } from "@/components/ui/inputs/select-input";
import { useNotify } from "@/components/ui/toast/notify";
import { SpinnerWrapper } from "@/components/ui/wrappers/spinner-wrapper";
import { AuthStatesContext } from "@/context/auth";
import { feedbackDetails } from "@/interface/feedback-interface";
import { client } from "@/lib/client";
import { cn } from "@/lib/utils";
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
  "Email/Username",
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
  const [cursor, setCursor] = useState(0);
  const [mount, setMount] = useState<boolean>(false);
  const [selectOption, setSelectOption] = useState<string>("");
  const [selectedData, setSelectedData] = useState<feedbackDetails | null>(
    null
  );
  const [feedbackItems, setFeedbackItems] = useState<feedbackDetails[]>([]);
  const [openQRDialog, setOpenQRDialog] = useState(false);
  const [search, setSearch] = useState("");
  const reset = () => {
    setSelectOption("");
    setFeedbackItems(data || []);
  };
  const onSearchRoleBasedData = (e: any) => {
    const value = e.target.value;

    const temp = data?.filter(
      (d) =>
        d.feedbackId?.toString().includes(value) ||
        d.userId?.toString()?.includes(value)
    );
    if (temp) {
      setFeedbackItems(temp);
    }

    if (!value) {
      setFeedbackItems(data || []);
    }
    setSearch(value);
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
          id={selectedData.feedbackId}
        />
      )}

      <main className="flex flex-col px-10">
        <div className="flex flex-row items-start justify-between">
          <h1 className="text-[26px] font-[600]">Feedback Details</h1>
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
              {feedbackItems?.slice(cursor, cursor + 8)?.map((val) => {
                return (
                  <>
                    <tr>
                      <td className="w-[50px] text-start p-3">
                        {val.feedbackId}
                      </td>
                      <td className="w-[50px] text-start p-3">
                        {val.userEmail || "-"}
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
                              deleteFeedback(val.feedbackId);
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
