import { ConfigProvider, App } from "antd";
import React from "react";
import FormBuilder from "./components/FormBuilder";

type Props = {};

const MainApp = (props: Props) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#009687",
        },
      }}
    >
      <App>
        <FormBuilder />
      </App>
    </ConfigProvider>
  );
};

export default MainApp;
