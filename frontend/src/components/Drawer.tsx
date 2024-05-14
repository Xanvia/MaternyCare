import React, { useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material//styles";
import { MenuIcon } from "../assets/icons/Icons";

const Drawer: React.FC = () => {
  const LARGE_SCREEN_WIDTH = 1024;

  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [isDrawerOpen, setDrawerOpen] = React.useState(isLargeScreen);

  const checkScreenSize = () => {
    if (window.innerWidth >= LARGE_SCREEN_WIDTH) {
      setDrawerOpen(true);
    } else {
      setDrawerOpen(false);
    }
  };

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  useEffect(() => {
    window.addEventListener("resize", checkScreenSize);
    checkScreenSize(); // Initial check

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  return (
    <div>
      {" "}
      <div className="text-center absolute right-3 top-5 lg:hidden ">
        <button
          className="text-[#0D99FF] bg-[#B3DFFF] focus:ring-2 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-3 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          type="button"
          onClick={toggleDrawer}
        >
          <MenuIcon className="" />
        </button>
      </div>
    </div>
  );
};

export default Drawer;
