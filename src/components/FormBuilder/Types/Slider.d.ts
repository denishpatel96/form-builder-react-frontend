import { SliderProps } from "@mui/material";
export type Mark = {
  value: number;
  label?: string;
};
export interface ISliderProps {
  fieldType: string | number;
  hidden: boolean;
  colSpan: 3 | 4 | 6 | 8 | 9 | 12;
  id: string;
  name: string;
  defaultValue: number | number[];
  value?: SliderProps["value"];
  title: string;
  label: string;
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
