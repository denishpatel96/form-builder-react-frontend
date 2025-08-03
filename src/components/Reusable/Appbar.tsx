import { Toolbar, AppBar } from "@mui/material";
import React, { ReactNode } from "react";

const Appbar = ({ children }: { children: ReactNode }) => {
  return (
    <AppBar
      position="relative"
      sx={{
        boxShadow: "none",
        color: (theme) => theme.palette.text.primary,
        backgroundColor: (theme) => theme.palette.background.paper,
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar disableGutters>{children}</Toolbar>
    </AppBar>
  );
};

export default Appbar;
