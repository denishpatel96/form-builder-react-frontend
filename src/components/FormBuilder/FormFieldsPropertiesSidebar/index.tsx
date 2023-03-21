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
  TextProperties,
  CheckboxProperties,
  RadioProperties,
  DropdownProperties,
  ComboboxProperties,
} from "./Properties";
import {
  FieldProps,
  IFieldPropertiesChangeFunc,
  ITextProps,
  IRadioProps,
  ICheckboxProps,
  IDropdownProps,
  IComboboxProps,
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
          >
            <PushPinOutlined sx={{ height: 20, width: 20 }} />
          </ToggleButton>
        </Tooltip>
        <Divider orientation="vertical" />
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center" }}>
          <SettingsOutlined sx={{ height: 20, width: 20, ml: 2 }} />
          <Typography variant="overline" ml={1}>
            {field ? `${type} Properties` : "Field Properties"}
          </Typography>
        </Box>
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
      {field && field.fieldType === FORM_ELEMENTS.TEXT && (
        <TextProperties field={field as ITextProps} onPropsChange={onPropsChange} />
      )}
      {field && field.fieldType === FORM_ELEMENTS.RADIO && (
        <RadioProperties field={field as IRadioProps} onPropsChange={onPropsChange} />
      )}
      {field && field.fieldType === FORM_ELEMENTS.CHECKBOX && (
        <CheckboxProperties field={field as ICheckboxProps} onPropsChange={onPropsChange} />
      )}
      {field && field.fieldType === FORM_ELEMENTS.DROPDOWN && (
        <DropdownProperties field={field as IDropdownProps} onPropsChange={onPropsChange} />
      )}
      {field && field.fieldType === FORM_ELEMENTS.COMBOBOX && (
        <ComboboxProperties field={field as IComboboxProps} onPropsChange={onPropsChange} />
      )}
    </Drawer>
  );
};

export default FormFieldPropertiesSidebar;
