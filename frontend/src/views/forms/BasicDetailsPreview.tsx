import { useState, useEffect } from "react";
import axios from "axios";
import { CloseCircle, TickCircle } from "../../assets/icons/Icons";

interface BasicDetailsPreviewProps {
  motherId: string;
}

const BasicDetailsPreview: React.FC<BasicDetailsPreviewProps> = ({
  motherId,
}) => {
  const [data, setData] = useState({
    user: {
      firstName: "",
      lastName: "",
    },
    age: 0,
    mother_blood_type: "",
    mother_height: "",
    allergies: "",
    moh_area: "",
    phm_area: "",
    field_clinic: "",
    consultant_obstetrician: "",
    antenatal_risk_conditions: "",
    eligible_family_register: "",
    pregnant_mother_register: "",
    gs_division: "",
    risk_type: " formData.risk_type",
    registration_no: "formData.registration_no",
    registration_date: " formData.registration_date",
    mother_weight: "formData.mother_weight",
    hospital_clinic: "formData.hospital_clinic",
    consanguinity: "formData.consanguinity",
    rubella_immunization: " formData.rubella_immunization",
    pre_pregnancy_screening: "",
    preconceptional_folic_acid: "",
    history_of_subfertility: "",
    planned_pregnancy: "",
    last_family_planing_method: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = JSON.parse(localStorage.getItem("token") || '""');

  useEffect(() => {
    const fetchBasicDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}users/mother/${motherId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data);
      } catch (err) {
        setError("Failed to load basic details");
        console.error("Error fetching basic details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBasicDetails();
  }, [motherId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-48">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  const PreviewField: React.FC<{ label: string; value: React.ReactNode }> = ({
    label,
    value,
  }) => (
    <div className="mb-4">
      <p className="text-sm font-medium text-gray-500">{label}</p>
      <p className="mt-1 text-sm text-gray-900">{value || "Not specified"}</p>
    </div>
  );

  return (
    <div className="max-w-full my-4 bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <div className="flex gap-4">
        <h2 className="text-xl font-semibold mb-6">Basic Details Preview</h2>
        <div className={`w-8 h-8 bg-${data.risk_type}-500 mb-6`}></div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div>
          <PreviewField
            label="Mother's Name"
            value={`${data.user?.firstName} ${data.user?.lastName}`}
          />
          <PreviewField
            label="Height (cm)"
            value={Number(data.mother_height)}
          />
          <PreviewField
            label="BMI"
            value={(
              Number(data.mother_weight) /
              (Number(data.mother_height) / 100) ** 2
            ).toFixed(2)}
          />
          <PreviewField label="Allergies" value={data.allergies} />
          <PreviewField
            label="Grama Niladhari Division"
            value={data.gs_division}
          />
          <PreviewField
            label="Eligible Family Register"
            value={data.eligible_family_register}
          />
          <PreviewField
            label="Name of the Hospital Clinic"
            value={data.hospital_clinic}
          />
          <PreviewField
            label="Pregnant Mother Register"
            value={data.pregnant_mother_register}
          />
          <PreviewField
            label="Consanguinity"
            value={data.consanguinity ? <TickCircle /> : <CloseCircle />}
          />
          <PreviewField
            label="Rubella immunization"
            value={data.rubella_immunization ? <TickCircle /> : <CloseCircle />}
          />

          <PreviewField
            label="Pre-pregnancy screening done"
            value={
              data.pre_pregnancy_screening ? <TickCircle /> : <CloseCircle />
            }
          />
        </div>

        {/* Right Column */}
        <div>
          <PreviewField label="Age" value={data.age} />
          <PreviewField label="Weight" value={data.mother_weight} />
          <PreviewField label="Blood Group" value={data.mother_blood_type} />
          <PreviewField label="MOH Area" value={data.moh_area} />
          <PreviewField label="PHM Area" value={data.phm_area} />
          <PreviewField
            label="Name of the Field Clinic"
            value={data.field_clinic}
          />
          <PreviewField
            label="Name of the Consultant Obstetrician"
            value={data.consultant_obstetrician}
          />
          <PreviewField
            label="Identified Antenatal Risk Conditions and Morbidities"
            value={data.antenatal_risk_conditions}
          />
          <PreviewField
            label="Preconceptional folic acid"
            value={
              data.preconceptional_folic_acid ? <TickCircle /> : <CloseCircle />
            }
          />
          <PreviewField
            label="History of subfertility"
            value={
              data.history_of_subfertility ? <TickCircle /> : <CloseCircle />
            }
          />
          <PreviewField
            label="History of subfertility"
            value={data.planned_pregnancy ? <TickCircle /> : <CloseCircle />}
          />
        </div>
      </div>
    </div>
  );
};

export default BasicDetailsPreview;
