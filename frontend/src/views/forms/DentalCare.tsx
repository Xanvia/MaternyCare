import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const storedToken = localStorage.getItem("token");
const token = storedToken ? JSON.parse(storedToken) : null;

const DentalCare = () => {
  const [formData, setFormData] = useState({
    referredDate: "",
    dateOfExamination: "",
    treatment: "",
    sign: "",
  });
  const [loading, setLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchDetails = async () => {
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
        setFormData({
          referredDate: response.data.referredDate || "",
          dateOfExamination: response.data.dateOfExamination || "",
          treatment: response.data.treatment || "",
          sign: response.data.sign || "",
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
        `${process.env.BASE_URL}users/mother/${id}/dental-care`,
        {
          referredDate: formData.referredDate,
          dateOfExamination: formData.dateOfExamination,
          treatment: formData.treatment,
          sign: formData.sign,
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
      id="dental-care"
      className="max-w-full mx-4 my-4 bg-white shadow-lg rounded-lg p-6 border border-gray-200"
    >
      <form onSubmit={handleSubmit}>
        <h2 className="my-2 font-medium text-lg">Dental Care</h2>
        <h2 className="my-2 font-medium text-lg">දන්ත සංරක්ෂණය</h2>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <div>
            <label
              htmlFor="referredDate"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              <div>Referred Date</div>
              <div>යොමුකළ දිනය</div>
            </label>
            <input
              type="date"
              id="referredDate"
              name="referredDate"
              value={formData.referredDate}
              onChange={handleChange}
              className="mt-1 block w-full px-1 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-xs"
            />

            <label
              htmlFor="dateOfExamination"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              <div>Date of Examination</div>
              <div>පරීක්ෂා කළ දිනය</div>
            </label>
            <input
              type="date"
              id="dateOfExamination"
              name="dateOfExamination"
              value={formData.dateOfExamination}
              onChange={handleChange}
              className="mt-1 block w-full px-1 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-xs"
            />

            <label
              htmlFor="treatment"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              <div>Treatment</div>
              <div>ප්‍රතිකාර</div>
            </label>
            <textarea
              id="treatment"
              name="treatment"
              value={formData.treatment}
              onChange={handleChange}
              className="mt-1 block w-full px-1 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-xs"
              placeholder="Enter details about the treatment"
            />

            <label
              htmlFor="sign"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              <div>Sign</div>
              <div>අත්සන</div>
            </label>
            <textarea
              id="sign"
              name="sign"
              value={formData.sign}
              onChange={handleChange}
              className="mt-1 block w-full px-1 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-xs"
              placeholder="Enter sign"
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

export default DentalCare;