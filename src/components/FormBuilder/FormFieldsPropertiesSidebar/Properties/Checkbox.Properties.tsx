import React from "react";
import { Add, Clear, Delete, Remove } from "@mui/icons-material";
import {
  TextField,
  Switch,
  FormHelperText,
  List,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
  IconButton,
  Slider,
  Select,
  MenuItem,
  SelectChangeEvent,
  Box,
  Typography,
  Checkbox,
  Button,
  ListItemText,
  Chip,
  Tooltip,
} from "@mui/material";
import { ICheckboxProps, IFieldPropertiesChangeFunc } from "../../Types";
import { StyledListItem } from "../Styles";
import PropTitle from "./components/PropTitle";

export interface ICheckboxPropertiesProps {
  field: ICheckboxProps;
  onPropsChange: IFieldPropertiesChangeFunc;
}

export const CheckboxProperties = ({ field, onPropsChange }: ICheckboxPropertiesProps) => {
  const { colSpan, hidden, label, helperText, required, options, row, size, title, useCalcValues } =
    field;

  const defaultValue = options.filter((op) => op.defaultChecked).map((op) => op.label);
  return (
    <List sx={{ overflowY: "auto", overflowX: "hidden" }}>
      <StyledListItem>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <PropTitle text="Field Label" />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name={"label"}
              variant="standard"
              size="small"
              value={label}
              fullWidth
              InputProps={{
                endAdornment: label && (
                  <IconButton
                    color="primary"
                    size="small"
                    onClick={() => {
                      onPropsChange("label", "");
                    }}
                  >
                    <Clear sx={{ height: 15, width: 15 }} />
                  </IconButton>
                ),
              }}
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                onPropsChange("label", e.target.value)
              }
            />
          </Grid>
        </Grid>
      </StyledListItem>
      <StyledListItem>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <PropTitle text="Helper Text" />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name={"helperText"}
              variant="standard"
              size="small"
              value={helperText}
              fullWidth
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                onPropsChange("helperText", e.target.value)
              }
            />
          </Grid>
        </Grid>
      </StyledListItem>
      <StyledListItem>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <PropTitle text="Options" />
          </Grid>
          <Grid item xs={12} display={"flex"} alignItems={"center"}>
            <Checkbox
              name={"useCalcValues"}
              checked={useCalcValues}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onPropsChange("useCalcValues", e.target.checked)
              }
            />
            <FormHelperText>Add values that can be used in calculations</FormHelperText>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={1}>
              {useCalcValues && (
                <>
                  <Grid item xs={8}>
                    <Typography variant="overline">Label</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography variant="overline">Value</Typography>
                  </Grid>
                </>
              )}
              {options.map((op, index) => {
                return (
                  <React.Fragment key={index}>
                    <Grid item xs={useCalcValues ? 8 : 12} display={"flex"} alignItems={"center"}>
                      <IconButton
                        sx={{ width: 20, height: 20, mr: 1 }}
                        onClick={() => {
                          onPropsChange(
                            "options",
                            options.filter((_, ind) => ind !== index)
                          );
                        }}
                      >
                        <Remove sx={{ widh: 15, height: 15 }} />
                      </IconButton>
                      <TextField
                        name={`$op-${index}-label`}
                        variant="standard"
                        size="small"
                        value={op.label}
                        fullWidth
                        onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
                          onPropsChange(`options[${index}].label`, e.target.value)
                        }
                      />
                    </Grid>
                    {useCalcValues && (
                      <Grid item xs={4}>
                        <TextField
                          name={`$op-${index}-calc-value`}
                          variant="standard"
                          size="small"
                          value={op.value}
                          fullWidth
                          onChange={(
                            e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
                          ) => onPropsChange(`options[${index}].value`, e.target.value)}
                        />
                      </Grid>
                    )}
                  </React.Fragment>
                );
              })}

              <Grid item xs={12}>
                <Button
                  size="small"
                  startIcon={<Add />}
                  onClick={() => {
                    onPropsChange(`options`, [...options, { label: "", value: "" }]);
                  }}
                >
                  <Typography variant="body2">Add option</Typography>
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </StyledListItem>
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
              id="radio-default-value-select"
              value={defaultValue}
              renderValue={() => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  {defaultValue.map((value, index) => (
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
                onPropsChange("options", updatedOptions);
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
                      onPropsChange(
                        "options",
                        options.map((op) => {
                          let updatedOp = { ...op };
                          updatedOp.defaultChecked = false;
                          return updatedOp;
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
                    <Checkbox checked={defaultValue.indexOf(op.label) > -1} />
                    <ListItemText primary={op.label} />
                  </MenuItem>
                );
              })}
            </Select>
          </Grid>
        </Grid>
      </StyledListItem>
      <StyledListItem>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <PropTitle text="Hover Text" />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name={"title"}
              variant="standard"
              size="small"
              value={title}
              fullWidth
              onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
                onPropsChange("title", e.target.value);
              }}
            />
          </Grid>
        </Grid>
      </StyledListItem>
      <StyledListItem>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <PropTitle text="Width" />
          </Grid>
          <Grid item xs={12}>
            <Slider
              aria-label="Form element width"
              value={colSpan}
              valueLabelDisplay="auto"
              onChange={(_, value: number | number[]) => {
                onPropsChange("colSpan", value);
              }}
              step={null}
              marks={[3, 4, 6, 8, 9, 12].map((el) => ({ value: el, label: el }))}
              min={0}
              max={12}
            />
          </Grid>
        </Grid>
      </StyledListItem>
      <StyledListItem>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <PropTitle text="Horizontal Layout" />
          </Grid>
          <Grid item xs={12}>
            <Switch
              name={"row"}
              checked={row}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onPropsChange("row", e.target.checked)
              }
            />
          </Grid>
          <Grid item xs={12}>
            <FormHelperText>Lay out the options horizontally.</FormHelperText>
          </Grid>
        </Grid>
      </StyledListItem>
      <StyledListItem>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <PropTitle text="Required" />
          </Grid>
          <Grid item xs={12}>
            <Switch
              name={"required"}
              checked={required}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onPropsChange("required", e.target.checked)
              }
            />
          </Grid>
          <Grid item xs={12}>
            <FormHelperText>Prevent submission if this field is empty</FormHelperText>
          </Grid>
        </Grid>
      </StyledListItem>
      <StyledListItem>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <PropTitle text="Hidden" />
          </Grid>
          <Grid item xs={12}>
            <Switch
              name={"hidden"}
              checked={hidden}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onPropsChange("hidden", e.target.checked)
              }
            />
          </Grid>
        </Grid>
      </StyledListItem>

      <StyledListItem>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <PropTitle text="Compactness" />
          </Grid>
          <Grid item xs={12}>
            <ToggleButtonGroup
              fullWidth
              size="small"
              color="primary"
              value={size}
              exclusive
              onChange={(_, value: any) => onPropsChange("size", value)}
            >
              <ToggleButton value="small">Compact</ToggleButton>
              <ToggleButton value="medium">Normal</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item xs={12}>
            <FormHelperText>Compact the input size.</FormHelperText>
          </Grid>
        </Grid>
      </StyledListItem>
    </List>
  );
};
