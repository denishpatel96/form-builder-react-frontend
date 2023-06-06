import { Breakpoint, Theme, useMediaQuery } from "@mui/material";
import React from "react";
import { ReactNode } from "react";

type MHiddenProps = {
  width:
    | "xsDown"
    | "smDown"
    | "mdDown"
    | "lgDown"
    | "xlDown"
    | "xsUp"
    | "smUp"
    | "mdUp"
    | "lgUp"
    | "xlUp";
  children: ReactNode;
};

const MHidden = ({ width, children }: MHiddenProps) => {
  const breakpoint = width.substring(0, 2) as Breakpoint;

  const hiddenUp = useMediaQuery((theme: Theme) => theme.breakpoints.up(breakpoint));
  const hiddenDown = useMediaQuery((theme: Theme) => theme.breakpoints.down(breakpoint));

  return (
    <React.Fragment>
      {width.includes("Down") && (hiddenDown ? null : children)}
      {width.includes("Up") && (hiddenUp ? null : children)}
    </React.Fragment>
  );
};

export default MHidden;
