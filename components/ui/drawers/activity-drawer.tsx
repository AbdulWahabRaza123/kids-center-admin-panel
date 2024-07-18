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

  const handleDownload = async () => {
    if (qrRef.current) {
      const dataUrl = await toPng(qrRef.current);
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "qr-code.png";
      link.click();
    }
  };
  const traverseDetails = (data: UserActivityDetails) => {
    const myDetails = [];
    for (const key in data.details) {
      if (data.details.hasOwnProperty(key)) {
        const activity = data.details[key];
        const myObj = {
          activityName: key,
          activityId: activity.activityId,
          time: activity.time,
          attributes: activity.attributes,
        };
        myDetails.push(myObj);
      }
    }

    return myDetails;
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
              {traverseDetails(data)?.map((item) => {
                return (
                  <>
                    <div
                      key={item.activityName}
                      className="rounded-[8px] w-[300px] bg-gray-400/40 border-[1px] border-gray-400 flex flex-col gap-2 px-3 py-2"
                    >
                      <div className="flex flex-row items-center justify-between">
                        <p>{item.activityName}</p>
                        <p>{item.time}</p>
                      </div>
                      <div className="flex flex-row items-center flex-wrap gap-2">
                        {item.attributes.map((attribute) => {
                          return (
                            <div
                              key={attribute.name}
                              className="flex flex-row items-center gap-1 px-2 py-1 bg-white text-black text-[12px] border-[1px] border-gray-400 rounded-full"
                            >
                              <p>{attribute.name}:</p>
                              <p>{attribute.value}</p>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
            <div className="mt-2 flex flex-col">
              <h1 className="text-[24px] font-[700] mt-5">QR Code</h1>
              <div ref={qrRef}>
                <QRCodeCanvas
                  value={data.id.toString()}
                  size={200}
                  level={"H"}
                  includeMargin={true}
                />
              </div>
              <PrimaryBtn className="w-[220px]" onClick={handleDownload}>
                Download
              </PrimaryBtn>
            </div>
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};
