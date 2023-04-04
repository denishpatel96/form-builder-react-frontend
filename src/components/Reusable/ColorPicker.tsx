import { Box } from "@mui/system";
import React, { CSSProperties, useRef, useState } from "react";
import { SketchPicker, ColorResult } from "react-color";
import MenuPopover from "./MenuPopover";

export interface IColorPickerProps {
  name: string;
  color: CSSProperties["backgroundColor"];
  onChange: (name: string, value: string) => void;
}

const ColorPicker = ({ name, color, onChange }: IColorPickerProps) => {
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
          color={color}
          onChangeComplete={(color: ColorResult) => {
            onChange(name, color.hex);
            handleClose();
          }}
        />
      </MenuPopover>
      <Box
        ref={anchorRef}
        onClick={handleOpen}
        sx={{
          width: "30px",
          height: "30px",
          backgroundColor: color?.toString(),
          borderRadius: "50%",
        }}
      ></Box>
    </>
  );
};

export default ColorPicker;
