import React from "react";
import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Checkbox,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { FORM_ELEMENTS } from "../../../../constants";
import { ITextProps, FieldProps, IRadioProps, ICheckboxProps } from "../../Types";
import { validateText } from "../../Utility/Text.Utility";

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
    <FormControl component={"fieldset"} fullWidth error={error} required={required}>
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

const CheckboxElement = ({ field }: { field: ICheckboxProps }) => {
  if (!field || field.hidden) {
    return <></>;
  }

  const { error, helperText, label, options, required, row, size, title } = field;

  return field.options.length === 1 ? (
    <FormControlLabel
      label={`${field.options[0].label}${field.required ? " *" : ""}`}
      name={field.name}
      control={
        <Checkbox
          defaultChecked={field.options[0].defaultChecked}
          value={field.options[0].label}
          size={field.size}
          required={field.required}
        />
      }
    />
  ) : (
    <FormControl component={"fieldset"} fullWidth error={error} required={required}>
      <FormLabel>{label}</FormLabel>
      <FormGroup row={row} title={title}>
        {options.map((op, index) => {
          return (
            <FormControlLabel
              name={field.name}
              key={index}
              label={op.label}
              control={
                <Checkbox
                  defaultChecked={op.defaultChecked}
                  value={op.label}
                  size={size}
                  required={required}
                />
              }
            />
          );
        })}
      </FormGroup>
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
            {fieldType === FORM_ELEMENTS.CHECKBOX && (
              <CheckboxElement field={field as ICheckboxProps} />
            )}
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
  const theme = useTheme();
  return (
    <form
      onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);

        const updatedFormFields = formFields.map((field) => {
          return { question: field.label, response: formData.getAll(field.name) };
        });
        console.log(updatedFormFields);
      }}
    >
      <Box
        sx={{ py: 4, px: 2, bgcolor: theme.palette.background.paper, boxShadow: theme.shadows[1] }}
      >
        {renderFormFields(formFields, device)}
      </Box>
    </form>
  );
};

export default FormPreview;
