"use client";
import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import Image from "next/image";
import { TextInput } from "../inputs/text-input";
import { PrimaryBtn } from "../buttons/primary-btn";
import { SelectInput } from "../inputs/select-input";
import { client } from "@/lib/client";
import { AuthStatesContext } from "@/context/auth";
import { useAllFees, useAllParents } from "@/actions/queries";
import { SpinnerBtn } from "@/components/spinner-btn";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import { cn } from "@/lib/utils";
import { connectStorageEmulator } from "firebase/storage";
import { useNotify } from "../toast/notify";
const options = [
  {
    title: "Pending",
    value: "pending",
  },
  {
    title: "Paid",
    value: "paid",
  },
  {
    title: "Cancelled",
    value: "cancelled",
  },
];
function getCurrentFormattedDate(): string {
  const date = new Date();

  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // getMonth() returns 0-based month
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}
export const CreateOrEditFeeDialog = ({
  open,
  setOpen,
  id,
  edit = false,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  id?: number;
  edit: boolean;
}) => {
  const notify = useNotify();
  const { user, token } = AuthStatesContext();
  const {
    data: parentsData,
    isLoading: parentsLoading,
    error: parentsError,
  } = useAllParents(user ?? user, token ?? token);
  const { refetch } = useAllFees(user ?? user, token ?? token);
  const [selectedId, setSelectedId] = useState("");
  const [month, setMonth] = useState("");
  const [payMode, setPayMode] = useState("");
  const [pendingAmount, setPendingAmount] = useState("");
  const [status, setStatus] = useState("pending");
  const [loading, setLoading] = useState(false);

  const handleAddFee = async () => {
    if (!selectedId || !month || !payMode || !status) {
      notify({
        type: "warning",
        title: "Please fill all the fields",
      });
      return;
    }
    try {
      setLoading(true);
      const paymentDate = getCurrentFormattedDate();
      const res = await client.post(
        "/parent/fee/add",
        {
          month,
          payment_date: paymentDate,
          pay_mode: payMode,
          total_pending: pendingAmount,
          status,
          createdForId: selectedId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      refetch();
      setOpen(false);
      notify({
        type: "success",
        title: "Fee added successfully",
      });
    } catch (e) {
      console.log(e);
      notify({
        type: "error",
        title: "Error adding new field",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <Dialog open={open}>
      <DialogContent className="bg-white border-[1px] border-[#00f4ff] rounded-[20px] max-w-[900px] max-h-[80vh] overflow-auto flex flex-col gap-7 p-5">
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X onClick={() => setOpen(false)} className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
        <div className="flex flex-row items-center gap-3">
          <Image
            src="/assets/icons/profile.svg"
            alt="profile"
            width={20}
            height={20}
            className="object-cover"
          />
          <h1 className="text-[20px]">
            {edit ? "Edit Fee" : "Create New Fee"}
          </h1>
        </div>
        <TextInput
          type="text"
          placeholder="Septempber"
          title="Month"
          value={month}
          setValue={setMonth}
          disabled={edit}
        />
        <div className="flex flex-row items-center gap-3 mt-3">
          <div className="flex flex-col gap-2">
            <p>Select a parent</p>
            <Select
              onValueChange={(value) => {
                setSelectedId(value);
              }}
              value={selectedId}
            >
              <SelectTrigger
                className={cn("w-[410px] rounded-[10px] h-[47px] py-2")}
              >
                <SelectValue placeholder="Select a parent" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {parentsData?.map((val) => {
                  return (
                    <SelectItem
                      key={val.user_id}
                      value={val.user_id.toString()}
                      className="bg-white cursor-pointer"
                    >
                      {val.student_name}
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col items-start gap-2">
            <h1 className=" text-black">Fee Status</h1>
            <SelectInput
              options={options}
              value={status}
              setValue={setStatus}
              disabled={edit}
              className="w-[410px]"
            />
          </div>
        </div>

        <TextInput
          type="text"
          placeholder="Bank"
          title="Pay Mode"
          value={payMode}
          setValue={setPayMode}
          className="w-full"
          disabled={edit}
        />
        <TextInput
          type="text"
          placeholder="100.0"
          title="Pending Amount"
          value={pendingAmount}
          setValue={setPendingAmount}
          className="w-full"
          disabled={edit}
        />

        <div className="flex flex-row items-center justify-end w-full gap-4">
          <PrimaryBtn
            loading={loading}
            onClick={() => {
              handleAddFee();
            }}
            className="w-[100px] h-[45px] text-[16px] rounded-[9px] flex flex-row items-center justify-center"
          >
            <div className="flex items-center gap-2">
              {loading && <SpinnerBtn />}
              <div>Save</div>
            </div>
          </PrimaryBtn>
        </div>
      </DialogContent>
    </Dialog>
  );
};
