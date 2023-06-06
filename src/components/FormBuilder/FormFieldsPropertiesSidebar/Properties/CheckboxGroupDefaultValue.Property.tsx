import { Clear } from "@mui/icons-material";
import {
  Box,
  Checkbox,
  Chip,
  Grid,
  IconButton,
  ListItemText,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tooltip,
} from "@mui/material";
import React from "react";
import { ISelectableOptionProps } from "../../Types";
import PropTitle from "./PropTitle";
import { StyledListItem } from "../Styles";
import { useAppDispatch } from "../../../../store/hooks";
import { changeFieldProp } from "../../../../store/features/formSlice";

type CheckboxGroupDefaultValuePropertyProps = {
  value: string[];
  options: ISelectableOptionProps[];
};

export const CheckboxGroupDefaultValueProperty = ({
  value,
  options,
}: CheckboxGroupDefaultValuePropertyProps) => {
  const dispatch = useAppDispatch();
  return (
    <StyledListItem>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <PropTitle text="Default Choices" />
        </Grid>
        <Grid item xs={12}>
          <Select
            fullWidth
            multiple
            variant="standard"
            name="defaultValue"
            value={value}
            renderValue={() => (
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                {value.map((value, index) => (
                  <Tooltip title={value} key={index}>
                    <Chip key={value} label={value} />
                  </Tooltip>
                ))}
              </Box>
            )}
            onChange={(e: SelectChangeEvent<any>, _) => {
              const value = e.target.value;
              const updatedOptions = options.map((op) => {
                let updatedOp = { ...op };
                let valueArray = typeof value === "string" ? value.split(",") : value;
                updatedOp.defaultChecked =
                  valueArray.findIndex((v: string) => v === updatedOp.label) > -1;
                return updatedOp;
              });
              dispatch(changeFieldProp({ path: "options", value: updatedOptions }));
            }}
            IconComponent={() => <></>}
            endAdornment={
              value?.length > 0 && (
                <IconButton
                  sx={{ width: 25, height: 25 }}
                  onMouseDown={(event) => {
                    // stops the popup from appearing when this button is clicked
                    event.stopPropagation();
                  }}
                  onClick={() => {
                    dispatch(
                      changeFieldProp({
                        path: "options",
                        value: options.map((op) => {
                          let updatedOp = { ...op };
                          updatedOp.defaultChecked = false;
                          return updatedOp;
                        }),
                      })
                    );
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
                  <Checkbox checked={value.indexOf(op.label) > -1} />
                  <ListItemText primary={op.label} />
                </MenuItem>
              );
            })}
          </Select>
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
