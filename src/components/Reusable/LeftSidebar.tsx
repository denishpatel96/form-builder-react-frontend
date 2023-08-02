import { Box, Drawer, IconButton } from "@mui/material";
import React from "react";
import { MenuOpenOutlined } from "@mui/icons-material";
import MHidden from "../Reusable/MHidden";
import { STANDARD_HEIGHT, DRAWER_WIDTH_TABLET } from "../../constants";
import Logo from "../Reusable/Logo";

export interface LeftSidebarProps {
  open: boolean;
  onChange: (open: boolean) => void;
  children: React.ReactNode;
}

const LeftSidebar = ({ open, onChange, children }: LeftSidebarProps) => {
  return (
    <>
      <MHidden width="lgDown">
        <Drawer
          variant={"permanent"}
          anchor={"left"}
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH_TABLET,
              overflow: "hidden",
              position: "relative",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              backgroundColor: (theme) => theme.palette.background.paper,
            }}
          >
            {children}
          </Box>
        </Drawer>
      </MHidden>
      <MHidden width="lgUp">
        <Drawer
          open={open}
          onClose={() => onChange(false)}
          anchor={"left"}
          PaperProps={{
            sx: {
              width: DRAWER_WIDTH_TABLET,
              overflow: "hidden",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              height: "100%",
              backgroundColor: (theme) => theme.palette.background.paper,
            }}
          >
            <Box
              sx={{
                height: STANDARD_HEIGHT,
                borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                px: 2,
              }}
            >
              <Logo />
              <IconButton onClick={() => onChange(false)}>
                <MenuOpenOutlined />
              </IconButton>
            </Box>
            {children}
          </Box>
        </Drawer>
      </MHidden>
    </>
  );
};

export default LeftSidebar;
