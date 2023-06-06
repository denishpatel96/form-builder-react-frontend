import React from "react";
import { Box, Button, Grid } from "@mui/material";
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
  IFormDesignProps,
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
import { ArrowCircleRight, Refresh } from "@mui/icons-material";

type FormPreviewProps = {
  formFields: FieldProps[];
  device: string;
  formProperties: IFormDesignProps;
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

const FormPreview = ({ formFields, device, formProperties }: FormPreviewProps) => {
  const { handleSubmit, control, reset } = useForm();
  return (
    <form onSubmit={handleSubmit((data) => console.log("formData : ", data))}>
      <Grid
        container
        rowSpacing={`${formProperties.verticalSpacing}px`}
        columnSpacing={`${formProperties.horizontalSpacing}px`}
      >
        {formFields.map((field, index) => {
          const { colSpan } = field;
          return (
            <Grid item key={index} xs={12} sm={12} md={device === "phone" ? 12 : colSpan}>
              {renderField(field, control)}
            </Grid>
          );
        })}
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button onClick={reset} startIcon={<Refresh />}>
              Reset
            </Button>
            <Button type="submit" variant="contained" endIcon={<ArrowCircleRight />}>
              Submit
            </Button>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default FormPreview;
