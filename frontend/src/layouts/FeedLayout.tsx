import SearchIcon from "@mui/icons-material/Search";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { TitleContext } from "../contexts/TitleContextProvider";

const FeedLayout = () => {
  const titleContext = useContext(TitleContext);
  console.log("from feed layout" + titleContext?.pageTitle);
  return (
    <div>
      <div className="flex justify-between ml-4 mt-7">
        <p className="hidden lg:block">
          Pages <span> / {titleContext?.pageTitle}</span>
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
      <h1 className="mt-9 mb-4 hidden lg:block">{`${titleContext?.pageTitle} Overview`}</h1>
      <h1 className="text-center text-3xl text-[#0D99FF] lg:hidden">
        Dashboard
      </h1>
      <Outlet />
    </div>
  );
};

export default FeedLayout;
