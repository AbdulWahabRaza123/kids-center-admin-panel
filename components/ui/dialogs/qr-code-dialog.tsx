"use client";
import React, { useRef } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { toPng } from "html-to-image";
import { PrimaryBtn } from "../buttons/primary-btn";
export const QRCodeDialog = ({
  open,
  setOpen,
  id,
}: {
  open: boolean;
  setOpen: (val: boolean) => void;
  id: number;
}) => {
  const qrRef = useRef(null);

  const handleDownload = async () => {
    if (qrRef.current) {
      const dataUrl = await toPng(qrRef.current);
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "qr-code.png";
      link.click();
    }
  };
  return (
    <Dialog open={open}>
      <DialogContent className="bg-white border-[1px] border-[#00f4ff] rounded-[20px] overflow-auto flex flex-col items-center justify-center gap-7 p-10">
        <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X onClick={() => setOpen(false)} className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </DialogPrimitive.Close>
        <div ref={qrRef}>
          <QRCodeCanvas
            value={id.toString()}
            size={200}
            level={"H"}
            includeMargin={true}
          />
        </div>
        <PrimaryBtn onClick={handleDownload}>Download</PrimaryBtn>
      </DialogContent>
    </Dialog>
  );
};
