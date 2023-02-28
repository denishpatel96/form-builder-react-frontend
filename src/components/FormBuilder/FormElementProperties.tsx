import { InfoOutlined } from "@mui/icons-material";
import { Typography, Divider, Box } from "@mui/material";
import React from "react";
import { FORM_ELEMENTS } from "../../constants";
import TextProperties from "./FormElements/TextField/TextProperties";
import { ITextProps, IFieldPropertiesChange } from ".";

type IFormElementProps = {
  field: ITextProps;
  onFieldPropsChange: IFieldPropertiesChange;
};

const FormElementProperties = ({ field, onFieldPropsChange }: IFormElementProps) => {
  console.log("field", field);
  if (!field)
    return (
      <>
        <Typography sx={{ height: 50, lineHeight: "50px", pl: 2 }} variant="overline">
          Element Properties
        </Typography>
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
      <Typography sx={{ height: 50, lineHeight: "50px", pl: 2 }} variant="overline">
        {field.fieldType} Properties
      </Typography>
      <Divider />
      {field.fieldType === FORM_ELEMENTS.TEXT && (
        <TextProperties field={field} onFieldPropsChange={onFieldPropsChange} />
      )}
    </>
  );
};

export default FormElementProperties;
