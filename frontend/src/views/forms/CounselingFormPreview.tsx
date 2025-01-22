import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

interface CounselingFormData {
  date_of_counseling: string;
  chosen_method: string;
  reason_for_not_using_method: string;
  consent_form_signed_date: string;
}

interface FamilyPlanningPreviewProps {
  motherId: string;
}

const FamilyPlanningPreview: React.FC<FamilyPlanningPreviewProps> = ({
  motherId,
}) => {
  const [formData, setFormData] = useState<CounselingFormData>({
    date_of_counseling: "",
    chosen_method: "",
    reason_for_not_using_method: "",
    consent_form_signed_date: "",
  });

  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    const fetchCounselingDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/mother/${motherId}/counseling-form/`
        );
        setFormData({
          date_of_counseling:
            response.data.counselingDetails.date_of_counseling || "",
          chosen_method: response.data.counselingDetails.chosen_method || "",
          reason_for_not_using_method:
            response.data.counselingDetails.reason_for_not_using_method || "",
          consent_form_signed_date:
            response.data.counselingDetails.consent_form_signed_date || "",
        });
      } catch (err) {
        console.error("Error fetching counseling details:", err);
        toast.error(
          "Failed to load counseling form data. Please refresh the page."
        );
      } finally {
        setIsDataLoading(false);
      }
    };

    if (motherId) {
      fetchCounselingDetails();
    }
  }, [motherId]);

  if (isDataLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        Loading counseling form data...
      </div>
    );
  }

  return (
    <div
      id="counseling-details"
      className="max-w-full mx-4 my-4 bg-white shadow-lg rounded-lg p-6 border border-gray-200"
    >
      <ToastContainer />
      <table className="w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Counseling Form</th>
            <th className="px-4 py-2 text-left">Details</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t">
            <td className="px-4 py-2">
              Date of Counseling
              <br />
              උපදේශන දිනය
            </td>
            <td className="px-4 py-2">{formData.date_of_counseling}</td>
          </tr>
          <tr className="border-t">
            <td className="px-4 py-2">
              Chosen Method (T,PL,L,IP,N,P,C)
              <br />
              තෝරාගත් ක්‍රමය
            </td>
            <td className="px-4 py-2">{formData.chosen_method}</td>
          </tr>
          <tr className="border-t">
            <td className="px-4 py-2">
              Reason for Not Using a Method
              <br />
              ක්‍රමයක් භාවිතා නොකිරීමට හේතුව
            </td>
            <td className="px-4 py-2">
              {formData.reason_for_not_using_method}
            </td>
          </tr>
          <tr className="border-t">
            <td className="px-4 py-2">
              Consent Form Signed Date
              <br />
              අනුමැතිය පත්‍රය අත්සන් කළ දිනය
            </td>
            <td className="px-4 py-2">{formData.consent_form_signed_date}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default FamilyPlanningPreview;
