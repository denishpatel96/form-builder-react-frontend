import { Close, InfoOutlined } from "@mui/icons-material";
import { Typography, Divider, Box, IconButton, Tooltip } from "@mui/material";
import React from "react";
import { FORM_ELEMENTS } from "../../../constants";
import TextProperties from "../FormElements/TextField/TextProperties";
import { ITextProps, IFieldPropertiesChange, IFieldValidationsChange } from "..";

type IFormElementProps = {
  field: ITextProps;
  onPropsChange: IFieldPropertiesChange;
  onClosePropertiesDrawer: () => void;
  onValidationsChange: IFieldValidationsChange;
};

const FormElementPropertiesSidebar = ({
  field,
  onPropsChange,
  onValidationsChange,
  onClosePropertiesDrawer,
}: IFormElementProps) => {
  if (!field)
    return (
      <>
        <Box
          sx={{
            height: 50,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            pl: 2,
          }}
        >
          <Typography variant="overline">Element Properties</Typography>
          <Tooltip title={"close"}>
            <IconButton onClick={() => onClosePropertiesDrawer()}>
              <Close />
            </IconButton>
          </Tooltip>
        </Box>
        <Divider />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flexGrow: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <InfoOutlined color="secondary" sx={{ height: 30, width: 30 }} />
          <Typography variant="caption" textAlign={"center"}>
            Please select element from left to inspect properties.
          </Typography>
        </Box>
      </>
    );

  return (
    <>
      <Box
        sx={{
          height: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          pl: 2,
        }}
      >
        <Typography variant="overline">{field.fieldType} Properties</Typography>
        <Tooltip title={"close"}>
          <IconButton onClick={() => onClosePropertiesDrawer()}>
            <Close />
          </IconButton>
        </Tooltip>
      </Box>
      <Divider />
      {field.fieldType === FORM_ELEMENTS.TEXT && (
        <TextProperties
          field={field}
          onPropsChange={onPropsChange}
          onValidationsChange={onValidationsChange}
        />
      )}
    </>
  );
};

export default FormElementPropertiesSidebar;
