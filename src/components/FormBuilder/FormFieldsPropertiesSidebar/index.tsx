import { Close, InfoOutlined, PushPinOutlined, SettingsOutlined } from "@mui/icons-material";
import { Typography, Divider, Box, IconButton, Tooltip, ToggleButton, Drawer } from "@mui/material";
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
  IFieldPropertiesChangeFunc,
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
  field: FieldProps | undefined;
  onPropsChange: IFieldPropertiesChangeFunc;
  onClosePropertiesDrawer: () => void;
  onTogglePin: () => void;
  isPinned: boolean;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const FormFieldPropertiesSidebar = ({
  field,
  onPropsChange,
  onClosePropertiesDrawer,
  onTogglePin,
  isPinned,
  isOpen,
  setIsOpen,
}: IFormFieldProps) => {
  const type = FORM_ELEMENTS_LIST.find((el) => el.id === field?.fieldType)?.label;
  return (
    <Drawer
      open={isOpen}
      onClose={() => setIsOpen(false)}
      anchor={"right"}
      variant={isPinned ? "permanent" : "temporary"}
      PaperProps={{
        sx: {
          width: { xs: DRAWER_WIDTH_TABLET, md: DRAWER_WIDTH_DESKTOP },
          overflow: "hidden",
          ...(isPinned && { position: "relative" }),
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
        <Tooltip title={isPinned ? "Unpin" : "Pin"}>
          <ToggleButton
            sx={{ height: 25, width: 25, m: 1 }}
            value={true}
            selected={isPinned}
            onChange={onTogglePin}
            color="secondary"
          >
            <PushPinOutlined sx={{ height: 20, width: 20 }} />
          </ToggleButton>
        </Tooltip>
        <Divider orientation="vertical" />
        <Typography width={"100%"} variant="overline" textAlign={"center"}>
          {field ? `${type} Properties` : "Field Properties"}
        </Typography>
        {!isPinned && (
          <Tooltip title={"close"} sx={{ ml: "auto" }}>
            <IconButton size="small" onClick={() => onClosePropertiesDrawer()}>
              <Close sx={{ height: 20, width: 20 }} />
            </IconButton>
          </Tooltip>
        )}
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
        <ShortTextProperties field={field as IShortTextProps} onPropsChange={onPropsChange} />
      )}
      {field && field.fieldType === FORM_ELEMENTS.LONG_TEXT && (
        <LongTextProperties field={field as ILongTextProps} onPropsChange={onPropsChange} />
      )}
      {field && field.fieldType === FORM_ELEMENTS.RADIO && (
        <RadioProperties field={field as IRadioProps} onPropsChange={onPropsChange} />
      )}
      {field && field.fieldType === FORM_ELEMENTS.CHECKBOX && (
        <CheckboxProperties field={field as ICheckboxProps} onPropsChange={onPropsChange} />
      )}
      {field && field.fieldType === FORM_ELEMENTS.CHECKBOX_GROUP && (
        <CheckboxGroupProperties
          field={field as ICheckboxGroupProps}
          onPropsChange={onPropsChange}
        />
      )}
      {field && field.fieldType === FORM_ELEMENTS.DROPDOWN && (
        <DropdownProperties field={field as IDropdownProps} onPropsChange={onPropsChange} />
      )}
      {field && field.fieldType === FORM_ELEMENTS.COMBOBOX && (
        <ComboboxProperties field={field as IComboboxProps} onPropsChange={onPropsChange} />
      )}
      {field && field.fieldType === FORM_ELEMENTS.SLIDER && (
        <SliderProperties field={field as ISliderProps} onPropsChange={onPropsChange} />
      )}
    </Drawer>
  );
};

export default FormFieldPropertiesSidebar;
