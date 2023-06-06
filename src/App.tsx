import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes";
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";
import { Provider } from "react-redux";
import { store } from "./store";
import Toast from "./components/Reusable/Toast";

const App = () => {
  return (
    <Provider store={store}>
      <ThemeConfig>
        <GlobalStyles />
        <BrowserRouter>
          <Toast />
          <Routes />
        </BrowserRouter>
      </ThemeConfig>
    </Provider>
  );
};

export default App;
