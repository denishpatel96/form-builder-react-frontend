import { Components, Theme } from "@mui/material";
import { BUTTON_MIN_WIDTH, LARGE_HEIGHT, SMALL_HEIGHT, STANDARD_HEIGHT } from "../constants";

export const componentsOverride = (theme: Theme): Components => {
  return {
    // Card
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          border: `2px solid ${theme.palette.background.default}`,
          boxShadow: "none",
          position: "relative",
          zIndex: 0, // Fix Safari overflow: hidden with border radius
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: 16,
          ":last-child": {
            padding: 16,
          },
        },
      },
    },
    // Dialog
    MuiDialog: {
      styleOverrides: {
        paper: { borderRadius: 0, position: "absolute", bottom: 0, minHeight: 400, margin: 0 },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.background.paper,
          borderBottom: `1px solid ${theme.palette.divider}`,
        },
      },
    },
    MuiDialogActions: {
      styleOverrides: {
        root: {
          padding: 0,
          position: "absolute",
          width: "100%",
          bottom: 0,
          right: 0,
          backgroundColor: theme.palette.background.paper,
          borderTop: `1px solid ${theme.palette.divider}`,
          columnGap: 0,
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          padding: 24,
          backgroundColor: theme.palette.background.default,
        },
      },
    },
    // Button
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          height: STANDARD_HEIGHT,
          minWidth: BUTTON_MIN_WIDTH,
          textAlign: "end",
          justifyContent: "space-between",
        },
      },
    }, // IconButton
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
        sizeSmall: { height: SMALL_HEIGHT, width: SMALL_HEIGHT },
        sizeMedium: { height: STANDARD_HEIGHT, width: STANDARD_HEIGHT },
        sizeLarge: { height: LARGE_HEIGHT, width: LARGE_HEIGHT },
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

    // Popover
    MuiPopover: {
      styleOverrides: {
        paper: {
          borderRadius: 0,
          boxShadow: theme.shadows[1],
        },
      },
    },

    // Menu Item
    MuiMenuItem: {
      styleOverrides: {
        root: {
          height: STANDARD_HEIGHT,
        },
      },
    },

    // Input
    MuiTextField: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          border: "none",
        },
      },
      defaultProps: {
        fullWidth: true,
      },
    },
  };
};
