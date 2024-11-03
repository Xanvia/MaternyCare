import React, { useState, useEffect, useContext } from "react";
import { ChevronLeft, Menu, LogOut } from "lucide-react";
import { getNavLinks } from "../data/Data"; // Import the navigation data function
import { SvgIconProps } from "@mui/material"; // Import MUI types
import { useMatch } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { TitleContext } from "../contexts/TitleContextProvider";

interface DrawerProps {
  isCollapsed: boolean;
  onCollapsedChange: (collapsed: boolean) => void;
  userRole?: string;
}

// Define a type for our nav item that includes the MUI icon
interface NavItem {
  name: string;
  icon: React.ComponentType<SvgIconProps>;
  path: string;
}

let role = localStorage.getItem("role") || "mother";
role = role.replace(/"/g, "");

const Drawer: React.FC<DrawerProps> = ({ isCollapsed, onCollapsedChange }) => {
  const [isDrawerOpen, setDrawerOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  const titleContext = useContext(TitleContext);

  // Get navigation links based on user role
  const navLinks = getNavLinks({ role: role });

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setDrawerOpen(true);
      } else {
        setDrawerOpen(false);
        onCollapsedChange(false);
      }
    };

    window.addEventListener("resize", checkScreenSize);
    checkScreenSize();

    return () => window.removeEventListener("resize", checkScreenSize);
  }, [onCollapsedChange]);

  const toggleDrawer = () => {
    setDrawerOpen(!isDrawerOpen);
  };

  const toggleCollapse = () => {
    onCollapsedChange(!isCollapsed);
  };

  const handleTitle = (title: string) => {
    titleContext?.updatePageTitle(title);
  };

  return (
    <div>
      {/* Mobile Menu Button */}
      <div className="absolute right-3 top-5 lg:hidden">
        <button
          onClick={toggleDrawer}
          className="p-3 rounded-lg bg-blue-100 text-blue-500 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          <Menu size={20} />
        </button>
      </div>

      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 z-40 h-screen bg-white shadow-lg transition-all duration-300 
          ${isDrawerOpen ? "translate-x-0" : "-translate-x-full"}
          ${isCollapsed ? "w-20" : "w-64"}`}
      >
        {/* Collapse Toggle Button (desktop only) */}
        <button
          onClick={toggleCollapse}
          className="absolute -right-3 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-1 shadow-md border border-gray-200 hidden lg:block hover:bg-gray-50"
        >
          <ChevronLeft
            className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${
              isCollapsed ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Logo Area */}
        <div
          className={`flex flex-col items-center justify-center p-4 ${
            isCollapsed ? "py-4" : "py-8"
          }`}
        >
          <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xl font-bold">MC</span>
          </div>
          {!isCollapsed && (
            <h1 className="mt-3 text-pink-400 text-2xl font-medium">
              Materny Care
            </h1>
          )}
        </div>

        {/* Mobile Close Button */}
        {isMobile && (
          <button
            onClick={toggleDrawer}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:bg-gray-100 rounded-lg lg:hidden"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        {/* Navigation Links */}
        <div className="mt-8 px-4">
          <nav className="space-y-4">
            {navLinks.map((item, index) => {
              const match = useMatch(item.path);
              const Icon = item.icon;
              return (
                <NavLink to={item.path} key={index}>
                  <button
                    className={`flex items-center w-full p-3 mb-3 rounded-xl hover:bg-blue-50 text-gray-600 hover:text-blue-500 ${
                      match && "text-blue_primary bg-[#CAE9FF]"
                    } transition-colors`}
                    onClick={() => handleTitle(item.name)}
                  >
                    <Icon className="w-5 h-5" />{" "}
                    {/* Using MUI icon with className instead of size prop */}
                    {!isCollapsed && <span className="ml-3">{item.name}</span>}
                  </button>
                </NavLink>
              );
            })}
          </nav>

          {/* Logout Button */}
          <button className="flex items-center w-full p-3 mt-8 rounded-xl hover:bg-blue-50 text-blue-500 transition-colors">
            <LogOut size={20} />
            {!isCollapsed && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
