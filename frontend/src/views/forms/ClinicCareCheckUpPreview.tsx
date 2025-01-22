import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ClinicCareCheckUpPreview = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState({
    Respiratory_system: "N/A",
    Breast_examination: "N/A",
    Other_investigations: "N/A",
    Antihelminthic_drugs: "N/A",
    date_of_issuing_kick_count_chart: "N/A",
    Date_of_taking_blood_sample_for_HIV_screening: "N/A",
    Date_of_result_informed_to_mother: "N/A",
  });

  // Fetch existing clinic care data
  useEffect(() => {
    const fetchDetails = async () => {
      const storedToken = localStorage.getItem("token");
      const token = storedToken ? JSON.parse(storedToken) : null;

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}users/mother/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setFormData({
          Respiratory_system: response.data.Respiratory_system || "N/A",
          Breast_examination: response.data.Breast_examination || "N/A",
          Other_investigations: response.data.Other_investigations || "N/A",
          Antihelminthic_drugs: response.data.Antihelminthic_drugs || "N/A",
          date_of_issuing_kick_count_chart:
            response.data.date_of_issuing_kick_count_chart || "N/A",
          Date_of_taking_blood_sample_for_HIV_screening:
            response.data.Date_of_taking_blood_sample_for_HIV_screening || "N/A",
          Date_of_result_informed_to_mother:
            response.data.Date_of_result_informed_to_mother || "N/A",
        });
      } catch (err) {
        console.error("Error fetching details:", err);
        toast.error("Failed to load clinic care data");
      }
    };

    fetchDetails();
  }, [id]);

  return (
    <div className="max-w-full mx-4 my-4 bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <h2 className="my-2 font-medium text-lg">Clinic Care Check-Up - Preview</h2>
      <h2 className="my-2 font-medium text-lg">සායනික සංරක්ෂණ පරීක්ෂණ</h2>
      <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mt-4">
            <div>Respiratory System</div>
            <div>ශ්වසන පද්ධතිය</div>
          </label>
          <p className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100">
            {formData.Respiratory_system}
          </p>

          <label className="block text-sm font-medium text-gray-700 mt-4">
            <div>Breast Examination</div>
            <div>පියයුරු පරීක්ෂාව</div>
          </label>
          <p className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100">
            {formData.Breast_examination}
          </p>

          <label className="block text-sm font-medium text-gray-700 mt-4">
            <div>Other Investigations</div>
            <div>වෙනත් පරීක්ෂණ</div>
          </label>
          <p className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100">
            {formData.Other_investigations}
          </p>

          <label className="block text-sm font-medium text-gray-700 mt-4">
            <div>Antihelminthic Drugs</div>
            <div>පණු ප්‍රතිකාර</div>
          </label>
          <p className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100">
            {formData.Antihelminthic_drugs}
          </p>

          <label className="block text-sm font-medium text-gray-700 mt-4">
            <div>Date of Issuing Kick Count Chart</div>
            <div>භ්‍රෑණ චලන සටහන්පත ලබාදුන් දිනය</div>
          </label>
          <p className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100">
            {formData.date_of_issuing_kick_count_chart}
          </p>

          <label className="block text-sm font-medium text-gray-700 mt-4">
            <div>Date of Taking Blood Sample for HIV Screening</div>
            <div>HIV පූර්ව පරීක්ෂාව සඳහා රුධිර සාම්පලය ලබාගත් දිනය</div>
          </label>
          <p className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100">
            {formData.Date_of_taking_blood_sample_for_HIV_screening}
          </p>

          <label className="block text-sm font-medium text-gray-700 mt-4">
            <div>Date of Result Informed to Mother</div>
            <div>ප්‍රතිඵලය මවට දැනුම් දුන් දිනය</div>
          </label>
          <p className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-100">
            {formData.Date_of_result_informed_to_mother}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ClinicCareCheckUpPreview;
