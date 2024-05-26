import {
  AppointmentsIcon,
  DashboardIcon,
  NoticesIcon,
  ProfileIcon,
  LogoutIcon,
  Help,
} from "../assets/icons/Icons";

export const navLinks = [
  {
    name: "Dashboard",
    icon: DashboardIcon,
    path: "/dashboard",
  },
  {
    name: "Notices",
    icon: NoticesIcon,
    path: "/notices",
  },
  {
    name: "Appointments",
    icon: AppointmentsIcon,
    path: "/appointments",
  },
  {
    name: "Profile",
    icon: ProfileIcon,
    path: "/profile",
  },
  {
    name: "Mother's Guide",
    icon: Help,
    path: "/guide",
  },
  {
    name: "Logout",
    icon: LogoutIcon,
    path: "",
  },
];
