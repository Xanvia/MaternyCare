import Drawer from "../components/Drawer";
import RightBar from "../components/RightBar";
import TitleContextProvider from "../contexts/TitleContextProvider";
import FeedLayout from "./FeedLayout";
import { Outlet, useLocation } from "react-router-dom";

const BaseLayout: React.FC = () => {
  const location = useLocation();
  return (
    <TitleContextProvider>
      <div className="flex bg-[#F5F5F5]">
        <Drawer />
        <div className="lg:ml-[300px] ml-0 w-full ">
          {location.pathname.includes("singlepost") ? (
            <Outlet />
          ) : (
            <FeedLayout />
          )}
        </div>
        <RightBar />
      </div>
    </TitleContextProvider>
  );
};

export default BaseLayout;
