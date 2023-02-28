import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";

const App = () => {
  return (
    <ThemeConfig>
      <GlobalStyles />
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </ThemeConfig>
  );
};

export default App;
