import React from "react";
import { Box } from "@mui/material";
import { FieldProps, IFormDesignProps } from "../../Types";
import FormPreviewModal from "./FormPreview/FormPreviewModal";
import BatchOpsPanel from "./BatchOpsPanel";

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
        width: "100%",
        borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
        columnGap: 2,
      }}
    >
      <BatchOpsPanel />
      <Box sx={{ ml: "auto" }}>
        <FormPreviewModal formFields={formFields} formProperties={formProperties} />
      </Box>
    </Box>
  );
};

export default BuildAreaHeader;
