import {
  Button,
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Grid,
  InputBaseProps,
  Radio,
  RadioGroup,
  TextField,
  TextFieldProps,
  Typography,
} from "@mui/material";
import React from "react";
import { FORM_ELEMENTS } from "../../../constants";
import { FieldProps } from "../FormElements/Common/Types";
import { IRadioProps } from "../FormElements/Radio/Radio";
import { ITextProps } from "../FormElements/TextField/Text";
import { validateText } from "../FormElements/TextField/TextFieldUtility";
import { cloneDeep } from "lodash";

type FormPreviewProps = {
  formFields: FieldProps[];
  device: string;
};

const TextElement = ({ field }: { field: ITextProps }) => {
  if (!field || field.hidden) {
    return <></>;
  }
  const [error, setError] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string | null>(null);
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { error, errorMessage } = validateText(field, e.target.value);
    setError(error);
    setMessage(errorMessage);
    e.target.setCustomValidity(errorMessage || "");
  };

  const {
    name,
    id,
    label,
    defaultValue,
    helperText,
    margin,
    multiline,
    rows,
    maxRows,
    minRows,
    title,
    required,
    size,
    variant,
  } = field;

  return (
    <TextField
      fullWidth
      id={id}
      label={label}
      name={name}
      margin={margin}
      multiline={multiline}
      rows={rows}
      minRows={minRows}
      maxRows={maxRows}
      required={required}
      title={title}
      size={size}
      variant={variant}
      defaultValue={defaultValue}
      error={error}
      helperText={message || helperText}
      onChange={handleChange}
    />
  );
};

const RadioElement = ({ field }: { field: IRadioProps }) => {
  if (!field || field.hidden) {
    return <></>;
  }

  const { error, helperText, label, name, options, required, row, size, title, defaultValue } =
    field;

  return (
    <FormControl fullWidth error={error} required={required}>
      <FormLabel>{label}</FormLabel>
      <RadioGroup row={row} title={title} defaultValue={defaultValue} name={name}>
        {options.map((op, index) => {
          return (
            <FormControlLabel
              key={index}
              value={op.label}
              label={op.label}
              control={<Radio size={size} required={required} />}
            />
          );
        })}
      </RadioGroup>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};

const renderFormFields = (formFields: FieldProps[], device: string) => {
  return (
    <Grid container spacing={1}>
      {formFields.map((field, index) => {
        const { colSpan, fieldType } = field;
        return (
          <Grid item key={index} xs={12} sm={12} md={device === "phone" ? 12 : colSpan}>
            {fieldType === FORM_ELEMENTS.TEXT && <TextElement field={field as ITextProps} />}
            {fieldType === FORM_ELEMENTS.RADIO && <RadioElement field={field as IRadioProps} />}
          </Grid>
        );
      })}
      <Grid item xs={12}>
        <Button type="submit">Submit</Button>
      </Grid>
    </Grid>
  );
};

const FormPreview = ({ formFields, device }: FormPreviewProps) => {
  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);

        const updatedFormFields = formFields.map((field) => {
          return { question: field.label, response: formData.get(field.name) };
        });
        console.log(updatedFormFields);
      }}
    >
      {renderFormFields(formFields, device)}
    </form>
  );
};

export default FormPreview;
