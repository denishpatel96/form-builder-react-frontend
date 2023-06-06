import React from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_HOME } from "../../constants";

type LogoProps = {
  width?: number;
  height?: number;
  invert?: boolean;
};

const Logo = ({ width = 150, height, invert = false }: LogoProps) => {
  const navigate = useNavigate();
  return (
    <img
      src="https://drive.google.com/uc?export=view&id=1Uv3kdd0QYBFA3ZsK9ntz2BzYcTtaQEXp"
      width={width}
      height={height}
      onClick={() => navigate(ROUTE_HOME)}
      style={{ filter: invert ? "invert(100%)" : "", cursor: "pointer" }}
      alt="vTwinForms"
    />
  );
};

export default Logo;
