import React, { useEffect } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material//styles";

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

  return <div>Drawer</div>;
};

export default Drawer;
