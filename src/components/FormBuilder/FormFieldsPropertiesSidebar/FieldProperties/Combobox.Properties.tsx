import React from "react";
import { Add, Clear, Delete, Remove } from "@mui/icons-material";
import {
  TextField,
  Switch,
  FormHelperText,
  List,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
  IconButton,
  Slider,
  Select,
  MenuItem,
  SelectChangeEvent,
  Box,
  Typography,
  Checkbox,
  Button,
  ListItemText,
  Tooltip,
  Chip,
} from "@mui/material";
import { IComboboxProps, IFieldPropertiesChangeFunc } from "../../Types";
import { StyledListItem } from "../Styles";
import PropTitle from "../Properties/PropTitle";
import {
  CompactnessProperty,
  DropdownDefaultValueProperty,
  HelperTextProperty,
  HiddenProperty,
  HoverTextProperty,
  LabelProperty,
  MultipleProperty,
  OptionsProperty,
  RequiredProperty,
  VariantProperty,
  WidthProperty,
} from "../Properties";

export interface IComboboxPropertiesProps {
  field: IComboboxProps;
  onPropsChange: IFieldPropertiesChangeFunc;
}

export const ComboboxProperties = ({ field, onPropsChange }: IComboboxPropertiesProps) => {
  const {
    colSpan,
    hidden,
    label,
    helperText,
    required,
    options,
    size,
    title,
    useCalcValues,
    multiple,
    variant,
  } = field;

  const defaultValue = multiple
    ? options.filter((op) => op.defaultChecked).map((op) => op.label) || []
    : options.find((op) => op.defaultChecked)?.label || "";

  return (
    <List sx={{ overflowY: "auto", overflowX: "hidden" }}>
      <LabelProperty value={label} onChange={onPropsChange} />
      <HelperTextProperty value={helperText} onChange={onPropsChange} />
      <OptionsProperty value={{ useCalcValues, options }} onChange={onPropsChange} />
      <DropdownDefaultValueProperty
        value={{ multiple, options, defaultValue }}
        onChange={onPropsChange}
      />
      <HoverTextProperty value={title} onChange={onPropsChange} />
      <WidthProperty value={colSpan} onChange={onPropsChange} />
      <RequiredProperty value={required} onChange={onPropsChange} />
      <MultipleProperty value={multiple} onChange={onPropsChange} />
      <HiddenProperty value={hidden} onChange={onPropsChange} />
      <VariantProperty value={variant} onChange={onPropsChange} />
      <CompactnessProperty value={size} onChange={onPropsChange} />
    </List>
  );
};
