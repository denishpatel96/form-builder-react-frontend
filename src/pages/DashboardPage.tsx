import { Box } from "@mui/material";
import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";

export const DashboardPage = () => {
  return (
    <DashboardLayout>
      <Box
        sx={{
          p: 4,
          height: 400,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          color: (theme) => theme.palette.text.disabled,
        }}
      >
        Dashboard Content Goes Here
      </Box>
    </DashboardLayout>
  );
};
