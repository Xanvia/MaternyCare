import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

interface EmergencyPlanData {
  intented_hospital_delivery: string;
  intented_hospital_emergency: string;
  mode_of_transport_delivery: string;
  mode_of_transport_emergency: string;
  average_cost_delivery: string;
  average_cost_emergency: string;
  distance_from_home_delivery: string;
  distance_from_home_emergency: string;
  time_to_reach_delivery: string;
  time_to_reach_emergency: string;
}

interface EmergencyPlanPreviewProps {
  motherId: string;
}

const EmergencyPlanPreview: React.FC<EmergencyPlanPreviewProps> = ({
  motherId,
}) => {
  const [formData, setFormData] = useState<EmergencyPlanData>({
    intented_hospital_delivery: "",
    intented_hospital_emergency: "",
    mode_of_transport_delivery: "",
    mode_of_transport_emergency: "",
    average_cost_delivery: "",
    average_cost_emergency: "",
    distance_from_home_delivery: "",
    distance_from_home_emergency: "",
    time_to_reach_delivery: "",
    time_to_reach_emergency: "",
  });

  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    const fetchEmergencyDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/mother/${motherId}/emergency-plan/`
        );
        setFormData({
          intented_hospital_delivery:
            response.data.intented_hospital_delivery || "",
          intented_hospital_emergency:
            response.data.intented_hospital_emergency || "",
          mode_of_transport_delivery:
            response.data.mode_of_transport_delivery || "",
          mode_of_transport_emergency:
            response.data.mode_of_transport_emergency || "",
          average_cost_delivery: response.data.average_cost_delivery || "",
          average_cost_emergency: response.data.average_cost_emergency || "",
          distance_from_home_delivery:
            response.data.distance_from_home_delivery || "",
          distance_from_home_emergency:
            response.data.distance_from_home_emergency || "",
          time_to_reach_delivery: response.data.time_to_reach_delivery || "",
          time_to_reach_emergency: response.data.time_to_reach_emergency || "",
        });
      } catch (err) {
        console.error("Error fetching emergency details:", err);
        toast.error(
          "Failed to load emergency plan data. Please refresh the page."
        );
      } finally {
        setIsDataLoading(false);
      }
    };

    fetchEmergencyDetails();
  }, [motherId]);

  if (isDataLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        Loading emergency plan data...
      </div>
    );
  }

  return (
    <div
      id="emergency-details"
      className="max-w-full mx-4 my-4 bg-white shadow-lg rounded-lg p-6 border border-gray-200"
    >
      <ToastContainer />
      <table className="w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">
              Birth and emergency preparedness plan
            </th>
            <th className="px-4 py-2 text-left">Delivery (බිහිවීම)</th>
            <th className="px-4 py-2 text-left">
              In an emergency (හදිසි අවස්ථාවකදී)
            </th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t">
            <td className="px-4 py-2">
              Intended hospital <br /> අදහස් කළ රෝහල
            </td>
            <td className="px-4 py-2">{formData.intented_hospital_delivery}</td>
            <td className="px-4 py-2">
              {formData.intented_hospital_emergency}
            </td>
          </tr>
          <tr className="border-t">
            <td className="px-4 py-2">
              Mode of transport <br /> ප්‍රවාහන ක්‍රමය
            </td>
            <td className="px-4 py-2">{formData.mode_of_transport_delivery}</td>
            <td className="px-4 py-2">
              {formData.mode_of_transport_emergency}
            </td>
          </tr>
          <tr className="border-t">
            <td className="px-4 py-2">
              Average cost <br /> සාමාන්‍ය වියදම
            </td>
            <td className="px-4 py-2">{formData.average_cost_delivery}</td>
            <td className="px-4 py-2">{formData.average_cost_emergency}</td>
          </tr>
          <tr className="border-t">
            <td className="px-4 py-2">
              Distance from home <br /> නිවසේ සිට දුර
            </td>
            <td className="px-4 py-2">
              {formData.distance_from_home_delivery}
            </td>
            <td className="px-4 py-2">
              {formData.distance_from_home_emergency}
            </td>
          </tr>
          <tr className="border-t">
            <td className="px-4 py-2">
              Time taken to reach <br /> ළඟා වීමට ගතවන කාලය
            </td>
            <td className="px-4 py-2">{formData.time_to_reach_delivery}</td>
            <td className="px-4 py-2">{formData.time_to_reach_emergency}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default EmergencyPlanPreview;
