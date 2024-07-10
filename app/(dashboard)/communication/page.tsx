"use client";
import { PrimaryInput } from "@/components/ui/inputs/primary-input";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
const chatData = [
  {
    id: 0,
    profile: "/assets/profile.svg",
    name: "John Doe",
    role: "Student",
    email: "student@gmail.com",
    time: "2:30 PM",
    chat: [
      {
        type: "sent",
        message: "Hello, how can I help you?",
      },
      {
        type: "received",
        message: "I have a query regarding my fees",
      },
      {
        type: "sent",
        message: "Sure, please provide me your student ID",
      },
    ],
  },
  {
    id: 1,
    profile: "/assets/profile.svg",
    name: "John Doe",
    time: "2:30 PM",
    role: "Student",
    email: "student@gmail.com",
    chat: [
      {
        type: "sent",
        message: "Hello, how can I help you?",
      },
      {
        type: "received",
        message: "I have a query regarding my fees",
      },
      {
        type: "sent",
        message: "Sure, please provide me your student ID",
      },
    ],
  },
  {
    id: 2,
    profile: "/assets/profile.svg",
    name: "John Doe",
    time: "2:30 PM",
    role: "Student",
    email: "student@gmail.com",
    chat: [
      {
        type: "sent",
        message: "Hello, how can I help you?",
      },
      {
        type: "received",
        message: "I have a query regarding my fees",
      },
      {
        type: "sent",
        message: "Sure, please provide me your student ID",
      },
    ],
  },
  {
    id: 3,
    profile: "/assets/profile.svg",
    name: "John Doe",
    time: "2:30 PM",
    role: "Student",
    email: "student@gmail.com",
    chat: [
      {
        type: "sent",
        message: "Hello, how can I help you?",
      },
      {
        type: "received",
        message: "I have a query regarding my fees",
      },
      {
        type: "sent",
        message: "Sure, please provide me your student ID",
      },
    ],
  },
];
const Communication = () => {
  const [activeChat, setActiveChat] = useState(chatData[0]);
  const [message, setMessage] = useState("");
  return (
    <main className="flex flex-row items-start px-10">
      <section className="w-[28%] border-r-[1px] border-r-gray-400 min-h-[80vh]">
        <h1 className="text-[26px] font-[600]">Communication</h1>
        <div className="flex flex-col mt-7">
          <div className="flex flex-row items-center justify-between border-b-[1px] border-b-gray-400">
            <div className="flex items-center gap-3 font-[700] p-2 rounded-[10px] cursor-pointer hover:bg-slate-400/10 active:bg-slate-400/20">
              <h1>All </h1>
              <ChevronDown className="w-4 h-4 mt-1" />
            </div>
          </div>
          <div>
            {chatData.map((data, index) => (
              <div
                onClick={() => setActiveChat(data)}
                key={index}
                className={cn(
                  "flex flex-row items-center gap-3 p-3 border-b-[1px] border-b-gray-400 cursor-pointer",
                  activeChat.id === data.id && "bg-slate-400/30"
                )}
              >
                <img
                  src={data.profile}
                  alt="profile"
                  className="w-[50px] h-[50px] rounded-full object-cover"
                />
                <div>
                  <h1 className="text-[16px] font-[700]">{data.name}</h1>

                  <p className="text-[12px] text-gray-400 text-ellipsis line-clamp-1 w-[120px]">
                    {data.chat[data.chat.length - 1].message}
                  </p>
                </div>
                <p className="text-[12px] text-gray-400">{data.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="w-[45%] border-r-[1px] border-r-gray-400 min-h-[80vh] relative">
        <div className="flex flex-col gap-3">
          <div className="flex flex-row items-center gap-3 p-3 border-b-[1px] border-b-gray-400">
            <img
              src="/assets/profile.svg"
              alt="profile"
              className="w-[50px] h-[50px] rounded-full object-cover"
            />
            <div>
              <h1 className="text-[16px] font-[700]">John Doe</h1>
              <p className="text-[12px] text-gray-400">2:30 PM</p>
            </div>
          </div>
          <div className="flex flex-col gap-3 p-3">
            {activeChat.chat.map((chat, index) => (
              <div
                key={index}
                className={`flex flex-row gap-3 ${
                  chat.type === "sent" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  style={{ borderRadius: "24px 24px 0px 24px" }}
                  className={`p-5 ${
                    chat.type === "sent"
                      ? "bg-[#F28A8A80] text-black"
                      : "bg-[#81D4FA80] text-black"
                  }`}
                >
                  <p className="text-[14px]">{chat.message}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="absolute bottom-0 w-full p-3 flex items-center gap-3">
          <PrimaryInput
            placeholder="Type a message"
            value={message}
            setValue={setMessage}
            type="text"
          />
          <div className="w-[40px] cursor-pointer h-[40px] rounded-full p-3 bg-primary flex flex-row items-center justify-center">
            <Image
              src="/assets/icons/send.svg"
              alt="send"
              width={40}
              height={40}
              className="object-cover"
            />
          </div>
        </div>
      </section>
      {activeChat && (
        <section className="flex items-center flex-col gap-5 w-[28%]">
          <div className="flex flex-col items-center justify-center gap-5 w-full border-b-[1px] border-b-gray-400 py-5">
            <Image
              loader={({ src }) => src}
              src={activeChat.profile}
              alt="profile"
              width={90}
              height={90}
              className="rounded-full object-cover"
            />
            <h1 className="font-[700] text-[20px]">{activeChat.name}</h1>
          </div>
          <div className="flex flex-col items-start gap-3">
            <div className="flex items-center justify-between w-full text-[16px]">
              <h1 className="font-[600] me-4">Email:</h1>
              <h1 className="text-[#A5A5A5]">{activeChat.email}</h1>
            </div>
            <div className="flex items-center justify-between w-full text-[16px]">
              <h1 className="font-[600] me-5">Role:</h1>
              <h1 className="text-[#A5A5A5]">{activeChat.role}</h1>
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default Communication;
