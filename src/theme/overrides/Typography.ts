const Typography = (theme: any) => {
  return {
    MuiTypography: {
      styleOverrides: {
        root: {
          color: theme.palette.text.secondary,
        },
      },
    },
  };
};

export default Typography;
