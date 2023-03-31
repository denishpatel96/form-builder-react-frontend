import React from "react";
import { Button, Box } from "@mui/material";
import { FieldProps } from "../../Types";
import FormPreviewModal from "./FormPreviewModal";

interface IBuildAreaHeaderProps {
  formFields: FieldProps[];
}

const BuildAreaHeader = ({ formFields }: IBuildAreaHeaderProps) => {
  return (
    <Box
      sx={{
        height: 60,
        backgroundColor: "grey.300",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Button color="secondary">Save</Button>
      <FormPreviewModal formFields={formFields} />
    </Box>
  );
};

export default BuildAreaHeader;
