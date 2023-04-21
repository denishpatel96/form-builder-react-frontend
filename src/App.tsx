import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";
import { Provider } from "react-redux";
import { store } from "./store";

const App = () => {
  return (
    <Provider store={store}>
      <ThemeConfig>
        <GlobalStyles />
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
      </ThemeConfig>
    </Provider>
  );
};

// hot reload for development mode
if (process.env.NODE_ENV !== "production" && module.hot) {
  module.hot.accept();
}

export default App;
