import { Components, Theme } from "@mui/material";

export const componentsOverride = (_theme: Theme): Components => {
  return {
    // Slider
    MuiSlider: {
      styleOverrides: {
        mark: { height: 5 },
        markLabel: {
          '&[style="left: 0%;"]': {
            transform: "none",
          },
          '&[style="left: 100%;"]': {
            transform: "translateX(-100%)",
          },
        },
        valueLabel: {
          whiteSpace: "normal",
        },
      },
    },

    // Form Label
    MuiFormLabel: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          marginBottom: 10,
        },
      },
    },
  };
};
