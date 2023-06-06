import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Container,
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
import React, { ReactNode } from "react";
import MHidden from "../components/Reusable/MHidden";
import { CloseOutlined, LogoutOutlined, MenuOutlined } from "@mui/icons-material";
import {
  APP_BAR_HEIGHT,
  DRAWER_WIDTH_TABLET,
  FOOTER_HEIGHT,
  ROUTE_HOME,
  ROUTE_LOGIN,
} from "../constants";
import Logo from "../components/Reusable/Logo";
import { CookieStorage } from "../helpers/cookieStorage";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { useLogoutMutation } from "../store/features/authApi";
import { removeTokens } from "../store/features/authSlice";
import { LoadingButton } from "@mui/lab";

const RootStyle = styled("div")({
  display: "flex",
  minHeight: "100%",
  overflow: "hidden",
});

const MainStyle = styled("main")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: `calc(100vh - ${FOOTER_HEIGHT}px)`,
  paddingTop: APP_BAR_HEIGHT,
  display: "flex",
  flexDirection: "column",
  backgroundColor: theme.palette.background.paper,
}));

const FooterStyle = styled("footer")(({ theme }) => ({
  display: "flex",
  height: FOOTER_HEIGHT,
  justifyContent: "center",
  alignItems: "center",
}));

const AppBarStyle = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  color: theme.palette.text.primary,
  backdropFilter: "blur(6px)",
  WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72),
}));

type DashboardLayoutProps = {
  children: ReactNode;
};

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const anchorRef = React.useRef(null);
  const [menuOpen, setMenuOpen] = React.useState<boolean>(false);
  const [logout, { isLoading: isLogoutLoading }] = useLogoutMutation();
  const { refreshToken, idToken } = useAppSelector((state) => state.auth);

  React.useEffect(() => {
    const AsyncFunc = async () => {
      if (!refreshToken) {
        console.log("Redirecting to login");
        navigate(ROUTE_LOGIN);
      }
    };

    AsyncFunc();
  }, [dispatch, navigate]);

  const handleLogout = async () => {
    if (refreshToken && idToken) await logout({ token: refreshToken, idToken });
    // remove from cookie
    CookieStorage.removeItem("token");
    // remove from state
    dispatch(removeTokens());
    // go to home page
    navigate(ROUTE_HOME);
  };

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
                <LogoutOutlined fontSize="small" />
              </ListItemIcon>
              <ListItemText>Logout</ListItemText>
              <Typography variant="body2" color="text.secondary"></Typography>
            </MenuItem>
          </MenuList>
        </Stack>
      </Drawer>
      <Box sx={{ flexGrow: 1 }} />
    </>
  );
  return (
    <RootStyle>
      <Container disableGutters style={{ maxWidth: 2160 }}>
        <AppBarStyle>
          <Container disableGutters style={{ maxWidth: 2160 }}>
            <Toolbar>
              <MHidden width="lgUp">{collapsedMenu}</MHidden>
              <Logo />
              <Box sx={{ flexGrow: 1 }} />
              <MHidden width="lgDown">
                <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}>
                  <LoadingButton
                    sx={{ ml: 1 }}
                    onClick={handleLogout}
                    variant="outlined"
                    startIcon={<LogoutOutlined />}
                    loading={isLogoutLoading}
                    loadingPosition={"start"}
                  >
                    Logout
                  </LoadingButton>
                </Stack>
              </MHidden>
              <Stack direction="row" alignItems="center" spacing={{ xs: 0.5, sm: 1.5 }}></Stack>
            </Toolbar>
          </Container>
        </AppBarStyle>
        <MainStyle>{children}</MainStyle>
        <FooterStyle>
          <Typography>©2023 vTwinForms</Typography>
        </FooterStyle>
      </Container>
    </RootStyle>
  );
};

export default DashboardLayout;
