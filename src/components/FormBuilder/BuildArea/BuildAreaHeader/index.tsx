import React from "react";
import { Button, Box } from "@mui/material";
import { FieldProps } from "../../Types";
import FormPreviewModal from "./FormPreviewModal";

interface IBuildAreaHeaderProps {
  formFields: FieldProps[];
}

const BuildAreaHeader = ({ formFields }: IBuildAreaHeaderProps) => {
  return (
    <Box style={{ padding: 10, height: 60 }}>
      <Button color="secondary">Save</Button>
      <FormPreviewModal formFields={formFields} />
    </Box>
  );
};

export default BuildAreaHeader;
