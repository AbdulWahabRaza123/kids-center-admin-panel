"use client";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import Image from "next/image";
import { TextInput } from "../inputs/text-input";
import { PrimaryBtn } from "../buttons/primary-btn";
import { SelectInput } from "../inputs/select-input";
import { client } from "@/lib/client";
import { AuthStatesContext } from "@/context/auth";
import {
  useAllFiles,
  useAllFinancers,
  useAllNanies,
  useAllParents,
  useAllTeachers,
} from "@/actions/queries";
import { SpinnerBtn } from "@/components/spinner-btn";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import {
  NanyDetails,
  ParentDetails,
  UserDetails,
} from "@/interface/user-interface";
import uploadProfilePicture from "@/firebase/storage/uploadFile";
import { Select, SelectTrigger, SelectValue } from "@radix-ui/react-select";
import { cn } from "@/lib/utils";
import { SelectContent, SelectItem } from "../select";
import { loadBindings } from "next/dist/build/swc";
const options = [
  {
    title: "Parent",
    value: "parent",
  },
  {
    title: "Nanny",
    value: "nany",
  },
  {
    title: "Finance",
    value: "finance",
  },
  {
    title: "Teacher",
    value: "teacher",
  },
];
export const AssignAFileDialog = ({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
}) => {
  const { user, token } = AuthStatesContext();
  const {
    data: parentsData,
    isLoading: parentsLoading,
    error: parentsError,
  } = useAllParents(user ?? user, token ?? token);
  const { refetch } = useAllFiles(user ?? user, token ?? token);
  const [fileName, setFileName] = useState("");
  const [fileLink, setFileLink] = useState<string>("");
  const [selectedId, setSelectedId] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSubmit = async () => {
    if (!fileName || !fileLink) {
      alert("Please fill all the fields");
      return;
    }
    try {
      setLoading(true);
      const res = await client.post(
        "/parent/file/add",
        {
          name: fileName,
          fileLink: fileLink,
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
      console.log(res);
    } catch (e) {
      console.log(e);
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
          <h1 className="text-[20px]">Assign a file to Parent</h1>
        </div>
        <div className="flex flex-row items-end gap-3 mt-3">
          <TextInput
            type="text"
            placeholder="IELTS Book"
            title="File Name"
            value={fileName}
            setValue={setFileName}
            className="w-full"
          />
          <div className="flex flex-col gap-2">
            <p>Select a parent</p>
            <Select
              onValueChange={(value) => {
                setSelectedId(value);
              }}
              value={selectedId}
            >
              <SelectTrigger
                className={cn(
                  "w-[350px] rounded-[10px] h-[47px] py-2 px-3 border-[1px] border-gray-400 flex justify-start items-center"
                )}
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
        </div>
        <div className="flex items-center gap-2">
          <input
            type="file"
            className="px-3 py-2 border-[1px] border-gray-400/40 bg-white text-black rounded-[9px]"
            onChange={async (e: any) => {
              try {
                const file = e.target.files[0];
                const link = await uploadProfilePicture(file);
                setFileLink(link);
              } catch (e) {
                console.log(e);
                alert("invalid error");
              }
            }}
          />
        </div>

        <div className="flex flex-row items-center justify-end w-full gap-4">
          <PrimaryBtn
            loading={loading}
            onClick={() => {
              handleSubmit();
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
