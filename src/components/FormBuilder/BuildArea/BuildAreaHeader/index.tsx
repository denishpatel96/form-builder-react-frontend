import React from "react";
import { Button, Box } from "@mui/material";
import { FieldProps } from "../../Types";
import FormPreviewModal from "./FormPreviewModal";
import { SaveOutlined } from "@mui/icons-material";

interface IBuildAreaHeaderProps {
  formFields: FieldProps[];
}

const BuildAreaHeader = ({ formFields }: IBuildAreaHeaderProps) => {
  return (
    <Box
      sx={{
        px: 3,
        height: 50,
        backgroundColor: "grey.50",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Button color="secondary" startIcon={<SaveOutlined />} variant="outlined">
        Save
      </Button>
      <FormPreviewModal formFields={formFields} />
    </Box>
  );
};

export default BuildAreaHeader;
