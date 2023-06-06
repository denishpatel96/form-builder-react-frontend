import { ArrowForwardOutlined } from "@mui/icons-material";
import { Box, Button, Typography, useTheme } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import Waves from "../components/Reusable/Waves";
import { ROUTE_SIGNUP } from "../constants";
import HomeLayout from "../layouts/HomeLayout";

export const HomePage = () => {
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <HomeLayout>
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
        <Typography
          pt={5}
          variant="h3"
          textAlign={"center"}
          sx={{ color: (theme) => theme.palette.text.disabled }}
        >
          Take the power of creating beautiful
          <Box component={"span"} sx={{ color: (theme) => theme.palette.secondary.main }}>
            {" forms "}
          </Box>
          in your hand.
        </Typography>
        <Typography variant="h3" textAlign={"center"} color="secondary">
          Best part is, you don't have to write single line of code.
        </Typography>
        <Typography variant="h3" textAlign={"center"} color="secondary">
          It's easy. It's fun.
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
      <Box sx={{ height: 150, position: "relative" }}>
        <Waves />
      </Box>
      <Box sx={{ height: 500, backgroundColor: (theme) => theme.palette.primary.main }}></Box>
    </HomeLayout>
  );
};
