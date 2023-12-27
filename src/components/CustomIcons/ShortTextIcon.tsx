import { SvgIcon, SvgIconProps } from "@mui/material";
import React from "react";

export const ShortTextIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props} viewBox="0 0 14 6" width="14" height="6">
      <path
        style={{ strokeWidth: 0.167977 }}
        d="M0 0h7v2H0V0zM9 0h5v2H9V0zM0 4h3v2H0V4zM5 4h9c0 1.10457-.8954 2-2 2H5V4z"
      />
    </SvgIcon>
  );
};
