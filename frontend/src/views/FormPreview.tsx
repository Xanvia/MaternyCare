// import React from "react";
import BasicDetailsPreview from "./forms/BasicDetailsPreview";
import { useParams } from "react-router-dom";
import PresentObstetricHistoryPreview from "./forms/PresentObstetricHistoryPreview";
import PregnancyBMIChart from "../components/PregnancyBMIChart";
import SFHChart from "../components/SFHChart";
import EmergencyPlanPreview from "./forms/EmergencyPlanPreview";
import CounselingFormPreview from "./forms/CounselingFormPreview";

const FormPreview = () => {
  const { id = "" } = useParams<{ id: string }>() || {};

  return (
    <div className="mx-4">
      <BasicDetailsPreview motherId={id} />
      <PresentObstetricHistoryPreview motherId={id} />
      <div className="my-10">
        <PregnancyBMIChart motherId={id} />
      </div>
      <div className="my-10">
        <SFHChart motherId={id} />
      </div>
      <EmergencyPlanPreview motherId={id} />
      <CounselingFormPreview motherId={id} />
    </div>
  );
};

export default FormPreview;
