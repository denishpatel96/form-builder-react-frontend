import { Clear } from "@mui/icons-material";
import { Grid, IconButton, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import React from "react";
import { IRadioOptionProps } from "../../Types";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../../Styles";

type RadioDefaultValuePropertyProps = {
  value: string | undefined;
  options: IRadioOptionProps[];
  onUpdate: (path: string, value: any, isLocalUpdate?: boolean) => void;
};

export const RadioDefaultValueProperty = ({
  value,
  options,
  onUpdate,
}: RadioDefaultValuePropertyProps) => {
  return (
    <StyledListItem>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <PropTitle text="Default Choice" />
        </Grid>
        <Grid item xs={12}>
          <Select
            fullWidth
            variant="standard"
            name="defaultValue"
            id="radio-default-value-select"
            value={value}
            onChange={(e: SelectChangeEvent<any>, _) => {
              onUpdate("defaultValue", e.target.value);
            }}
            IconComponent={() => <></>}
            endAdornment={
              value && (
                <IconButton
                  sx={{ width: 25, height: 25 }}
                  onMouseDown={(event) => {
                    // stops the popup from appearing when this button is clicked
                    event.stopPropagation();
                  }}
                  onClick={() => {
                    onUpdate("defaultValue", "");
                  }}
                >
                  <Clear sx={{ width: 15, height: 15 }} />
                </IconButton>
              )
            }
          >
            {options.map((op, index) => {
              return (
                <MenuItem key={index} value={op.label}>
                  {op.label}
                </MenuItem>
              );
            })}
          </Select>
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
