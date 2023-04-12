import { TagOutlined } from "@mui/icons-material";
import { InputAdornment, TextField, TextFieldProps } from "@mui/material";
import { Box, rgbToHex } from "@mui/system";
import React, { CSSProperties, useRef, useState } from "react";
import { SketchPicker, ColorResult } from "react-color";
import MenuPopover from "./MenuPopover";

export interface IColorPickerProps {
  name: string;
  color: CSSProperties["backgroundColor"];
  onChange: (name: string, value: string) => void;
  textFieldProps: TextFieldProps;
}

const ColorPicker = ({ textFieldProps, name, color, onChange }: IColorPickerProps) => {
  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: "auto", p: 1 }}
      >
        <SketchPicker
          width="250px"
          color={color}
          onChangeComplete={(color: ColorResult) => {
            onChange(name, `rgba(${color.rgb.r},${color.rgb.g},${color.rgb.b},${color.rgb.a})`);
          }}
        />
      </MenuPopover>
      <TextField
        fullWidth
        ref={anchorRef}
        onClick={handleOpen}
        value={color?.toUpperCase()}
        variant="outlined"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <Box
                sx={{
                  width: "20px",
                  height: "20px",
                  backgroundColor: color,
                  borderRadius: "50%",
                  border: "1px solid grey",
                }}
              ></Box>
            </InputAdornment>
          ),
        }}
        {...textFieldProps}
      />
    </>
  );
};

export default ColorPicker;
