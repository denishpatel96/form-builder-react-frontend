import { Box } from "@mui/material";
import React from "react";
// import OrganizationMenu from "./OrganizationMenu";
import UserMenu from "../Reusable/UserMenu";

const AppbarContent = () => {
  return (
    <>
      {/* <OrganizationMenu /> */}
      <Box sx={{ flexGrow: 1 }} />
      <UserMenu />
    </>
  );
};

export default AppbarContent;
