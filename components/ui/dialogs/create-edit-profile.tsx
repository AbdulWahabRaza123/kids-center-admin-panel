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
import { useAllNanies, useAllParents } from "@/actions/queries";
import { SpinnerBtn } from "@/components/spinner-btn";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import {
  NanyDetails,
  ParentDetails,
  UserDetails,
} from "@/interface/user-interface";
const options = [
  {
    title: "Parent",
    value: "parent",
  },
  {
    title: "Nanny",
    value: "nany",
  },
];
export const CreateOrEditProfileDialog = ({
  open,
  setOpen,
  edit = false,
  data,
}: {
  open: boolean;
  setOpen: (value: boolean) => void;
  edit: boolean;
  data?: ParentDetails | NanyDetails | UserDetails;
}) => {
  const { user, token } = AuthStatesContext();
  const { refetch: refetchNanies } = useAllNanies(user ?? user, token ?? token);
  const { refetch: refetchParents } = useAllParents(
    user ?? user,
    token ?? token
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("parent");
  //for student/parent
  const [studentName, setStudentName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [studentRollNo, setStudentRollNo] = useState("");
  const [studentPhoneNo, setStudentPhoneNo] = useState("");
  //for nany
  const [nanyName, setNanyName] = useState("");
  const [nanyPhoneNo, setNanyPhoneNo] = useState("");
  const [nanyRegNo, setNanyRegNo] = useState("");
  const [nanyQualification, setNanyQualification] = useState("");
  const [loading, setLoading] = useState(false);
  const handleLinkParent = async (id: number) => {
    try {
      const data = {
        userId: id,
        studentName: studentName,
        class: studentClass,
        rollNo: studentRollNo,
        phoneNo: studentPhoneNo,
      };
      const resParent = await client.post("/parent/link", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      refetchParents();
    } catch (e) {
      console.log(e);
      throw new Error("Parent Invalid error");
    }
  };
  const handleLinkNany = async (id: number) => {
    try {
      const data = {
        userId: id,
        nanyName: nanyName,
        phoneNo: nanyPhoneNo,
        regNo: nanyRegNo,
        qualification: nanyQualification,
      };
      const resNany = await client.post("/nany/link", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      refetchNanies();
    } catch (e) {
      console.log(e);
      throw new Error("Nany Invalid error");
    }
  };
  const handleRegisterUser = async () => {
    try {
      setLoading(true);
      const res = await client.post("/auth", {
        email,
        password,
        role,
      });
      const id = res.data.id;
      if (id > 0) {
        if (role === "parent") {
          await handleLinkParent(id);
        } else if (role === "nany") {
          await handleLinkNany(id);
        }
        setOpen(false);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (edit && data) {
      if (data.role === "parent") {
        const parentData: ParentDetails = data as ParentDetails;
        setEmail(parentData.email);
        setPassword("*****");
        setStudentName(parentData.student_name);
        setStudentClass(parentData.class);
        setStudentRollNo(parentData.roll_no);
        setStudentPhoneNo(parentData.phone_no);
      } else if (data.role === "nany") {
        const nanyData: NanyDetails = data as NanyDetails;
        setEmail(nanyData.email);
        setPassword("*****");
        setNanyName(nanyData.nany_name);
        setNanyPhoneNo(nanyData.phone_no);
        setNanyRegNo(nanyData.reg_no);
        setNanyQualification(nanyData.qualification);
      }
      // else if (data.role === "finance") {
      //   const financeData: UserDeatis = data as UserDeatis;
      //   setEmail(nanyData.email);
      //   setPassword("*****");
      // }
    }
  }, [edit, data]);
  return (
    <Dialog open={open}>
      <DialogContent className="bg-white border-[1px] border-[#00f4ff] rounded-[20px] max-w-[900px] h-[80vh] overflow-auto flex flex-col gap-7 p-5">
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
            {edit ? "Edit Profile" : "Create New Profile"}
          </h1>
        </div>
        <div className="flex flex-row items-center gap-3 mt-3">
          <TextInput
            type="email"
            placeholder="devid@gmail.com"
            title="Email"
            value={email}
            setValue={setEmail}
            className="w-[50%]"
            disabled={edit}
          />
          <div className="flex flex-col items-start gap-2">
            <h1 className=" text-black">Role</h1>
            <SelectInput
              options={options}
              value={role}
              setValue={setRole}
              disabled={edit}
            />
          </div>
        </div>
        <TextInput
          type="text"
          placeholder="Password"
          title="Password"
          value={password}
          setValue={setPassword}
          className="w-full"
          disabled={edit}
        />
        {role == "parent" && (
          <div>
            <div className="flex flex-row items-center gap-3 mt-3">
              <TextInput
                type="text"
                placeholder="Devid"
                title="Student Name"
                value={studentName}
                setValue={setStudentName}
                className="w-[50%]"
              />
              <TextInput
                type="text"
                placeholder="12th"
                title="Student Class"
                value={studentClass}
                setValue={setStudentClass}
                className="w-[50%]"
              />
            </div>
            <div className="flex flex-row items-center gap-3 mt-3">
              <TextInput
                type="text"
                placeholder="13"
                title="Student Roll No"
                value={studentRollNo}
                setValue={setStudentRollNo}
                className="w-[50%]"
              />
              <TextInput
                type="text"
                placeholder="+82123456789"
                title="Student Phone No"
                value={studentPhoneNo}
                setValue={setStudentPhoneNo}
                className="w-[50%]"
              />
            </div>
          </div>
        )}
        {role == "nany" && (
          <div>
            <div className="flex flex-row items-center gap-3 mt-3">
              <TextInput
                type="text"
                placeholder="Jhon"
                title="Nanny Name"
                value={nanyName}
                setValue={setNanyName}
                className="w-[50%]"
              />
              <TextInput
                type="text"
                placeholder="42537"
                title="Nanny Reg No"
                value={nanyRegNo}
                setValue={setNanyRegNo}
                className="w-[50%]"
              />
            </div>
            <div className="flex flex-row items-center gap-3 mt-3">
              <TextInput
                type="text"
                placeholder="12th"
                title="Nanny Qualification"
                value={nanyQualification}
                setValue={setNanyQualification}
                className="w-[50%]"
              />
              <TextInput
                type="text"
                placeholder="+82123456789"
                title="Nanny Phone No"
                value={nanyPhoneNo}
                setValue={setNanyPhoneNo}
                className="w-[50%]"
              />
            </div>
          </div>
        )}
        <div className="flex flex-row items-center justify-end w-full gap-4">
          <PrimaryBtn
            loading={loading}
            onClick={handleRegisterUser}
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
