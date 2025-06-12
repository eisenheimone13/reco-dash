import { Drawer, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { Outlet } from "react-router";
import AppDrawer from "./components/app/AppDrawer";

const drawerWidth = 240;

const AppLayout = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <nav>
        <Drawer
          variant={isMobile ? "temporary" : "permanent"}
          open={isMobile ? mobileOpen : true}
          onClose={handleDrawerToggle}
          ModalProps={{ keepMounted: true }}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
            },
          }}
        >
          <AppDrawer />
        </Drawer>
      </nav>

      <main
        style={{
          marginLeft: isMobile ? 0 : drawerWidth,
          padding: "10px 16px 16px",
          backgroundColor: "#2E2E2E",
          height: "100%",
          minHeight: 1024,
        }}
      >
        <Outlet />
      </main>
    </>
  );
};

export default AppLayout;
