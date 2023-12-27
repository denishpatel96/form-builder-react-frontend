import { Box, Divider, Typography } from "@mui/material";
import React from "react";
import { IHeadingProps } from "../../Types";

export interface IHeadingBuilderProps {
  field: IHeadingProps;
}

export const HeadingBuilder = ({ field }: IHeadingBuilderProps) => {
  const { id, label, size, subheader } = field;
  return (
    <Box component={"div"} id={id}>
      <Typography variant={size === "default" ? "h2" : size === "large" ? "h1" : "h3"}>
        {label}
      </Typography>
      {subheader ? (
        <Typography>{subheader}</Typography>
      ) : (
        <Typography>
          <span style={{ color: "disabled" }}>Subheader goes here</span>
        </Typography>
      )}
      <Divider sx={{ pt: 2, mx: -50 }} />
    </Box>
  );
};
