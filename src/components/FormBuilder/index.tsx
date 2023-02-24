import React from "react";
import { Button, Card, Layout, Space, theme, Typography } from "antd";
import {
  IoCheckboxOutline,
  IoRadioButtonOnOutline,
  IoTextOutline,
  IoChevronDownCircleOutline,
  IoCloudUploadOutline,
} from "react-icons/io5";

interface IFormBuilderProps {}

const { useToken } = theme;
const { Content, Sider } = Layout;

const formElements = [
  { id: "text", label: "Text", icon: <IoTextOutline /> },
  { id: "radio", label: "Radio", icon: <IoRadioButtonOnOutline /> },
  { id: "checkbox", label: "Checkbox", icon: <IoCheckboxOutline /> },
  { id: "dropdown", label: "Dropdown", icon: <IoChevronDownCircleOutline /> },
  { id: "file-upload", label: "File Upload", icon: <IoCloudUploadOutline /> },
];

const FormBuilder = (props: IFormBuilderProps) => {
  const { token } = useToken();
  console.log("theme", token);
  return (
    <Layout style={{ minHeight: 500, height: "100vh", padding: 0 }}>
      <Sider style={{ padding: token.padding, background: token.colorBgContainer }} width={310}>
        <Space direction="vertical" style={{ display: "flex" }}>
          {formElements.map((element) => {
            return (
              <Card size="small">
                <Space>
                  {element.icon}
                  <Typography.Text>{element.label}</Typography.Text>
                </Space>
              </Card>
            );
          })}
        </Space>
      </Sider>
      <Content style={{ padding: token.padding }}>Form Canvas</Content>
    </Layout>
  );
};

export default FormBuilder;
