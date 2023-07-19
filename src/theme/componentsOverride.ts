import { Components, Theme } from "@mui/material";

export const componentsOverride = (theme: Theme): Components => {
  return {
    // Card
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: theme.shadows[1],
          borderRadius: theme.shape.borderRadius,
          position: "relative",
          zIndex: 0, // Fix Safari overflow: hidden with border radius
        },
      },
    },
    MuiCardHeader: {
      defaultProps: {
        titleTypographyProps: { variant: "h6", color: "primary" },
        subheaderTypographyProps: { variant: "subtitle2" },
      },
      styleOverrides: {
        root: {
          padding: theme.spacing(3, 3, 1),
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: theme.spacing(3),
        },
      },
    },

    // Drawer
    MuiDrawer: {
      styleOverrides: {
        paper: {
          boxShadow: "none",
          border: `1px solid ${theme.palette.divider}`,
        },
      },
    },

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

    // Tooltip
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.background.paper,
          border: `1px solid ${theme.palette.divider}`,
        },
      },
    },

    // Typography
    MuiTypography: {
      styleOverrides: {
        root: {
          color: theme.palette.text.secondary,
        },
      },
    },
  };
};
