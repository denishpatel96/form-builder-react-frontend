import { ArrowBackOutlined } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_WORKSPACES } from "../../constants";
import { useAppSelector } from "../../store/hooks";
import ThemeToggle from "../Reusable/ThemeToggle";
import UserMenu from "../Reusable/UserMenu";

const AppbarContent = () => {
  const navigate = useNavigate();
  const username = useAppSelector((state) => state.auth.username);
  return (
    <>
      <Button
        startIcon={<ArrowBackOutlined />}
        onClick={() => navigate(ROUTE_WORKSPACES.replace(":username", username))}
      >
        Workspaces
      </Button>
      <Box sx={{ flexGrow: 1 }} />
      <ThemeToggle />
      <UserMenu />
    </>
  );
};

export default AppbarContent;
