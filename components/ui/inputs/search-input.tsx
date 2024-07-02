import { Search } from "lucide-react";
import React from "react";

export const SearchInput = () => {
  return (
    <div className="relative flex items-center w-full">
      <input
        type="search"
        placeholder="Search..."
        className="ps-10 py-2 border-[1px] border-gray-400 rounded-[8px] bg-[#F7F7F7] w-full"
      />
      <Search className="w-6 h-6 text-gray-400 absolute left-[10px]" />
    </div>
  );
};
