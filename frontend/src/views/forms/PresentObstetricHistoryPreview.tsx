import { useState, useEffect } from "react";
import axios from "axios";
// import { useParams } from "react-router-dosm";
// import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { CloseCircle, TickCircle } from "../../assets/icons/Icons";

interface PresentObstetricHistoryPreviewProps {
  motherId: string;
}

const PresentObstetricHistoryPreview: React.FC<
  PresentObstetricHistoryPreviewProps
> = ({ motherId }) => {
  const [data, setData] = useState({
    gravidity_G: 0,
    gravidity_P: 0,
    gravidity_C: 0,
    age_of_youngest_child: 0,
    LRMP: "",
    EDD: "",
    US_corrected_EDD: "",
    POA_at_dating_scan: "",
    date_of_quickening: "",
    POA_at_registration: "",
    signature: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const token = JSON.parse(localStorage.getItem("token") || '""');

  useEffect(() => {
    const fetchObstetricHistory = async () => {
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
        setError("Failed to load obstetric history");
        console.error("Error fetching obstetric history:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchObstetricHistory();
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
      <h2 className="text-xl font-semibold mb-6">
        Present Obstetric History Preview
      </h2>
      <h2 className="text-xl font-semibold mb-6">වර්තමාන ගර්භ ඉතිහාසය</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div>
          <PreviewField label="Gravidity (G)" value={data.gravidity_G} />
          <PreviewField label="Parity (P)" value={data.gravidity_P} />
          <PreviewField label="Children (C)" value={data.gravidity_C} />
          <PreviewField
            label="Age of youngest child"
            value={data.age_of_youngest_child}
          />
          <PreviewField label="LRMP" value={data.LRMP} />
          <PreviewField
            label="POA at dating scan"
            value={data.POA_at_dating_scan}
          />
          <PreviewField
            label="Date of quickening"
            value={data.date_of_quickening}
          />
        </div>

        {/* Right Column */}
        <div>
          <PreviewField label="Expected delivery date (EDD)" value={data.EDD} />
          <PreviewField
            label="US corrected EDD"
            value={data.US_corrected_EDD}
          />
          <PreviewField
            label="POA at Registration"
            value={data.POA_at_registration}
          />
          <PreviewField
            label="Signature"
            value={
              data.signature ? (
                <img
                  src={data.signature}
                  alt="Signature"
                  className="border border-gray-300 rounded-md"
                />
              ) : (
                "Not specified"
              )
            }
          />
        </div>
      </div>
    </div>
  );
};

export default PresentObstetricHistoryPreview;
