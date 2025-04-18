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
  useAllFinancers,
  useAllNanies,
  useAllParents,
} from "@/actions/queries";
import { SpinnerBtn } from "@/components/spinner-btn";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import {
  NanyDetails,
  ParentDetails,
  UserDetails,
} from "@/interface/user-interface";
import { useToast } from "../use-toast";
import { useNotify } from "../toast/notify";
const options = [
  {
    title: "Student",
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
  const notify = useNotify();
  const { user, token, selectedOption, setSelectedOption } =
    AuthStatesContext();
  const { refetch: refetchNanies } = useAllNanies(user ?? user, token ?? token);
  const { refetch: refetchParents } = useAllParents(
    user ?? user,
    token ?? token
  );
  const { refetch: financeRefetch } = useAllFinancers(
    user ?? user,
    token ?? token
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [role, setRole] = useState("parent");
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
    // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // // Validate email format
    // if (!emailRegex.test(email)) {
    //   console.log("Invalid email format");
    //   notify({
    //     title: "Invalid email format",
    //     type: "warning",
    //   });
    //   return; // Exit the function if email is invalid
    // }

    // Validate password length
    if (password.length < 6) {
      console.log("Password must be at least 6 characters");
      notify({
        title: "Password must be at least 6 characters",
        type: "warning",
      });
      return; // Exit the function if password is too short
    }
    if (selectedOption === "parent") {
      if (!studentName && !studentClass && !studentPhoneNo && !studentRollNo) {
        notify({
          title: "Please enter any student field",
          type: "warning",
        });
        return;
      }
    } else if (selectedOption === "nany") {
      if (!nanyName && !nanyPhoneNo && !nanyRegNo && !nanyQualification) {
        notify({
          title: "Please enter any nany field",
          type: "warning",
        });
        return;
      }
    }
    try {
      setLoading(true);
      const res = await client.post("/auth", {
        email,
        password,
        role: selectedOption,
      });
      const id = res.data.id;
      if (id > 0) {
        if (selectedOption === "parent") {
          await handleLinkParent(id);
        } else if (selectedOption === "nany") {
          await handleLinkNany(id);
        } else if (selectedOption === "finance") {
          financeRefetch();
        }
        setOpen(false);
      }
    } catch (e: any) {
      console.log(e);
      if (e?.response?.status === 500) {
        notify({
          title: "Email or username already exists!",
          type: "error",
        });
      } else if (e?.response?.status === 404) {
        notify({
          title: "User has been disabled",
          type: "error",
        });
      } else {
        notify({
          title: "Invalid error!",
          type: "error",
        });
      }
    } finally {
      setLoading(false);
    }
  };
  const handleEditUser = async () => {
    try {
      setLoading(true);
      if (selectedOption === "parent") {
        if (
          !studentName &&
          !studentClass &&
          !studentPhoneNo &&
          !studentRollNo
        ) {
          notify({
            title: "Please enter any student field",
            type: "warning",
          });
          return;
        }
      } else if (selectedOption === "nany") {
        if (!nanyName && !nanyPhoneNo && !nanyRegNo && !nanyQualification) {
          notify({
            title: "Please enter any nany field",
            type: "warning",
          });
          return;
        }
      }
      if (selectedOption === "parent") {
        const parentData: ParentDetails = data as ParentDetails;
        await handleLinkParent(parentData.user_id);
      } else if (selectedOption === "nany") {
        const nanyData: NanyDetails = data as NanyDetails;
        await handleLinkNany(nanyData.user_id);
      }
      setOpen(false);
    } catch (e: any) {
      console.log(e?.response);
      if (e?.response?.status === 500) {
        notify({
          title: "Email or username already exists!",
          type: "error",
        });
      } else {
        notify({
          title: "Invalid error!",
          type: "error",
        });
      }
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
        setSelectedOption(data.role);
        setStudentName(parentData.student_name);
        setStudentClass(parentData.class);
        setStudentRollNo(parentData.roll_no);
        setStudentPhoneNo(parentData.phone_no);
      } else if (data.role === "nany") {
        const nanyData: NanyDetails = data as NanyDetails;
        setEmail(nanyData.email);
        setPassword("*****");
        setSelectedOption(data.role);
        setNanyName(nanyData.nany_name);
        setNanyPhoneNo(nanyData.phone_no);
        setNanyRegNo(nanyData.reg_no);
        setNanyQualification(nanyData.qualification);
      } else if (data.role === "finance") {
        const financeData: UserDetails = data as UserDetails;
        setEmail(financeData.email);
        setPassword("*****");
        setSelectedOption(data.role);
      }
    }
  }, [edit, data]);
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
            {edit ? "Edit Profile" : "Create New Profile"}
          </h1>
        </div>
        <div className="flex flex-row items-center gap-3 mt-3">
          <div className="w-[50%]">
            <TextInput
              type="email"
              placeholder="devid@gmail.com or david"
              title="Email/Username"
              value={email}
              setValue={(value) => {
                const sanitizedValue = value.toLowerCase().replace(/\s+/g, "");
                setEmail(sanitizedValue);
              }}
              disabled={edit}
            />
            <p className="text-gray-400 text-[9px] ms-1">
              No white space or capital letter allowed
            </p>
          </div>
          <div className="flex flex-col items-start gap-2">
            <h1 className=" text-black">Role</h1>
            <SelectInput
              options={options}
              value={selectedOption}
              setValue={setSelectedOption}
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
        {selectedOption == "parent" && (
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
        {selectedOption == "nany" && (
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
            onClick={() => {
              if (edit) {
                handleEditUser();
              } else {
                handleRegisterUser();
              }
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
