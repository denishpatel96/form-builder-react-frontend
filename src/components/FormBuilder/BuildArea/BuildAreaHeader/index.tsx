import React from "react";
import { Button, Box } from "@mui/material";
import { FieldProps } from "../../Types";
import FormPreviewModal from "./FormPreview/FormPreviewModal";
import { SaveOutlined } from "@mui/icons-material";

interface IBuildAreaHeaderProps {
  formFields: FieldProps[];
}

const BuildAreaHeader = ({ formFields }: IBuildAreaHeaderProps) => {
  return (
    <Box
      sx={{
        px: 3,
        minHeight: 50,
        backgroundColor: "grey.200",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 0,
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
      }}
    >
      <Button
        size="small"
        sx={{ mr: 1 }}
        color="secondary"
        startIcon={<SaveOutlined />}
        variant="contained"
      >
        Save
      </Button>
      <FormPreviewModal formFields={formFields} />
    </Box>
  );
};

export default BuildAreaHeader;
