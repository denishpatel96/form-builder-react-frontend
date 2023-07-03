const Tooltip = (theme: any) => {
  return {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.background.paper,
          boxShadow: theme.shadows[1],
        },
      },
    },
  };
};
export default Tooltip;
