import { alpha } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Button,
  Drawer,
  IconButton,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import React from "react";
import MHidden from "../components/Reusable/MHidden";
import {
  ArrowForwardOutlined,
  CloseOutlined,
  LoginOutlined,
  MenuOutlined,
} from "@mui/icons-material";
import {
  APP_BAR_HEIGHT,
  DRAWER_WIDTH_TABLET,
  FOOTER_HEIGHT,
  ROUTE_LOGIN,
  ROUTE_SIGNUP,
} from "../constants";
import Logo from "../components/Reusable/Logo";
import Waves from "../components/Reusable/Waves";

export const HomePage = () => {
  const navigate = useNavigate();
  const anchorRef = React.useRef(null);
  const [menuOpen, setMenuOpen] = React.useState<boolean>(false);

  const collapsedMenu = (
    <>
      <IconButton onClick={() => setMenuOpen((prev) => !prev)} ref={anchorRef}>
        {menuOpen ? <CloseOutlined /> : <MenuOutlined />}
      </IconButton>

      <Drawer
        open={menuOpen}
        onClose={() => setMenuOpen(false)}
        anchor={"left"}
        PaperProps={{
          sx: {
            width: DRAWER_WIDTH_TABLET,
            overflow: "hidden",
          },
        }}
        sx={{
          ".MuiBackdrop-root": {
            backgroundColor: "transparent",
          },
        }}
      >
        <Stack>
          <Box
            sx={{
              height: APP_BAR_HEIGHT,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            }}
          >
            <Logo />
          </Box>
          <MenuList>
            <MenuItem>
              <ListItemIcon>
                <LoginOutlined fontSize="small" />
              </ListItemIcon>
              <ListItemText onClick={() => navigate(ROUTE_LOGIN)}>Login</ListItemText>
              <Typography variant="body2" color="text.secondary"></Typography>
            </MenuItem>
          </MenuList>
        </Stack>
      </Drawer>
      <Box sx={{ flexGrow: 1 }} />
    </>
  );
  return (
    <Box sx={{ minHeight: "100%", overflow: "hidden" }}>
      <AppBar
        sx={{
          boxShadow: "none",
          color: (theme) => theme.palette.text.primary,
          backdropFilter: "blur(6px)",
          WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
          backgroundColor: (theme) => alpha(theme.palette.background.default, 0.72),
        }}
      >
        <Toolbar>
          <MHidden width="lgUp">{collapsedMenu}</MHidden>
          <Logo />
          <Box sx={{ flexGrow: 1 }} />
          <MHidden width="lgDown">
            <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
              <Button
                sx={{ ml: 1 }}
                onClick={() => navigate(ROUTE_LOGIN)}
                variant="contained"
                startIcon={<LoginOutlined />}
              >
                Login
              </Button>
            </Stack>
          </MHidden>
          <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}></Stack>
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{
          width: "100%",
          flexGrow: 1,
          overflow: "auto",
          minHeight: `calc(100vh - ${FOOTER_HEIGHT}px)`,
          paddingTop: `${APP_BAR_HEIGHT}px`,
          display: "flex",
          flexDirection: "column",
          backgroundColor: (theme) => theme.palette.background.paper,
        }}
      >
        <Box
          sx={{
            p: 4,
            height: "70vh",
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
      </Box>
      <Box
        component={"footer"}
        sx={{
          display: "flex",
          height: FOOTER_HEIGHT,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography>©2023 vTwinForms</Typography>
      </Box>
    </Box>
  );
};

export default HomePage;
