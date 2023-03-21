import React from "react";
import { Typography } from "@mui/material";

const PropTitle = ({ text }: { text: string }) => {
  return (
    <Typography variant="subtitle2" style={{ opacity: 0.7 }}>
      {text}
    </Typography>
  );
};

export default PropTitle;
