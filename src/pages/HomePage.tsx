import { ArrowForwardOutlined } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Waves from "../components/Reusable/Waves";
import { ROUTE_SIGNUP } from "../constants";
import HomeHOC from "../hoc/HomeHOC";

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <HomeHOC>
      <Box
        sx={{
          p: 4,
          height: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          color: (theme) => theme.palette.text.disabled,
        }}
      >
        <Typography
          pt={5}
          textAlign="center"
          variant="h1"
          sx={{ color: (theme) => theme.palette.text.disabled }}
        >
          Create forms that Convert.
        </Typography>
        <Typography textAlign="center" variant="h3">
          Free Online Drag and Drop Form Builder
        </Typography>
        <Button
          sx={{ mt: 4, width: 200 }}
          endIcon={<ArrowForwardOutlined />}
          variant="contained"
          color="secondary"
          onClick={() => navigate(ROUTE_SIGNUP)}
        >
          Get Started
        </Button>
      </Box>
      <Box sx={{ height: 100, position: "relative" }}>
        <Waves />
      </Box>
      <Box sx={{ height: 500, backgroundColor: (theme) => theme.palette.primary.main }}></Box>
    </HomeHOC>
  );
};
