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
  Tooltip,
  Chip,
} from "@mui/material";
import { IComboboxProps, IFieldPropertiesChangeFunc } from "../../Types";
import { StyledListItem } from "../Styles";
import PropTitle from "./components/PropTitle";

export interface IComboboxPropertiesProps {
  field: IComboboxProps;
  onPropsChange: IFieldPropertiesChangeFunc;
}

export const ComboboxProperties = ({ field, onPropsChange }: IComboboxPropertiesProps) => {
  const {
    colSpan,
    hidden,
    label,
    helperText,
    required,
    options,
    size,
    title,
    useCalcValues,
    multiple,
    variant,
  } = field;

  const defaultValue = multiple
    ? options.filter((op) => op.defaultChecked).map((op) => op.label) || []
    : options.find((op) => op.defaultChecked)?.label || "";

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
            <PropTitle text="Multiple Selections" />
          </Grid>
          <Grid item xs={12}>
            <Switch
              name={"multiple"}
              checked={multiple}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                onPropsChange("multiple", e.target.checked)
              }
            />
          </Grid>
          <Grid item xs={12}>
            <FormHelperText>Allow multiple selection</FormHelperText>
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
            <PropTitle text="Variant" />
          </Grid>
          <Grid item xs={12}>
            <ToggleButtonGroup
              fullWidth
              size="small"
              color="primary"
              value={variant}
              exclusive
              onChange={(_, value: any) => onPropsChange("variant", value)}
              aria-label="Platform"
            >
              <ToggleButton value="standard">Standard</ToggleButton>
              <ToggleButton value="outlined">Outlined</ToggleButton>
              <ToggleButton value="filled">Filled</ToggleButton>
            </ToggleButtonGroup>
          </Grid>
          <Grid item xs={12}>
            <FormHelperText>Change the style of text input.</FormHelperText>
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
