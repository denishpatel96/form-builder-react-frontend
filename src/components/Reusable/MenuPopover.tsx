import React from "react";
import { Popover, PopoverProps } from "@mui/material";

export default function MenuPopover({ children, sx, ...other }: PopoverProps) {
  return (
    <Popover
      onClick={(e) => e.stopPropagation()}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      PaperProps={{
        sx: {
          overflow: "inherit",
          width: "auto",
          ...sx,
        },
      }}
      {...other}
    >
      {children}
    </Popover>
  );
}
