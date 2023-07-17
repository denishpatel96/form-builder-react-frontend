import { Toolbar, AppBar } from "@mui/material";
import React from "react";

const Appbar = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppBar
      sx={{
        boxShadow: "none",
        color: (theme) => theme.palette.text.primary,
        backdropFilter: "blur(6px)",
        WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
        backgroundColor: (theme) => theme.palette.background.paper,
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar>{children}</Toolbar>
    </AppBar>
  );
};

export default Appbar;
