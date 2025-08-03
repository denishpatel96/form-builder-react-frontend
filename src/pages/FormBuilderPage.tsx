import React from "react";
import FormBuilder from "../components/FormBuilder";
import AuthWrapper from "../hoc/AuthWrapper";

export const FormBuilderPage = () => {
  return (
    <AuthWrapper>
      <FormBuilder />
    </AuthWrapper>
  );
};
