// import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";

const Notices = () => {
  return (
    <div className="mx-11 my ">
      <div className="flex justify-between ml-4 mt-7">
        <p>
          Pages <span> / Notices</span>
        </p>

        <div className="lg:flex items-center relative hidden ">
          <SearchIcon className="absolute left-3 " />
          <input
            className="border-2 border-gray-300 bg-white h-10 pl-10 pr-16 rounded-lg text-sm focus:outline-none "
            type="search"
            name="search"
            placeholder="Search any keywords"
          />
        </div>
      </div>
      <div className="flex justify-between my-4 items-center ">
        <h1 className="mt-9 mb-4">Notices</h1>
        <div className="flex justify-end">
          <button className="bg-[#CAE9FF] py-2 px-4 rounded-lg text-[#0D99FF] hover:bg-[#0D99FF] hover:text-white hover:animate-fadeIn active:bg-[#CAE9FF] active:text-[#0D99FF]">
            Add Notice
          </button>
        </div>
      </div>
      <div className="columns-1 sm:columns-2 gap-10"></div>
    </div>
  );
};

export default Notices;
