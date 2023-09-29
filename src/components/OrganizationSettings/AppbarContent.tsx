import { Box } from "@mui/material";
import React from "react";
import UserMenu from "../Reusable/UserMenu";
import OrganizationMenu from "../Reusable/OrganizationMenu";

const AppbarContent = () => {
  return (
    <>
      <OrganizationMenu />
      <Box sx={{ flexGrow: 1 }} />
      <UserMenu />
    </>
  );
};

export default AppbarContent;
