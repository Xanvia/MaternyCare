import SearchIcon from "@mui/icons-material/Search";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { TitleContext } from "../contexts/TitleContextProvider";
import logo from "../assets/images/logo.png";
import { ReportProblem } from "../assets/icons/Icons";

const FeedLayout = () => {
  const titleContext = useContext(TitleContext);
  return (
    <div>
      <div className="flex justify-between ml-10 my-4 ">
        <p className="hidden lg:block text-lg">
          Pages /{" "}
          <span className="text-text_color_2"> {titleContext?.pageTitle}</span>
        </p>

        <button className="flex items-center bg-red-500 text-white px-4 py-2 rounded mr-11">
          <ReportProblem />
          <span className="ml-2">Report Health Issue</span>
        </button>

        {/* <div className="lg:flex items-center relative hidden mr-10">
          <SearchIcon className="absolute left-3 " />
          <input
            className="border-2 border-gray-300 bg-white h-10 pl-10 pr-16 rounded-lg text-sm focus:outline-none "
            type="search"
            name="search"
            placeholder="Search any keywords"
          />
        </div> */}
      </div>
      <div className="lg:hidden flex justify-center items-center mb-4">
        <img src={logo} alt="logo" width={40} height={20} />
        <h1 className="text-center text-3xl text-[#0D99FF] ml-6">
          {titleContext?.pageTitle}
        </h1>
      </div>
      <Outlet />
    </div>
  );
};

export default FeedLayout;
