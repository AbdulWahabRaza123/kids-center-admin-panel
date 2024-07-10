"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export const SelectInput = ({
  options,
  value,
  setValue,
  className,
}: {
  options: {
    title: string;
    value: string;
  }[];
  value: string;
  setValue: (val: string) => void;
  className?: string;
}) => {
  return (
    <>
      <Select onValueChange={(value) => setValue(value)} value={value}>
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
