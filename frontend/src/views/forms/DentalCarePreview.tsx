import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DentalCarePreview = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState({
    referred_date: "",
    examination_date: "",
    treatment: "",
  });

  // Fetch existing dental care data
  useEffect(() => {
    const fetchDentalCare = async () => {
      const storedToken = localStorage.getItem("token");
      const token = storedToken ? JSON.parse(storedToken) : null;

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}users/mother/${id}/dental-care`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setFormData({
          referred_date: response.data.referred_date || "N/A",
          examination_date: response.data.examination_date || "N/A",
          treatment: response.data.treatment || "N/A",
        });
      } catch (error) {
        console.error("Error fetching dental care data:", error);
        toast.error("Failed to load dental care data");
      }
    };

    fetchDentalCare();
  }, [id]);

  return (
    <div className="max-w-full mx-4 my-4 bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <h2 className="text-xl font-semibold mb-6">Dental Care - Preview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Referred Date
          </label>
          <p className="mt-1 px-4 py-2 border border-gray-300 rounded-md bg-gray-100">
            {formData.referred_date}
          </p>

          <label className="block text-sm font-medium text-gray-700 mt-4 mb-1">
            Examination Date
          </label>
          <p className="mt-1 px-4 py-2 border border-gray-300 rounded-md bg-gray-100">
            {formData.examination_date}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Treatment
          </label>
          <p className="mt-1 px-4 py-2 border border-gray-300 rounded-md bg-gray-100 whitespace-pre-wrap">
            {formData.treatment}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DentalCarePreview;
