import React from "react";
import { PrimaryInput } from "./primary-input";

export const TextInput = ({
  value,
  setValue,
  type,
  title,
  placeholder,
}: {
  value: string;
  setValue: (value: string) => void;
  type: string;
  title: string;
  placeholder: string;
}) => {
  return (
    <div className="flex flex-col items-start gap-2 w-full">
      <p>{title}</p>
      <PrimaryInput
        value={value}
        setValue={setValue}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
};
