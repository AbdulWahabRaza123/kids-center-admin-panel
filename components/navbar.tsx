import React from "react";
import { SearchInput } from "./ui/inputs/search-input";

const Navbar = () => {
  return (
    <div className="h-[90px] w-full flex flex-row items-center justify-between px-10">
      <div className="w-[350px]">
        <SearchInput />
      </div>
      <div>Hello</div>
    </div>
  );
};

export default Navbar;
