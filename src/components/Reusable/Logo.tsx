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
      // src="https://drive.google.com/uc?export=view&id=1p_AoLW8_3U0XuqEZkghBiP8SArrTnkBJ" Not working anumore
      src="https://drive.google.com/thumbnail?id=1p_AoLW8_3U0XuqEZkghBiP8SArrTnkBJ"
      width={width}
      height={height}
      onClick={() => navigate(ROUTE_HOME)}
      style={{ filter: invert ? "brightness(0%) invert(100%)" : "", cursor: "pointer" }}
      alt="vTwinsForm"
    />
  );
};

export default Logo;
