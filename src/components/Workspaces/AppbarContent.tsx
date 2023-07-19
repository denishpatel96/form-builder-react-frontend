import { Box } from "@mui/material";
import React from "react";
import OrganizationMenu from "./OrganizationMenu";
import UserMenu from "../Reusable/UserMenu";
import ThemeToggle from "../Reusable/ThemeToggle";

const AppbarContent = () => {
  return (
    <>
      <OrganizationMenu />
      <Box sx={{ flexGrow: 1 }} />
      <ThemeToggle />
      <UserMenu />
    </>
  );
};

export default AppbarContent;
