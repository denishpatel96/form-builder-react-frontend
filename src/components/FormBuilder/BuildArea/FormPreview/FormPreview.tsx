import React from "react";
import { Box, Button, Grid } from "@mui/material";
import { FORM_ELEMENTS } from "../../../../constants";
import {
  IShortTextProps,
  IFieldProps,
  IRadioProps,
  ICheckboxProps,
  IDropdownProps,
  IComboboxProps,
  ISliderProps,
  ICheckboxGroupProps,
  ILongTextProps,
  IFormDesignProps,
  IHeadingProps,
} from "../../Types";
import {
  ComboboxField,
  DropdownField,
  CheckboxField,
  RadioField,
  SliderField,
  ShortTextField,
  LongTextField,
  HeadingField,
} from "../Fields";
import { useForm } from "react-hook-form";
import { Control, FieldValues } from "react-hook-form/dist/types";
import { CheckboxGroupField } from "../Fields/CheckboxGroupField";
import { ArrowForwardOutlined, Refresh } from "@mui/icons-material";
import { useCreateFormResponseMutation } from "../../../../store/features/api";
import { useParams } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

type FormPreviewProps = {
  formFields: IFieldProps[];
  device: string;
  formProperties: IFormDesignProps;
  onSuccess?: () => void;
};

const renderField = (field: IFieldProps, control: Control<FieldValues, any>) => {
  switch (field.fieldType) {
    case FORM_ELEMENTS.HEADING:
      return <HeadingField field={field as IHeadingProps} />;
    case FORM_ELEMENTS.SHORT_TEXT:
      return <ShortTextField field={field as IShortTextProps} control={control} />;
    case FORM_ELEMENTS.LONG_TEXT:
      return <LongTextField field={field as ILongTextProps} control={control} />;
    case FORM_ELEMENTS.RADIO:
      return <RadioField field={field as IRadioProps} control={control} />;
    case FORM_ELEMENTS.CHECKBOX:
      return <CheckboxField field={field as ICheckboxProps} control={control} />;
    case FORM_ELEMENTS.CHECKBOX_GROUP:
      return <CheckboxGroupField field={field as ICheckboxGroupProps} control={control} />;
    case FORM_ELEMENTS.DROPDOWN:
      return <DropdownField field={field as IDropdownProps} control={control} />;
    case FORM_ELEMENTS.COMBOBOX:
      return <ComboboxField field={field as IComboboxProps} control={control} />;
    case FORM_ELEMENTS.SLIDER:
      return <SliderField field={field as ISliderProps} control={control} />;

    default:
      break;
  }
};

const FormPreview = ({ formFields, device, formProperties, onSuccess }: FormPreviewProps) => {
  const { formId } = useParams() as {
    orgId: string;
    workspaceId: string;
    formId: string;
  };
  const { handleSubmit, control, reset: resetForm } = useForm();
  const [createFormResponse, { isLoading }] = useCreateFormResponseMutation();

  const handleCreateFormResponse = async (data: FieldValues) => {
    console.log("formData : ", data);

    if (isLoading) return;
    try {
      await createFormResponse({ formId, responseData: data }).unwrap();
      if (onSuccess) onSuccess();
    } catch (error) {
      console.log("Error submitting form response: ", error);
    }
  };
  return (
    <form onSubmit={handleSubmit((data) => handleCreateFormResponse(data))}>
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
            <Button onClick={resetForm} startIcon={<Refresh />} disabled={isLoading}>
              Reset
            </Button>
            <LoadingButton
              loading={isLoading}
              variant="contained"
              loadingPosition={"end"}
              endIcon={<ArrowForwardOutlined />}
              type="submit"
            >
              Submit
            </LoadingButton>
          </Box>
        </Grid>
      </Grid>
    </form>
  );
};

export default FormPreview;
