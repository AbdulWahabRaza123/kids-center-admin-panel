"use client";
import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { PrimaryBtn } from "../buttons/primary-btn";
import { SpinnerBtn } from "@/components/spinner-btn";
import { AuthStatesContext } from "@/context/auth";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Ban, Trash2, X } from "lucide-react";
import { client } from "@/lib/client";
import { RoleDetails } from "@/interface/user-interface";
import { useAllNanies, useAllParents } from "@/actions/queries";
import { useNotify } from "../toast/notify";
export const DeleteConfirmationDialog = ({
  open,
  setOpen,
  id,
  onSelect,
  loading,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  id: number;
  loading: boolean;
  onSelect: (id: number) => void;
}) => {
  return (
    <Dialog open={open}>
      <DialogContent className="bg-white border-[1px] border-[#00f4ff] rounded-[20px] max-w-[700px] max-h-[60vh] overflow-auto flex flex-col items-center justify-center gap-3 p-5">
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X onClick={() => setOpen(false)} className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
        <Trash2 className="w-[50px] h-[50px] text-[#FF0000]" />
        <h1 className="text-[20px] font-[700] text-center text-primary">
          Delete
        </h1>
        <p>Are you sure you want to delete?</p>

        <div className="flex flex-row items-center justify-center w-full gap-4">
          <PrimaryBtn
            onClick={() => {
              onSelect(id);
            }}
            className="w-[100px] h-[45px] text-[16px] rounded-[9px] flex flex-row items-center justify-center"
          >
            <div className="flex flex-row items-center justify-center gap-2">
              {loading && <SpinnerBtn />}
              <div>Delete</div>
            </div>
          </PrimaryBtn>
        </div>
      </DialogContent>
    </Dialog>
  );
};
