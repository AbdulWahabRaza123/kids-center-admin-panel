"use client";

import { PrimaryBtn } from "@/components/ui/buttons/primary-btn";
import { TextInput } from "@/components/ui/inputs/text-input";
import Image from "next/image";
import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SpinnerBtn } from "@/components/spinner-btn";
const Signin = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSignin = async () => {
    if (!email || !password) {
      alert("Fill all the fields");
      return;
    }
    try {
      setLoading(true);
      const res = await axios.post("/api/auth/signin", {
        email,
        password,
      });
      console.log("This is res ", res);
      const token = res.data.user.token;
      const user = res.data.user.user;
      console.log("This is token ", token);
      console.log("This is user ", user);
      localStorage.setItem("kids-token", token);
      localStorage.setItem("kids-user", JSON.stringify(user));
      router.push("/");
      alert("login sucessful");
    } catch (e) {
      console.log(e);
      alert("Invalid error occured");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex flex-col items-center w-[460px] bg-[#FFFFFF4D] p-3 mt-32">
      <Image
        src="/assets/signin/logo.svg"
        width={420}
        height={166}
        className="object-cover"
        alt="my-signin-logo"
      />
      <h1 className="font-[600] text-[40px] font-heading py-10">Welcome !</h1>
      <div className="flex flex-col items-start w-full">
        <div className="flex flex-col items-end w-full">
          <TextInput
            value={email}
            setValue={setEmail}
            type="email"
            title="Email"
            placeholder="email"
          />
          <div className="flex items-center gap-2 mt-2">
            <input type="radio" className="h-5 w-5" />
            <p>Remember me</p>
          </div>
        </div>
        <TextInput
          value={password}
          setValue={setPassword}
          type="password"
          title="Password"
          placeholder="password"
        />
        <PrimaryBtn
          className="mt-10"
          onClick={() => {
            handleSignin();
          }}
        >
          <div className="flex flex-row items-center justify-center gap-3">
            {loading && <SpinnerBtn />}
            <p>Submit</p>
          </div>
        </PrimaryBtn>
        <div className="flex flex-row items-center justify-between w-full py-5 px-3">
          <p className="text-[14px]">New User? Sign Up</p>
          <p className="text-[14px]">Forget Password?</p>
        </div>
      </div>
    </div>
  );
};

export default Signin;
