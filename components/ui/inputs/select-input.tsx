"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { OptionTypes } from "@/interface/user-interface";
import { cn } from "@/lib/utils";

export const SelectInput = ({
  options,
  value,
  setValue,
  className,
  disabled,
}: {
  options: {
    title: string;
    value: string;
  }[];
  value: string;
  setValue: (val: string) => void;
  className?: string;
  disabled?: boolean;
}) => {
  return (
    <>
      <Select
        onValueChange={(value: string) => {
          if (disabled) {
            return;
          }
          setValue(value);
        }}
        value={value}
      >
        <SelectTrigger
          className={cn("w-[350px] rounded-[10px] h-[47px] py-2", className)}
        >
          <SelectValue placeholder="Select a value" />
        </SelectTrigger>
        <SelectContent className="bg-white">
          {options.map((val) => {
            return (
              <SelectItem
                key={val.title}
                value={val.value}
                className="bg-white cursor-pointer"
              >
                {val.title}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </>
  );
};
