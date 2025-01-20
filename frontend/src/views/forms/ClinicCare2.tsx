import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const storedToken = localStorage.getItem("token");
const token = storedToken ? JSON.parse(storedToken) : null;

const ClinicCare = () => {
  const [formData, setFormData] = useState({
    respiratorySystem: "",
    breastExamination: "",
    otherInvestigations: "",
    antihelminthicDrugs: "",
    dateOfIssuingKickCountChart: "",
    dateOfTakingBloodSampleForHIVScreening: "",
    dateOfResultInformedToMother: "",
  });
  const [loading, setLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/users/mother/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFormData({
          respiratorySystem: response.data.respiratorySystem || "",
          breastExamination: response.data.breastExamination || "",
          otherInvestigations: response.data.otherInvestigations || "",
          antihelminthicDrugs: response.data.antihelminthicDrugs || "",
          dateOfIssuingKickCountChart:
            response.data.dateOfIssuingKickCountChart || "",
          dateOfTakingBloodSampleForHIVScreening:
            response.data.dateOfTakingBloodSampleForHIVScreening || "",
          dateOfResultInformedToMother:
            response.data.dateOfResultInformedToMother || "",
        });
      } catch (err) {
        console.error("Error fetching details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id, token]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      setIsUpdating(true);

      await axios.put(
        `http://localhost:3000/users/mother/${id}/details`,
        {
          respiratorySystem: formData.respiratorySystem,
          breastExamination: formData.breastExamination,
          otherInvestigations: formData.otherInvestigations,
          antihelminthicDrugs: formData.antihelminthicDrugs,
          dateOfIssuingKickCountChart: formData.dateOfIssuingKickCountChart,
          dateOfTakingBloodSampleForHIVScreening:
            formData.dateOfTakingBloodSampleForHIVScreening,
          dateOfResultInformedToMother: formData.dateOfResultInformedToMother,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setIsUpdating(false);
      toast.success("Details updated successfully!");
    } catch (err) {
      console.error("Error updating details:", err);
      toast.error("Update failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="details"
      className="max-w-full mx-4 my-4 bg-white shadow-lg rounded-lg p-6 border border-gray-200"
    >
      <form onSubmit={handleSubmit}>
        <h2 className="my-2 font-medium text-lg">Clinic Care 2</h2>
        <h2 className="my-2 font-medium text-lg">සායනික සංරක්ෂණය 2</h2>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <div>
            <label
              htmlFor="respiratorySystem"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              <div>Respiratory System</div>
              <div>ශ්වසන පද්ධතිය</div>
            </label>
            <textarea
              id="respiratorySystem"
              name="respiratorySystem"
              value={formData.respiratorySystem}
              onChange={handleChange}
              className="mt-1 block w-full px-1 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-xs"
              placeholder="Enter details about the respiratory system"
            />

            <label
              htmlFor="breastExamination"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              <div>Breast Examination</div>
              <div>පියයුරු පරීක්ෂාව</div>
            </label>
            <textarea
              id="breastExamination"
              name="breastExamination"
              value={formData.breastExamination}
              onChange={handleChange}
              className="mt-1 block w-full px-1 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-xs"
              placeholder="Enter details about the breast examination"
            />

            <label
              htmlFor="otherInvestigations"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              <div>Other Investigations</div>
              <div>වෙනත් පරීක්ෂණ</div>
            </label>
            <textarea
              id="otherInvestigations"
              name="otherInvestigations"
              value={formData.otherInvestigations}
              onChange={handleChange}
              className="mt-1 block w-full px-1 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-xs"
              placeholder="Enter details about other investigations"
            />

            <label
              htmlFor="antihelminthicDrugs"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              <div>Antihelminthic Drugs</div>
              <div>පණු ප්‍රතිකාර</div>
            </label>
            <textarea
              id="antihelminthicDrugs"
              name="antihelminthicDrugs"
              value={formData.antihelminthicDrugs}
              onChange={handleChange}
              className="mt-1 block w-full px-1 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-xs"
              placeholder="Enter details about antihelminthic drugs"
            />

            <label
              htmlFor="dateOfIssuingKickCountChart"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              <div>Date of Issuing Kick Count Chart</div>
              <div>භ්‍රෑණ චලන සටහන්පත ලබාදුන් දිනය</div>
            </label>
            <input
              type="date"
              id="dateOfIssuingKickCountChart"
              name="dateOfIssuingKickCountChart"
              value={formData.dateOfIssuingKickCountChart}
              onChange={handleChange}
              className="mt-1 block w-full px-1 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-xs"
            />

            <label
              htmlFor="dateOfTakingBloodSampleForHIVScreening"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              <div>Date of Taking Blood Sample for HIV Screening</div>
              <div>HIV පූර්ව පරීක්ෂාව සඳහා රුධිර සාම්පලය ලබාගත් දිනය</div>
            </label>
            <input
              type="date"
              id="dateOfTakingBloodSampleForHIVScreening"
              name="dateOfTakingBloodSampleForHIVScreening"
              value={formData.dateOfTakingBloodSampleForHIVScreening}
              onChange={handleChange}
              className="mt-1 block w-full px-1 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-xs"
            />

            <label
              htmlFor="dateOfResultInformedToMother"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              <div>Date of Result Informed to Mother</div>
              <div>ප්‍රතිඵලය මවට දැනුම් දුන් දිනය</div>
            </label>
            <input
              type="date"
              id="dateOfResultInformedToMother"
              name="dateOfResultInformedToMother"
              value={formData.dateOfResultInformedToMother}
              onChange={handleChange}
              className="mt-1 block w-full px-1 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-xs"
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            className="w-full md:w-auto px-6 py-2 bg-blue_primary text-white rounded-md shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            {isUpdating ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ClinicCare;