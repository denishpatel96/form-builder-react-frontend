import React from "react";
import { Box, Button, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FORM_ELEMENTS } from "../../../../../constants";
import {
  IShortTextProps,
  FieldProps,
  IRadioProps,
  ICheckboxProps,
  IDropdownProps,
  IComboboxProps,
  ISliderProps,
  ICheckboxGroupProps,
  ILongTextProps,
} from "../../../Types";
import {
  ComboboxElement,
  DropdownElement,
  CheckboxElement,
  RadioElement,
  SliderElement,
  ShortTextElement,
  LongTextElement,
} from "../Elements";
import { useForm } from "react-hook-form";
import { Control, FieldValues } from "react-hook-form/dist/types";
import { CheckboxGroupElement } from "../Elements/CheckboxGroup.Element";

type FormPreviewProps = {
  formFields: FieldProps[];
  device: string;
};

const renderField = (field: FieldProps, control: Control<FieldValues, any>) => {
  switch (field.fieldType) {
    case FORM_ELEMENTS.SHORT_TEXT:
      return <ShortTextElement field={field as IShortTextProps} control={control} />;
    case FORM_ELEMENTS.LONG_TEXT:
      return <LongTextElement field={field as ILongTextProps} control={control} />;
    case FORM_ELEMENTS.RADIO:
      return <RadioElement field={field as IRadioProps} control={control} />;
    case FORM_ELEMENTS.CHECKBOX:
      return <CheckboxElement field={field as ICheckboxProps} control={control} />;
    case FORM_ELEMENTS.CHECKBOX_GROUP:
      return <CheckboxGroupElement field={field as ICheckboxGroupProps} control={control} />;
    case FORM_ELEMENTS.DROPDOWN:
      return <DropdownElement field={field as IDropdownProps} control={control} />;
    case FORM_ELEMENTS.COMBOBOX:
      return <ComboboxElement field={field as IComboboxProps} control={control} />;
    case FORM_ELEMENTS.SLIDER:
      return <SliderElement field={field as ISliderProps} control={control} />;

    default:
      break;
  }
};

const FormPreview = ({ formFields, device }: FormPreviewProps) => {
  const theme = useTheme();
  const { handleSubmit, control, reset } = useForm();
  return (
    <form onSubmit={handleSubmit((data) => console.log("formData : ", data))}>
      <Box
        sx={{ py: 4, px: 2, bgcolor: theme.palette.background.paper, boxShadow: theme.shadows[1] }}
      >
        <Grid container spacing={3}>
          {formFields.map((field, index) => {
            const { colSpan } = field;
            return (
              <Grid item key={index} xs={12} sm={12} md={device === "phone" ? 12 : colSpan}>
                {renderField(field, control)}
              </Grid>
            );
          })}
          <Grid item xs={6}>
            <Button fullWidth onClick={reset} variant="outlined">
              Reset
            </Button>
          </Grid>
          <Grid item xs={6}>
            <Button fullWidth type="submit" variant="contained">
              Submit
            </Button>
          </Grid>
        </Grid>
      </Box>
    </form>
  );
};

export default FormPreview;
