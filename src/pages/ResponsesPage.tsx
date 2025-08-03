import React from "react";
import FormResponseDataTables from "../components/FormResponseDataTables";
import AuthWrapper from "../hoc/AuthWrapper";

export const ResponsesPage = () => {
  return (
    <AuthWrapper>
      <FormResponseDataTables />
    </AuthWrapper>
  );
};
