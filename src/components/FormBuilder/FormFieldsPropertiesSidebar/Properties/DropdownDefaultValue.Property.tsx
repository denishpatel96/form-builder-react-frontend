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
import { changeFieldProp } from "../../../../store/features/form/formSlice";

type DropdownDefaultValuePropertyProps = {
  value: {
    defaultValue: string | string[];
    multiple: boolean;
    options: ISelectableOptionProps[];
  };
};

export const DropdownDefaultValueProperty = ({
  value: { defaultValue, multiple, options },
}: DropdownDefaultValuePropertyProps) => {
  const dispatch = useAppDispatch();
  return (
    <StyledListItem>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <PropTitle text={multiple ? "Default Choices" : "Default Choice"} />
        </Grid>
        <Grid item xs={12}>
          <Select
            fullWidth
            multiple={multiple}
            variant="standard"
            name="defaultValue"
            id="radio-default-value-select"
            value={defaultValue}
            renderValue={() =>
              multiple ? (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {(defaultValue as string[]).map((value, index) => (
                    <Tooltip title={value} key={index}>
                      <Chip key={value} label={value} />
                    </Tooltip>
                  ))}
                </Box>
              ) : (
                defaultValue
              )
            }
            onChange={(e: SelectChangeEvent<any>, _) => {
              const value = e.target.value;
              let valueArray = multiple
                ? typeof value === "string"
                  ? value.split(",")
                  : value
                : [value];
              const updatedOptions = options.map((op) => {
                let updatedOp = { ...op };

                updatedOp.defaultChecked =
                  valueArray.findIndex((v: string) => v === updatedOp.label) > -1;

                return updatedOp;
              });

              dispatch(changeFieldProp({ path: "options", value: updatedOptions }));
            }}
            IconComponent={() => <></>}
            endAdornment={
              defaultValue?.length > 0 && (
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
                  {multiple ? (
                    <>
                      <Checkbox checked={defaultValue.indexOf(op.label) > -1} />
                      <ListItemText primary={op.label} />
                    </>
                  ) : (
                    op.label
                  )}
                </MenuItem>
              );
            })}
          </Select>
        </Grid>
      </Grid>
    </StyledListItem>
  );
};
