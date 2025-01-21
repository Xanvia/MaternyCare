import React, { useState, useEffect } from "react";
import Button from "@mui/joy/Button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

// const storedToken = localStorage.getItem("token");
// const token = storedToken ? JSON.parse(storedToken) : null;

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

interface EmergencyPlanTableProps {
  motherId: string;
}

const EmergencyPlanTable: React.FC<EmergencyPlanTableProps> = ({
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

  const [isLoading, setIsLoading] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);

  useEffect(() => {
    const fetchEmergencyDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/mother/${motherId}/emergency-plan/`
          // {
          //   headers: {
          //     Authorization: `Bearer ${token}`,
          //   },
          // }
        ); // Adjust endpoint as needed
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
        `http://localhost:3000/users/mother/update-emergency-plan`,
        updatedFormData
        // {
        //   headers: {
        //     Authorization: `Bearer ${token}`,
        //   },
        // }
      );

      toast.success("Emergency Details Updated successfully!");
    } catch (err) {
      console.error("Error updating emergency details:", err);
      toast.error("Update failed!");
    } finally {
      setIsLoading(false);
    }
  };

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
      <form onSubmit={handleSubmit}>
        <table className="w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">
                Birth and emergency preparedness plan
              </th>
              <th className="px-4 py-2 text-left">Delivery</th>
              <th className="px-4 py-2 text-left">In an emergency</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-t">
              <td className="px-4 py-2">Intended hospital</td>
              <td className="px-4 py-2">
                <input
                  type="text"
                  name="intented_hospital_delivery"
                  className="w-full p-2 border rounded"
                  value={formData.intented_hospital_delivery}
                  onChange={handleChange}
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="text"
                  name="intented_hospital_emergency"
                  className="w-full p-2 border rounded"
                  value={formData.intented_hospital_emergency}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">Mode of transport</td>
              <td className="px-4 py-2">
                <input
                  type="text"
                  name="mode_of_transport_delivery"
                  className="w-full p-2 border rounded"
                  value={formData.mode_of_transport_delivery}
                  onChange={handleChange}
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="text"
                  name="mode_of_transport_emergency"
                  className="w-full p-2 border rounded"
                  value={formData.mode_of_transport_emergency}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">Average cost</td>
              <td className="px-4 py-2">
                <input
                  type="text"
                  name="average_cost_delivery"
                  className="w-full p-2 border rounded"
                  value={formData.average_cost_delivery}
                  onChange={handleChange}
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="text"
                  name="average_cost_emergency"
                  className="w-full p-2 border rounded"
                  value={formData.average_cost_emergency}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">Distance from home</td>
              <td className="px-4 py-2">
                <input
                  type="text"
                  name="distance_from_home_delivery"
                  className="w-full p-2 border rounded"
                  value={formData.distance_from_home_delivery}
                  onChange={handleChange}
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="text"
                  name="distance_from_home_emergency"
                  className="w-full p-2 border rounded"
                  value={formData.distance_from_home_emergency}
                  onChange={handleChange}
                />
              </td>
            </tr>
            <tr className="border-t">
              <td className="px-4 py-2">Time taken to reach</td>
              <td className="px-4 py-2">
                <input
                  type="text"
                  name="time_to_reach_delivery"
                  className="w-full p-2 border rounded"
                  value={formData.time_to_reach_delivery}
                  onChange={handleChange}
                />
              </td>
              <td className="px-4 py-2">
                <input
                  type="text"
                  name="time_to_reach_emergency"
                  className="w-full p-2 border rounded"
                  value={formData.time_to_reach_emergency}
                  onChange={handleChange}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className="flex justify-end mt-4 px-4 py-2">
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
          >
            {isLoading ? "Updating..." : "Update Plan"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EmergencyPlanTable;
