import { useState } from "react";
import Drawer from "../components/Drawer";
import RightBar from "../components/RightBar";
import TitleContextProvider from "../contexts/TitleContextProvider";
import FeedLayout from "./FeedLayout";
import { Outlet, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const BaseLayout = () => {
  const location = useLocation();
  const [isDrawerCollapsed, setIsDrawerCollapsed] = useState(false);

  return (
    <TitleContextProvider>
      <ToastContainer />
      <div className="flex bg-[#F5F5F5]">
        <Drawer
          isCollapsed={isDrawerCollapsed}
          onCollapsedChange={setIsDrawerCollapsed}
        />
        <div
          className={`transition-[margin] duration-300 ease-in-out w-full ${isDrawerCollapsed ? "lg:ml-20" : "lg:ml-64"} ml-0`}
        >
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
