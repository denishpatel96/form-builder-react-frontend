import { styled, alpha } from "@mui/material/styles";
import {
  AppBar,
  Box,
  Button,
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
import { CloseOutlined, LoginOutlined, MenuOutlined } from "@mui/icons-material";
import { APP_BAR_HEIGHT, DRAWER_WIDTH_TABLET, FOOTER_HEIGHT, ROUTE_LOGIN } from "../constants";
import Logo from "../components/Reusable/Logo";

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

type HomeLayoutProps = {
  children: ReactNode;
};

const HomeLayout = ({ children }: HomeLayoutProps) => {
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
              <ListItemText>Login</ListItemText>
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

export default HomeLayout;
