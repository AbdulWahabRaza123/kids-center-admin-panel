"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export const SelectInput = ({
  options,
  value,
  setValue,
}: {
  options: {
    title: string;
    value: string;
  }[];
  value: string;
  setValue: (val: string) => void;
}) => {
  return (
    <>
      <Select onValueChange={(value) => setValue(value)} value={value}>
        <SelectTrigger className="w-[350px] rounded-[10px]">
          <SelectValue placeholder="Select a value" />
        </SelectTrigger>
        <SelectContent>
          {options.map((val) => {
            return (
              <SelectItem key={val.title} value={val.value}>
                {val.title}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </>
  );
};
