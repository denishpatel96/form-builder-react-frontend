import { ChevronRightOutlined, InfoOutlined } from "@mui/icons-material";
import { Typography, Divider, Box, IconButton, Drawer } from "@mui/material";
import React from "react";
import {
  DRAWER_WIDTH_DESKTOP,
  DRAWER_WIDTH_TABLET,
  FORM_ELEMENTS,
  FORM_ELEMENTS_LIST,
} from "../../../constants";
import {
  CheckboxProperties,
  CheckboxGroupProperties,
  RadioProperties,
  DropdownProperties,
  ComboboxProperties,
  SliderProperties,
  ShortTextProperties,
  LongTextProperties,
} from "./FieldProperties";
import {
  FieldProps,
  IShortTextProps,
  IRadioProps,
  ICheckboxProps,
  IDropdownProps,
  IComboboxProps,
  ISliderProps,
  ICheckboxGroupProps,
  ILongTextProps,
} from "../Types";

type IFormFieldProps = {
  field: FieldProps | undefined | null;
  onTogglePin: () => void;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const FormFieldPropertiesSidebar = ({ field, isOpen, setIsOpen }: IFormFieldProps) => {
  const element = FORM_ELEMENTS_LIST.find((el) => el.id === field?.fieldType);
  return (
    <Drawer
      open={isOpen}
      onClose={() => setIsOpen(false)}
      anchor={"right"}
      PaperProps={{
        sx: {
          width: { xs: DRAWER_WIDTH_TABLET, md: DRAWER_WIDTH_DESKTOP },
          overflow: "hidden",
        },
      }}
      sx={{
        ".MuiBackdrop-root": {
          backgroundColor: "transparent",
        },
      }}
    >
      <Box
        sx={{
          maxHeight: 50,
          minHeight: 50,
          display: "flex",
          alignItems: "center",
        }}
      >
        <IconButton onClick={() => setIsOpen(false)} sx={{ ml: "auto" }}>
          <ChevronRightOutlined />
        </IconButton>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {element?.icon({ height: 25, width: 25 })}
          <Typography pl={1} variant="subtitle1" textAlign={"center"}>
            {element ? `${element.label} Properties` : "Field Properties"}
          </Typography>
        </Box>
      </Box>
      <Divider />
      {!field && (
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
      )}
      {field && field.fieldType === FORM_ELEMENTS.SHORT_TEXT && (
        <ShortTextProperties field={field as IShortTextProps} />
      )}
      {field && field.fieldType === FORM_ELEMENTS.LONG_TEXT && (
        <LongTextProperties field={field as ILongTextProps} />
      )}
      {field && field.fieldType === FORM_ELEMENTS.RADIO && (
        <RadioProperties field={field as IRadioProps} />
      )}
      {field && field.fieldType === FORM_ELEMENTS.CHECKBOX && (
        <CheckboxProperties field={field as ICheckboxProps} />
      )}
      {field && field.fieldType === FORM_ELEMENTS.CHECKBOX_GROUP && (
        <CheckboxGroupProperties field={field as ICheckboxGroupProps} />
      )}
      {field && field.fieldType === FORM_ELEMENTS.DROPDOWN && (
        <DropdownProperties field={field as IDropdownProps} />
      )}
      {field && field.fieldType === FORM_ELEMENTS.COMBOBOX && (
        <ComboboxProperties field={field as IComboboxProps} />
      )}
      {field && field.fieldType === FORM_ELEMENTS.SLIDER && (
        <SliderProperties field={field as ISliderProps} />
      )}
    </Drawer>
  );
};

export default FormFieldPropertiesSidebar;
