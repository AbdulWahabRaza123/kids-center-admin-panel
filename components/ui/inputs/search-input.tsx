import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import React from "react";

export const SearchInput = ({
  value,
  setValue,
  className,
}: {
  value: string;
  setValue: (event: any) => void;
  className?: string;
}) => {
  return (
    <div className="relative flex items-center w-full">
      <input
        type="search"
        placeholder="Search..."
        className={cn(
          "ps-10 pe-3 py-2 border-[1px] border-gray-400 rounded-[8px] bg-[#F7F7F7] w-full",
          className
        )}
        value={value}
        onChange={setValue}
      />
      <Search className="w-6 h-6 text-gray-400 absolute left-[10px]" />
    </div>
  );
};
