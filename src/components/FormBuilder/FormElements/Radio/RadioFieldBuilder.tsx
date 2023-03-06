import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";
import { IRadioProps } from "./Radio";

interface IRadioFieldBuilderProps {
  field: IRadioProps;
}

const RadioFieldBuilder = ({ field }: IRadioFieldBuilderProps) => {
  return (
    <FormControl fullWidth error={field.error} required={field.required}>
      <FormLabel>{field.label}</FormLabel>
      <RadioGroup row={field.row} title={field.title} value={field.defaultValue} name={field.name}>
        {field.options.map((op, index) => {
          return (
            <FormControlLabel
              key={index}
              value={op.label}
              label={op.label}
              control={<Radio size={field.size} />}
            />
          );
        })}
      </RadioGroup>
      <FormHelperText>{field.helperText}</FormHelperText>
    </FormControl>
  );
};

export default RadioFieldBuilder;
