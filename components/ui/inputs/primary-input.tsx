import { cn } from "@/lib/utils";
import React from "react";
interface InputProps {
  value: string;
  setValue: (value: string) => void;
  type: string;
  placeholder: string;
  className?: string;
  disabled?: boolean | undefined;
}
export const PrimaryInput = ({
  value,
  setValue,
  type,
  placeholder,
  className,
  disabled,
}: InputProps) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      disabled={disabled || undefined}
      className={cn(
        "p-3 rounded-[8px] border-[#F0F0F0] border-[1px] bg-[ #FFFFFFCC] w-full",
        className
      )}
      value={value}
      onChange={(e: any) => {
        setValue(e.target.value);
      }}
    />
  );
};
