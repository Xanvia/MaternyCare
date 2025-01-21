import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

interface CounselingFormData {
  date_of_counseling: string;
  chosen_method: string;
  reason_for_not_using_method: string;
  consent_form_signed_date: string;
}

interface FamilyPlanningProps {
  motherId: string;
}

const FamilyPlanning: React.FC<FamilyPlanningProps> = ({ motherId }) => {
  const [formData, setFormData] = useState<CounselingFormData>({
    date_of_counseling: "",
    chosen_method: "",
    reason_for_not_using_method: "",
    consent_form_signed_date: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    const fetchCounselingDetails = async () => {
      try {
        console.log("Fetching data for motherId:", motherId); // Log the motherId
        const response = await axios.get(
          `http://localhost:3000/mother/${motherId}/counseling-form/`
        );
        console.log("Raw response:", response);
        console.log("Response data:", response.data);

        // Log before setting state
        console.log("Setting form data with:", {
          date_of_counseling: response.data.date_of_counseling || "",
          chosen_method: response.data.chosen_method || "",
          reason_for_not_using_method:
            response.data.reason_for_not_using_method || "",
          consent_form_signed_date:
            response.data.consent_form_signed_date || "",
        });

        setFormData({
          date_of_counseling:
            response.data.counselingDetails.date_of_counseling || "",
          chosen_method: response.data.counselingDetails.chosen_method || "",
          reason_for_not_using_method:
            response.data.counselingDetails.reason_for_not_using_method || "",
          consent_form_signed_date:
            response.data.counselingDetails.consent_form_signed_date || "",
        });

        // Log after setting state
        console.log("Form data after setting:", formData);
      } catch (err) {
        console.error("Error fetching counseling details:", err);
        if (axios.isAxiosError(err)) {
          console.error("Status:", err.response?.status);
          console.error("Response data:", err.response?.data);
        }
        toast.error(
          "Failed to load counseling form data. Please refresh the page."
        );
      } finally {
        setIsDataLoading(false);
      }
    };

    if (motherId) {
      // Only fetch if motherId exists
      fetchCounselingDetails();
    }
  }, [motherId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const updatedFormData = { ...formData, motherId };
      console.log("Posting data: ", updatedFormData);
      await axios.put(
        `http://localhost:3000/users/mother/update-counseling-form`,
        updatedFormData
      );

      toast.success("Counseling Details Updated successfully!");
    } catch (err) {
      console.error("Error updating counseling details:", err);
      toast.error("Update failed!");
    } finally {
      setIsLoading(false);
    }
  };

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
      {/* <ToastContainer /> */}
      <form onSubmit={handleSubmit}>
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
              <td className="px-4 py-2">
                <input
                  type="date"
                  name="date_of_counseling"
                  className="w-full p-2 border rounded"
                  value={formData.date_of_counseling}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">
                Chosen Method (T,PL,L,IP,N,P,C)
                <br />
                තෝරාගත් ක්‍රමය
              </td>
              <td className="px-4 py-2">
                <input
                  type="text"
                  name="chosen_method"
                  className="w-full p-2 border rounded"
                  value={formData.chosen_method}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">
                Reason for Not Using a Method
                <br />
                ක්‍රමයක් භාවිතා නොකිරීමට හේතුව
              </td>
              <td className="px-4 py-2">
                <input
                  type="text"
                  name="reason_for_not_using_method"
                  className="w-full p-2 border rounded"
                  value={formData.reason_for_not_using_method}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">
                Consent Form Signed Date
                <br />
                අනුමැතිය පත්‍රය අත්සන් කළ දිනය
              </td>
              <td className="px-4 py-2">
                <input
                  type="date"
                  name="consent_form_signed_date"
                  className="w-full p-2 border rounded"
                  value={formData.consent_form_signed_date}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-end mt-4 px-4 py-2">
          <button
            type="submit"
            disabled={isLoading}
            className="bg-blue_primary hover:bg-blue_secondary text-white px-4 py-2 rounded"
          >
            {isLoading ? "Updating..." : "Update Form"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FamilyPlanning;
