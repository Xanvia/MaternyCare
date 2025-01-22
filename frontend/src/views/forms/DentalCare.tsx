import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DentalCare = () => {
  const { id } = useParams<{ id: string }>();
  const [isUpdating, setIsUpdating] = useState(false);

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
          referred_date: response.data.referred_date || "",
          examination_date: response.data.examination_date || "",
          treatment: response.data.treatment || "",
        });
      } catch (error) {
        console.error("Error fetching dental care data:", error);
        toast.error("Failed to load dental care data");
      }
    };

    fetchDentalCare();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  // Function to update the form data
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);

    const storedToken = localStorage.getItem("token");
    const token = storedToken ? JSON.parse(storedToken) : null;

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}users/mother/${id}/dental-care`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Dental Care details updated successfully!");
    } catch (error) {
      console.error("Error updating dental care details:", error);
      toast.error("Failed to update dental care details");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="max-w-full mx-4 my-4 bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <form onSubmit={handleSubmit}>
        <h2 className="text-xl font-semibold mb-6">Dental Care</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="referred_date" className="block text-sm font-medium text-gray-700 mb-1">
              Referred Date
            </label>
            <input
              type="date"
              id="referred_date"
              name="referred_date"
              value={formData.referred_date}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />

            <label htmlFor="examination_date" className="block text-sm font-medium text-gray-700 mt-4 mb-1">
              Examination Date
            </label>
            <input
              type="date"
              id="examination_date"
              name="examination_date"
              value={formData.examination_date}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label htmlFor="treatment" className="block text-sm font-medium text-gray-700 mb-1">
              Treatment
            </label>
            <textarea
              id="treatment"
              name="treatment"
              value={formData.treatment}
              onChange={handleChange}
              rows={4}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <div className="mt-6">
          <button
            type="submit"
            disabled={isUpdating}
            className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
          >
            {isUpdating ? "Updating..." : "Update Dental Care"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DentalCare;