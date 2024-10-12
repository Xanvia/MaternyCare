import React, { useEffect, useContext } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material//styles";
import { LogoutIcon, MenuIcon } from "../assets/icons/Icons";
import { getNavLinks } from "../data/Data";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { useMatch } from "react-router-dom";
import { TitleContext } from "../contexts/TitleContextProvider";

const Drawer: React.FC = () => {
  const LARGE_SCREEN_WIDTH = 1024;
  const theme = useTheme();
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("lg"));
  const [isDrawerOpen, setDrawerOpen] = React.useState(isLargeScreen);
  let role = localStorage.getItem("role") || "mother";

  const titleContext = useContext(TitleContext);

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

  const handleTitle = (title: string) => {
    titleContext?.updatePageTitle(title);
    console.log("from drawer " + title);
  };

  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  useEffect(() => {
    window.addEventListener("resize", checkScreenSize);
    checkScreenSize(); // Initial check

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  role = role.replace(/"/g, "");
  const navLinks = getNavLinks({ role });

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
      <div
        id="drawer-navigation"
        className={`fixed top-0 left-0 z-40 h-screen p-8 overflow-y-auto transition-transform w-[300px] ${
          isDrawerOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white w-64 dark:bg-gray-800`}
        tabIndex={-1}
        aria-labelledby="drawer-navigation-label"
      >
        <div className="flex flex-col items-center justify-center">
          <img src={logo} className="h-36"></img>
          <h1 className="text-[#F580AB] text-2xl font-medium	">Materny Care</h1>
        </div>
        <button
          type="button"
          onClick={toggleDrawer}
          aria-controls="drawer-navigation"
          className="text-gray-400 bg-transparent lg:hidden hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 absolute top-2.5 end-2.5 inline-flex items-center justify-center dark:hover:bg-gray-600 dark:hover:text-white"
        >
          <svg
            className="w-3 h-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
            />
          </svg>
          <span className="sr-only">Close menu</span>
        </button>
        <div className="mt-10 flex flex-col space-y-8 text-[#666666] ">
          {navLinks.map((item, index) => {
            const match = useMatch(item.path);

            return (
              <NavLink to={item.path} key={index}>
                <button
                  className={`flex items-center space-x-2 py-3 px-3 rounded-xl w-full ${
                    match ? "text-[#0D99FF] bg-[#CAE9FF]" : ""
                  }`}
                  onClick={() => handleTitle(item.name)}
                >
                  <item.icon />
                  <span className="pl-1 ">{item.name}</span>
                </button>
              </NavLink>
            );
          })}

          <button
            className={`flex items-center space-x-2 py-3 px-3 rounded-xl w-full}`}
            onClick={logout}
          >
            <LogoutIcon className="text-blue_primary" />
            <span className="pl-1 text-blue_primary">Logout</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
