import { Close, PaletteOutlined } from "@mui/icons-material";
import { Typography, Box, IconButton, Tooltip, Drawer, Divider } from "@mui/material";
import React from "react";
import { DRAWER_WIDTH_DESKTOP, DRAWER_WIDTH_TABLET } from "../../../constants";
import { IFieldPropertiesChangeFunc } from "../Types";

type FormDesignSidebarProps = {
  onPropsChange: IFieldPropertiesChangeFunc;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const FormDesignSidebar = ({ onPropsChange, isOpen, setIsOpen }: FormDesignSidebarProps) => {
  return (
    <Drawer
      open={isOpen}
      onClose={() => setIsOpen(false)}
      anchor={"right"}
      PaperProps={{
        sx: {
          width: { xs: DRAWER_WIDTH_TABLET, md: DRAWER_WIDTH_DESKTOP },
          overflow: "hidden",
        },
      }}
      sx={{
        ".MuiBackdrop-root": {
          backgroundColor: "transparent",
        },
      }}
    >
      <Box
        sx={{
          maxHeight: 50,
          minHeight: 50,
          width: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PaletteOutlined sx={{ height: 20, width: 20 }} />
          <Typography pl={1} variant="subtitle1" textAlign={"center"}>
            Form Design
          </Typography>
        </Box>
        <Tooltip title={"close"} sx={{ ml: "auto" }}>
          <IconButton size="small" onClick={() => setIsOpen(false)}>
            <Close sx={{ height: 20, width: 20 }} />
          </IconButton>
        </Tooltip>
      </Box>
      <Divider />
    </Drawer>
  );
};

export default FormDesignSidebar;
