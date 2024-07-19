"use client";
import React, { useRef, useEffect } from "react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { UserActivityDetails } from "@/interface/activities-interface";
import { QRCodeCanvas } from "qrcode.react";
import { toPng } from "html-to-image";
import { PrimaryBtn } from "../buttons/primary-btn";

export const ActivityDrawer = ({
  children,
  data,
}: {
  children: React.ReactNode;
  data: UserActivityDetails;
}) => {
  const qrRef = useRef(null);
  console.log("This is data from daily activity ", data);
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
    <>
      <Drawer>
        <DrawerTrigger>
          <div>{children}</div>
        </DrawerTrigger>
        <DrawerContent className="bg-white absolute top-0">
          <DrawerHeader>
            <DrawerTitle>Activity Details</DrawerTitle>
          </DrawerHeader>
          <div className="p-3">
            <div className="flex flex-row items-center gap-3 flex-wrap">
              {data.activities.map((item) => (
                <div
                  key={item.type}
                  className="mb-4 p-4 bg-gray-50 border border-gray-300 rounded-[7px] shadow-md"
                >
                  <h3 className="text-lg font-bold">{item.type}</h3>
                  <p>Time: {item.time}</p>
                  <div className="mt-2">
                    {item.attributes.map((attribute) => (
                      <div
                        key={attribute.name}
                        className="flex flex-row items-center gap-1 px-2 py-1 bg-white text-black text-[12px] border-[1px] border-gray-400 rounded-full"
                      >
                        <p className="font-semibold">{attribute.name}:</p>
                        <p>{attribute.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            {/* <div className="mt-2 flex flex-col">
              <h1 className="text-[20px] font-[700] mt-5">QR Code</h1>
              <div ref={qrRef}>
                <QRCodeCanvas
                  value={data.id.toString()}
                  size={200}
                  level={"H"}
                  includeMargin={true}
                />
              </div>
              <PrimaryBtn
                className="w-[200px] py-2 text-[18px]"
                onClick={handleDownload}
              >
                Download
              </PrimaryBtn>
            </div> */}
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};
