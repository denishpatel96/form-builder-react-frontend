import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";
import { IRadioProps } from "../../Types/Radio";

export interface IRadioFieldBuilderProps {
  field: IRadioProps;
}

export const RadioFieldBuilder = ({ field }: IRadioFieldBuilderProps) => {
  return (
    <FormControl component={"fieldset"} fullWidth error={field.error} required={field.required}>
      <FormLabel>{field.label}</FormLabel>
      <RadioGroup row={field.row} title={field.title} value={field.defaultValue} name={field.name}>
        {field.options.map((op, index) => {
          return (
            <FormControlLabel
              key={index}
              value={op.label}
              label={op.label}
              control={<Radio size={field.size} required={field.required} />}
            />
          );
        })}
      </RadioGroup>
      <FormHelperText>{field.helperText}</FormHelperText>
    </FormControl>
  );
};
