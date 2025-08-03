import { useTheme, styled, lighten } from "@mui/material/styles";
import React from "react";

const WaveStyle = styled("div")({
  position: "absolute",
  width: "100%",
  ".waves": {
    position: "relative",
    width: "100%",
    height: "15vh",
    marginBottom: "-7px" /*Fix for safari gap*/,
    minHeight: "100px",
    maxHeight: "150px",
  },

  ".content": {
    position: "relative",
    height: "20vh",
    textAlign: "center",
    backgroundColor: "white",
  },

  ".parallax > use": {
    animation: "move-forever 25s cubic-bezier(.55,.5,.45,.5) infinite",
  },
  ".parallax > use:nth-of-type(1)": {
    animationDelay: "-2s",
    animationDuration: "7s",
  },
  ".parallax > use:nth-of-type(2)": {
    animationDelay: "-3s",
    animationDuration: "10s",
  },
  ".parallax > use:nth-of-type(3)": {
    animationDelay: "-4s",
    animationDuration: "13s",
  },
  ".parallax > use:nth-of-type(4)": {
    animationDelay: "-5s",
    animationDuration: "20s",
  },
  "@keyframes move-forever": {
    "0%": {
      transform: "translate3d(-90px,0,0)",
    },
    "100%": {
      transform: "translate3d(85px,0,0)",
    },
  },
});

const Waves = ({ color }: { color?: string }) => {
  const theme = useTheme();
  if (!color) {
    color = theme.palette.primary.main;
  }
  return (
    <WaveStyle>
      <svg
        className="waves"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        viewBox="0 24 150 28"
        preserveAspectRatio="none"
        shapeRendering="auto"
      >
        <defs>
          <path
            id="gentle-wave"
            d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
          />
        </defs>
        <g className="parallax">
          <use xlinkHref="#gentle-wave" x="48" y="0" fill={lighten(color, 0.7)} />
          <use xlinkHref="#gentle-wave" x="48" y="3" fill={lighten(color, 0.5)} />
          <use xlinkHref="#gentle-wave" x="48" y="5" fill={lighten(color, 0.3)} />
          <use xlinkHref="#gentle-wave" x="48" y="7" fill={color} />
        </g>
      </svg>
    </WaveStyle>
  );
};

export default Waves;
