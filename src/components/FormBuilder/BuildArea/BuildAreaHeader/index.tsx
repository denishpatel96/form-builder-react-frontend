import React from "react";
import { Button, Box } from "@mui/material";
import { FieldProps, IFormDesignProps } from "../../Types";
import FormPreviewModal from "./FormPreview/FormPreviewModal";
import { SaveOutlined } from "@mui/icons-material";

interface IBuildAreaHeaderProps {
  formFields: FieldProps[];
  formProperties: IFormDesignProps;
}

const BuildAreaHeader = ({ formFields, formProperties }: IBuildAreaHeaderProps) => {
  return (
    <Box
      sx={{
        px: 3,
        minHeight: 50,
        backgroundColor: "grey.200",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
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
      <FormPreviewModal formFields={formFields} formProperties={formProperties} />
    </Box>
  );
};

export default BuildAreaHeader;
