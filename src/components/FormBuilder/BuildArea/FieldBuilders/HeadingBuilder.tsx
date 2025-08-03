import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import { IHeadingProps } from "../../Types";

export const HeadingBuilder = ({ field }: { field: IHeadingProps }) => {
  const { id, label, size, subheader } = field;
  return (
    <Box component={"div"} id={id}>
      <Typography variant={size === "default" ? "h2" : size === "large" ? "h1" : "h3"}>
        {label}
      </Typography>
      {subheader ? (
        <Typography pt={1}>{subheader}</Typography>
      ) : (
        <Typography sx={{ pt: 1, opacity: 0.5 }}>Subheader here</Typography>
      )}
      <Divider sx={{ pt: 2 }} />
    </Box>
  );
};
