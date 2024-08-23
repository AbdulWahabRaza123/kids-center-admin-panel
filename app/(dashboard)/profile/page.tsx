"use client";
import { PrimaryBtn } from "@/components/ui/buttons/primary-btn";
import Image from "next/image";
import { useEffect, useState } from "react";
import { TextInput } from "@/components/ui/inputs/text-input";
const cardsData = [
  {
    name: "QR Code",
    value: "T678Gd4e",
    img: "/assets/profile/qr-4-bg.svg",
  },
  {
    name: "Attendance percentage",
    value: "90%",
    img: "/assets/profile/percent-4-bg.svg",
  },
  {
    name: "Fee Details",
    value: "Paid",
    img: "/assets/profile/fee-4-bg.svg",
  },
  {
    name: "Feedback",
    value: "Student review here",
    img: "/assets/profile/feedback-4-bg.svg",
  },
];
export default function Profile() {
  const [mount, setMount] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [phoneNo, setPhoneNo] = useState<string>("");
  const [accountRestrict, setAccountRestrict] = useState<string>("");
  const [accountDelete, setAccountDelete] = useState<string>("");
  const [password, setPassword] = useState("");
  const [recoveryPassword, setRecoveryPassword] = useState("");
  const [roleAssigned, setRoleAssigned] = useState("");
  useEffect(() => {
    setMount(true);
  }, []);
  if (!mount) return null;
  return (
    <main className="flex flex-col px-10">
      <div className="flex flex-row items-start justify-between">
        <h1 className="text-[26px] font-[600]">Profile</h1>
        <PrimaryBtn
          onClick={() => console.log("Action")}
          className="w-[100px] h-[45px] text-[16px] rounded-[9px] flex flex-row items-center justify-center"
        >
          <div>Action</div>
        </PrimaryBtn>
      </div>
      <div className="mt-7 bg-[#7A1FA01A] p-5 mb-10">
        <div className="bg-white rounded-[10px] p-5">
          <div className="flex items-center gap-5">
            <Image
              src="/assets/profile/edit-profile.svg"
              alt="edit profile"
              width={80}
              height={80}
              className="object-cover"
            />
            <p className="text-primary font-[500] text-[24px]">Bella Stephen</p>
          </div>
          <div className="mt-5 flex flex-row items-end flex-wrap gap-7">
            <TextInput
              type="text"
              placeholder="user@gmail.com"
              title="Email/Username"
              value={email}
              setValue={setEmail}
              className="w-[230px]"
            />
            <TextInput
              type="text"
              placeholder="63738292"
              title="Phone No"
              value={phoneNo}
              setValue={setPhoneNo}
              className="w-[230px]"
            />
            <TextInput
              type="text"
              placeholder="user@gmail.com"
              title="Account Restrict"
              value={accountRestrict}
              setValue={setAccountRestrict}
              className="w-[230px]"
            />
            <TextInput
              type="text"
              placeholder="user@gmail.com"
              title="Acount Delete"
              value={accountDelete}
              setValue={setAccountDelete}
              className="w-[230px]"
            />
            <TextInput
              type="password"
              placeholder="******"
              title="Password"
              value={password}
              setValue={setPassword}
              className="w-[230px]"
            />
            <TextInput
              type="password"
              placeholder="*****"
              title="Recovery Password"
              value={recoveryPassword}
              setValue={setRecoveryPassword}
              className="w-[230px]"
            />
            <TextInput
              type="text"
              placeholder="admin"
              title="Role Assigned"
              value={roleAssigned}
              setValue={setRoleAssigned}
              className="w-[230px]"
            />
          </div>
        </div>
        <div className="py-10 flex flex-row items-center justify-center gap-5">
          {cardsData.map((card, index) => (
            <div
              key={index}
              className="flex flex-col items-start gap-2 w-[200px] h-[150px]"
            >
              <p className="font-[500] text-[16px]">{card.name}</p>

              <div className="bg-white p-5 relative rounded-[10px] w-full h-full flex flex-row items-center justify-center">
                <Image
                  src={card.img}
                  alt="qr code"
                  width={40}
                  height={40}
                  className="object-cover absolute top-[0px] left-[0px]"
                />
                <p className="text-[16px] text-[#A0A0A0]">{card.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
