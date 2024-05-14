import React from "react";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import SettingsIcon from "@mui/icons-material/Settings";
// import RightBarProfile from "./RightBarProfile";

const RightBar: React.FC = () => {
  return (
    <div className="px-6  pt-4 hidden lg:flex flex-col bg-white rounded-l-2xl w-[350px] ml-auto ">
      <div className="grid grid-cols-3 gap-4 items-center mx-5">
        <div>
          <IconButton aria-label="show new notifications" color="inherit">
            <Badge badgeContent={5} color="error">
              <NotificationsNoneIcon />
            </Badge>
          </IconButton>
        </div>
        <div>
          <IconButton aria-label="show new notifications" color="inherit">
            <SettingsIcon />
          </IconButton>
        </div>
        <div className="">{/* <RightBarProfile /> */}</div>
      </div>
    </div>
  );
};

export default RightBar;
