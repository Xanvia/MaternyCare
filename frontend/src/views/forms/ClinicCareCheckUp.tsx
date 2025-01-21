import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const storedToken = localStorage.getItem("token");
const token = storedToken ? JSON.parse(storedToken) : null;

const ClinicCareCheckUp = () => {
  const [formData, setFormData] = useState({
    Respiratory_system: "",
    Breast_examination: "",
    Other_investigations: "",
    Antihelminthic_drugs: "",
    date_of_issuing_kick_count_chart: "",
    Date_of_taking_blood_sample_for_HIV_screening: "",
    Date_of_result_informed_to_mother: "",
  });
  const [loading, setLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}users/mother/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFormData({
          Respiratory_system: response.data.Respiratory_system || "",
          Breast_examination: response.data.Breast_examination || "",
          Other_investigations: response.data.Other_investigations || "",
          Antihelminthic_drugs: response.data.Antihelminthic_drugs || "",
          date_of_issuing_kick_count_chart:
            response.data.date_of_issuing_kick_count_chart || "",
            Date_of_taking_blood_sample_for_HIV_screening:
            response.data.Date_of_taking_blood_sample_for_HIV_screening || "",
            Date_of_result_informed_to_mother:
            response.data.Date_of_result_informed_to_mother || "",
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
        `${import.meta.env.VITE_API_URL}users/mother/${id}/updateClinicCareCheckUp`,
        {
          Respiratory_system: formData.Respiratory_system,
          Breast_examination: formData.Breast_examination,
          Other_investigations: formData.Other_investigations,
          Antihelminthic_drugs: formData.Antihelminthic_drugs,
          date_of_issuing_kick_count_chart: formData.date_of_issuing_kick_count_chart,
          Date_of_taking_blood_sample_for_HIV_screening:
            formData.Date_of_taking_blood_sample_for_HIV_screening,
            Date_of_result_informed_to_mother: formData.Date_of_result_informed_to_mother,
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
      {loading && "Loading..."}
      <form onSubmit={handleSubmit}>
        <h2 className="my-2 font-medium text-lg">Clinic Care Check-Up</h2>
        <h2 className="my-2 font-medium text-lg">සායනික සංරක්ෂණ පරීක්ෂණ</h2>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <div>
            <label
              htmlFor="Respiratory_system"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              <div>Respiratory System</div>
              <div>ශ්වසන පද්ධතිය</div>
            </label>
            <textarea
              id="Respiratory_system"
              name="Respiratory_system"
              value={formData.Respiratory_system}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Enter details about the respiratory system"
            />

            <label
              htmlFor="Breast_examination"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              <div>Breast Examination</div>
              <div>පියයුරු පරීක්ෂාව</div>
            </label>
            <textarea
              id="Breast_examination"
              name="Breast_examination"
              value={formData.Breast_examination}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Enter details about the breast examination"
            />

            <label
              htmlFor="Other_investigations"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              <div>Other Investigations</div>
              <div>වෙනත් පරීක්ෂණ</div>
            </label>
            <textarea
              id="Other_investigations"
              name="Other_investigations"
              value={formData.Other_investigations}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Enter details about other investigations"
            />

            <label
              htmlFor="Antihelminthic_drugs"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              <div>Antihelminthic Drugs</div>
              <div>පණු ප්‍රතිකාර</div>
            </label>
            <textarea
              id="Antihelminthic_drugs"
              name="Antihelminthic_drugs"
              value={formData.Antihelminthic_drugs}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Enter details about antihelminthic drugs"
            />

            <label
              htmlFor="date_of_issuing_kick_count_chart"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              <div>Date of Issuing Kick Count Chart</div>
              <div>භ්‍රෑණ චලන සටහන්පත ලබාදුන් දිනය</div>
            </label>
            <input
              type="date"
              id="date_of_issuing_kick_count_chart"
              name="date_of_issuing_kick_count_chart"
              value={formData.date_of_issuing_kick_count_chart}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
            />

            <label
              htmlFor="Date_of_taking_blood_sample_for_HIV_screening"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              <div>Date of Taking Blood Sample for HIV Screening</div>
              <div>HIV පූර්ව පරීක්ෂාව සඳහා රුධිර සාම්පලය ලබාගත් දිනය</div>
            </label>
            <input
              type="date"
              id="Date_of_taking_blood_sample_for_HIV_screening"
              name="Date_of_taking_blood_sample_for_HIV_screening"
              value={formData.Date_of_taking_blood_sample_for_HIV_screening}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
            />

            <label
              htmlFor="Date_of_result_informed_to_mother"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              <div>Date of Result Informed to Mother</div>
              <div>ප්‍රතිඵලය මවට දැනුම් දුන් දිනය</div>
            </label>
            <input
              type="date"
              id="Date_of_result_informed_to_mother"
              name="Date_of_result_informed_to_mother"
              value={formData.Date_of_result_informed_to_mother}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
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

export default ClinicCareCheckUp;
