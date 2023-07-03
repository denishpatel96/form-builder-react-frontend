const Slider = (_theme: any) => {
  return {
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
  };
};

export default Slider;
