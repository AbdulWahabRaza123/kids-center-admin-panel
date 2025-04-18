import React from "react";
import { PrimaryInput } from "./primary-input";
import { cn } from "@/lib/utils";

export const TextInput = ({
  value,
  setValue,
  type,
  title,
  placeholder,
  className,
  disabled,
}: {
  value: string;
  setValue: (value: string) => void;
  type: string;
  title: string;
  placeholder: string;
  className?: string;
  disabled?: boolean;
}) => {
  return (
    <div className={cn("flex flex-col items-start gap-2 w-full", className)}>
      <p>{title}</p>
      <PrimaryInput
        value={value}
        setValue={setValue}
        type={type}
        placeholder={placeholder}
        disabled={disabled}
      />
    </div>
  );
};
