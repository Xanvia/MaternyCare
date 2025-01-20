import { useState, useEffect } from "react";
import axios from "axios";

const BasicDetailsPreview = () => {
  const [data, setData] = useState({
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
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const id = 19; // hard coded
  const token = JSON.parse(localStorage.getItem("token") || '""');

  useEffect(() => {
    const fetchBasicDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.BASE_URL}users/mother/${id}`,
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
  }, [id]);

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

  const PreviewField: React.FC<{ label: string; value: string }> = ({
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
      <h2 className="text-xl font-semibold mb-6">Basic Details Preview</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div>
          <PreviewField label="Mother's Name" value={data.mother_blood_type} />
          <PreviewField label="Height (cm)" value={data.mother_height} />
          <PreviewField label="BMI" value={data.mother_height} />
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
            label="Hospital Clinic"
            value={data.pregnant_mother_register}
          />
          <PreviewField
            label="Pregnant Mother Register"
            value={data.pregnant_mother_register}
          />
        </div>

        {/* Right Column */}
        <div>
          <PreviewField label="Age" value={data.moh_area} />
          <PreviewField label="Weight" value={data.moh_area} />
          <PreviewField label="Blood Group" value={data.mother_blood_type} />
          <PreviewField label="MOH Area" value={data.moh_area} />
          <PreviewField label="PHM Area" value={data.phm_area} />
          <PreviewField label="Field Clinic" value={data.field_clinic} />
          <PreviewField
            label="Consultant Obstetrician"
            value={data.consultant_obstetrician}
          />
          <PreviewField
            label="Antenatal Risk Conditions"
            value={data.antenatal_risk_conditions}
          />
         
        </div>
      </div>
    </div>
  );
};

export default BasicDetailsPreview;
