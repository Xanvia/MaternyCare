// import React from "react";
import BasicDetailsPreview from "./forms/BasicDetailsPreview";
import { useParams } from "react-router-dom";

const FormPreview = () => {
  const { id = '' } = useParams<{ id: string }>() || {};

  return (
    <div className="mx-4">
      <BasicDetailsPreview motherId={id} />
    </div>
  );
};

export default FormPreview;
