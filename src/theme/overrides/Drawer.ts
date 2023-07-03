const Drawer = (theme: any) => {
  return {
    MuiDrawer: {
      styleOverrides: {
        paper: {
          boxShadow: "none",
          border: `1px solid ${theme.palette.divider}`,
        },
      },
    },
  };
};
export default Drawer;
