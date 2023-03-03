import { Grid, TextField } from "@mui/material";
import React from "react";
import { FORM_ELEMENTS } from "../../../constants";

type FormPreviewProps = {
  formFields: any[];
};

type FormElementProps = {
  field: any;
};

const FormElement = ({ field }: FormElementProps) => {
  const valueRef = React.useRef("");
  const [error, setError] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState<string | null>(null);
  const validate = (value: string) => {
    let error = false;
    let errorMessage = null;
    const lengthValidation = field.validations?.lengthValidation;
    const patternValidation = field.validations?.patternValidation;
    if (value) {
      if (lengthValidation) {
        const { required, min, max, message } = lengthValidation;
        if (required && ((min && value.length < min) || (max && value.length > max))) {
          error = true;
          errorMessage = message;
        }
      }
      if (patternValidation) {
        const { required, pattern, message } = patternValidation;
        const regEx = new RegExp(pattern);
        if (required && !regEx.test(value)) {
          error = true;
          errorMessage = message;
        }
      }
    }
    setError(error);
    setMessage(errorMessage);
  };

  if (field.hidden) {
    return <></>;
  }

  return (
    <Grid item xs={12} md={field.colSpan}>
      {field.fieldType === FORM_ELEMENTS.TEXT && (
        <TextField
          inputRef={valueRef}
          {...field.props}
          error={error}
          helperText={message || field.props.helperText}
          onChange={(e) => validate(e.target.value)}
        />
      )}
    </Grid>
  );
};

const FormPreview = ({ formFields }: FormPreviewProps) => {
  return (
    <form>
      <Grid container spacing={1}>
        {formFields.map((field, index) => {
          return <FormElement key={index} field={field} />;
        })}
      </Grid>
    </form>
  );
};

export default FormPreview;
