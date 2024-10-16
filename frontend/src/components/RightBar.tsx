import React from "react";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SettingsIcon from "@mui/icons-material/Settings";
import RightBarProfile from "./RightBarProfile";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MUICalendar from "./MUICalendar";
import ToTitle from "./CaseConverter";

import { Link } from "react-router-dom";

const RightBar: React.FC = () => {
  let userItem = localStorage.getItem("user");
  const user = userItem ? JSON.parse(userItem) : null;

  return (
    <div className="px-6  pt-4 hidden lg:flex flex-col bg-white rounded-l-2xl w-[350px] ml-auto ">
      <div className="grid grid-cols-3 gap-4 items-center mx-5">
        <div>
          <Link to="/notification">
            <IconButton aria-label="show new notifications" color="inherit">
              <Badge badgeContent={5} color="error">
                <NotificationsNoneIcon />
              </Badge>
            </IconButton>
          </Link>
        </div>
        <div>
          <IconButton aria-label="show new notifications" color="inherit">
            <SettingsIcon />
          </IconButton>
        </div>
        <div className="">
          {" "}
          <RightBarProfile />{" "}
        </div>
      </div>
      <div className="bg-[#F7FBFF] rounded-2xl text-center py-4 px-8 mt-8">
        <div className="justify-center flex">
          {user.image ? (
            <img
              className="rounded-full border-2 border-white w-24 h-24"
              src="https://randomuser.me/api/portraits/women/94.jpg"
            />
          ) : (
            <div className="relative inline-flex items-center justify-center w-24 h-24 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
              <span className="font-medium text-3xl text-gray-600 dark:text-gray-300">
                {`${ToTitle(user.firstName[0])} ${ToTitle(user.lastName[0])}`}
              </span>
            </div>
          )}
        </div>
        <h1 className="text-[#0D99FF] font-medium text-lg">
          {`${ToTitle(user.firstName)} ${ToTitle(user.lastName)}`}
        </h1>
        <p className="text-xs text-[#666666]">
          30 years old
          <span className="border-l-2 ml-2 px-1">
            <LocationOnIcon style={{ fontSize: 16 }} />
          </span>
          Badulla, Srilanka
        </p>
        <div className="grid grid-cols-3 text-[#333333] mt-8 mb-2">
          <div className="border-r-2 px-4">
            <p className="text-xs">Blood</p>
            <p className="text-lg font-semibold">O+</p>
          </div>
          <div className="border-r-2 px-4">
            <p className="text-xs">Height</p>
            <p className="text-lg font-semibold">186cm</p>
          </div>
          <div className="px-4">
            <p className="text-xs">Weight</p>
            <p className="text-lg font-semibold">90kgs</p>
          </div>
        </div>
      </div>
      <div className="mt-10">
        <MUICalendar />
      </div>
      <hr className="mx-2" />
      <div className="my-8">
        <h1 className="text-[#333333] font-medium text-lg ">Upcoming</h1>
        <div className="flex flex-row mt-8">
          <div className="w-9 h-9 bg-[#EEE6FE] rounded-lg flex items-center justify-center mr-3">
            <NotificationsIcon style={{ padding: 1, color: "#BA97FE" }} />
          </div>
          <div>
            <h1 className="text-xs text-[#666666] mb-1">Health appointment </h1>
            <h1 className="text-xs  text-[#666666] mb-1.5">
              Mr Yasela Dissanayake
            </h1>

            <h1 className="text-xs font-light	 text-[#666666] mb-1">
              09:20AM - 11:30
            </h1>
          </div>
        </div>
        <hr className="mx-3  mb-2 border-[#EEF5FB]" />
        <div className="flex flex-row mt-8">
          <div className="w-9 h-9 bg-[#BCF5E4] rounded-lg flex items-center justify-center mr-3">
            <NotificationsIcon style={{ padding: 1, color: "#4CDFB5" }} />
          </div>
          <div>
            <h1 className="text-xs text-[#666666] mb-1">Health appointment </h1>
            <h1 className="text-xs  text-[#666666] mb-1.5">
              Mr Yasela Dissanayake
            </h1>

            <h1 className="text-xs font-light	 text-[#666666] mb-1">
              09:20AM - 11:30
            </h1>
          </div>
        </div>
      </div>
      <hr className="mx-2 mb-2" />
    </div>
  );
};

export default RightBar;
