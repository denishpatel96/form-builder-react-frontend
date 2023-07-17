import { ArrowBackOutlined } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_WORKSPACES } from "../../constants";
import { useAppSelector } from "../../store/hooks";
import UserMenu from "../Reusable/UserMenu";

const AppbarContent = () => {
  const navigate = useNavigate();
  const userId = useAppSelector((state) => state.auth.userId);
  return (
    <>
      <Button
        startIcon={<ArrowBackOutlined />}
        onClick={() => navigate(ROUTE_WORKSPACES.replace(":userId", userId))}
      >
        Workspaces
      </Button>
      <Box sx={{ flexGrow: 1 }} />
      <UserMenu />
    </>
  );
};

export default AppbarContent;
