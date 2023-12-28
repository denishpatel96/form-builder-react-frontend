import React from "react";
import { Box, Divider, Typography } from "@mui/material";
import { IHeadingProps } from "../../Types";

export const HeadingField = ({ field }: { field: IHeadingProps }): JSX.Element => {
  if (!field || field.hidden) {
    return <></>;
  }
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
      <Divider sx={{ pt: 2 }} />
    </Box>
  );
};
