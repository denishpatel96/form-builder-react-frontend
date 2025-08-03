import { SliderProps } from "@mui/material";
import { IFieldProps } from "./Common";
export type Mark = {
  value: number;
  label?: string;
};
export interface ISliderProps extends IFieldProps {
  defaultValue: number | number[];
  value?: SliderProps["value"];
  title: string;
  helperText: string;
  size: SliderProps["size"];
  min: number;
  max: number;
  showMarks: boolean;
  showCustomMarks: boolean;
  customMarks: Mark[];
  step: SliderProps["step"];
  valueLabelDisplay: SliderProps["valueLabelDisplay"];
  track: SliderProps["track"];
  valueLabelFormat: {
    prefix: string;
    suffix: string;
  };
}
