import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const storedToken = localStorage.getItem("token");
const token = storedToken ? JSON.parse(storedToken) : null;

const ClinicCare = () => {
  const [formData, setFormData] = useState({
    mother_gravidity_G: "",
    mother_gravidity_P: "",
    mother_gravidity_C: "",
    mother_blood_type: "",
    mother_height: "",
    allergies: "",
    moh_area: "",
    phm_area: "",
    field_clinic: "",
    consultant_obstetrician: "",
    antenatal_risk_conditions: "",
    eligible_family_register: "",
    pregnant_mother_register: "",
    gs_division: "",
  });
  const [loading, setLoading] = useState(false);
  // const [success, setSuccess] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const { id } = useParams<{ id: string }>();
  // Fetch existing data when component mounts
  useEffect(() => {
    const fetchBasicDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/users/mother/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ); // Adjust endpoint as needed
        setFormData({
          mother_gravidity_G: response.data.mother_gravidity_G || "",
          mother_gravidity_P: response.data.mother_gravidity_P || "",
          mother_gravidity_C: response.data.mother_gravidity_C || "", 
          mother_blood_type: response.data.mother_blood_type || "",
          mother_height: response.data.mother_height || "",
          allergies: response.data.allergies || "",
          moh_area: response.data.moh_area || "",
          phm_area: response.data.phm_area || "",
          field_clinic: response.data.field_clinic || "",
          consultant_obstetrician: response.data.consultant_obstetrician || "",
          antenatal_risk_conditions:
            response.data.antenatal_risk_conditions || "",
          eligible_family_register:
            response.data.eligible_family_register || "",
          pregnant_mother_register:
            response.data.pregnant_mother_register || "",
          gs_division: response.data.gs_division || "",
        });
      } catch (err) {
        console.error("Error fetching basic details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBasicDetails();
  }, []);

  // Handle input changes
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      // setSuccess(false);
      setIsUpdating(true);

      console.log("id from form ", id);

      await axios.put(
        `http://localhost:3000/users/mother/${id}/basic-details`,
        {
          mother_blood_type: formData.mother_blood_type,
          mother_height: formData.mother_height,
          allergies: formData.allergies,
          moh_area: formData.moh_area,
          phm_area: formData.phm_area,
          field_clinic: formData.field_clinic,
          consultant_obstetrician: formData.consultant_obstetrician,
          antenatal_risk_conditions: formData.antenatal_risk_conditions,
          eligible_family_register: formData.eligible_family_register,
          pregnant_mother_register: formData.pregnant_mother_register,
          gs_division: formData.gs_division,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // setSuccess(true);
      setIsUpdating(false);
      toast.success("Basic Detials Updated successful!");
      // Clear success message after 3 seconds
      // setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Error updating basic details:", err);
      toast.error("Update failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="basic-details"
      className="max-w-full mx-4 my-4 bg-white shadow-lg rounded-lg p-6 border border-gray-200"
    >
      <form onSubmit={handleSubmit}>
        <h2 className="my-2 font-medium text-lg">Clinic Care</h2>
        <h2 className="my-2 font-medium text-lg">සායනික සංරක්ෂණය</h2>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          {/* Left Side Fields */}
          <div>
          <label
              htmlFor="hospitalclinic"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              <div>Date of visit</div>
              <div>සායනයට පැමිණි දිනය</div>
            </label>
            <div className="flex ">
            <input
              type="date"
              id="regdate"
              name="regdate"
              onChange={handleChange}
              className="mt-1 block w-full px-1 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-xs"
              placeholder="Registration Date"
            />
            <input
              type="date"
              id="regdate"
              name="regdate"
              onChange={handleChange}
              className="mt-1 block w-full px-1 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-xs"
              placeholder="Registration Date"
            />
            <input
              type="date"
              id="regdate"
              name="regdate"
              onChange={handleChange}
              className="mt-1 block w-full px-1 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-xs"
              placeholder="Registration Date"
            />
            <input
              type="date"
              id="regdate"
              name="regdate"
              onChange={handleChange}
              className="mt-1 block w-full px-1 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-xs"
              placeholder="Registration Date"
            />
            <input
              type="date"
              id="regdate"
              name="regdate"
              onChange={handleChange}
              className="mt-1 block w-full px-1 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-xs"
              placeholder="Registration Date"
            />
            <input
              type="date"
              id="regdate"
              name="regdate"
              onChange={handleChange}
              className="mt-1 block w-full px-1 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-xs"
              placeholder="Registration Date"
            />
            <input
              type="date"
              id="regdate"
              name="regdate"
              onChange={handleChange}
              className="mt-1 block w-full px-1 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-xs"
              placeholder="Registration Date"
            />
            <input
              type="date"
              id="regdate"
              name="regdate"
              onChange={handleChange}
              className="mt-1 block w-full px-1 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-xs"
              placeholder="Registration Date"
            />
            <input
              type="date"
              id="regdate"
              name="regdate"
              onChange={handleChange}
              className="mt-1 block w-full px-1 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-xs"
              placeholder="Registration Date"
            />
            <input
              type="date"
              id="regdate"
              name="regdate"
              onChange={handleChange}
              className="mt-1 block w-full px-1 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-xs"
              placeholder="Registration Date"
            />
            
            </div>

            <label
            htmlFor="poa"
            className="block text-sm font-medium text-gray-700 mt-4"
            >
            <div>POA at Registration</div>
            <div>ලියාපදිංචි කරන විට ගර්භයට සති ගණන</div>
            </label>

            <div className="flex">
            <div className="flex flex-col gap-1">
            <input
                type="number"
                id="weeks"
                name="weeks"
                className="mt-1 block w-full px-1 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-xs"
                placeholder="Weeks"
                min="0"
                // value={formData.weeks} // Bind to weeks in state
                // onChange={handleChange} // Handle changes
            />
            
            <input
                type="number"
                id="days"
                name="days"
                className="mt-1 block w-full px-1 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-xs"
                placeholder="Days"
                min="0"
                max="6" // Maximum 6 days to maintain proper week-day format
                // value={formData.days} // Bind to days in state
                // onChange={handleChange} // Handle changes
            />
            </div>
            <div className="flex flex-col gap-1">
            <input
                type="number"
                id="weeks"
                name="weeks"
                className="mt-1 block w-full px-1 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-xs"
                placeholder="Weeks"
                min="0"
                // value={formData.weeks} // Bind to weeks in state
                // onChange={handleChange} // Handle changes
            />
            
            <input
                type="number"
                id="days"
                name="days"
                className="mt-1 block w-full px-1 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-xs"
                placeholder="Days"
                min="0"
                max="6" // Maximum 6 days to maintain proper week-day format
                // value={formData.days} // Bind to days in state
                // onChange={handleChange} // Handle changes
            />
            </div>

            </div>

            
            
          </div>
        </div>

        {/* Update Button */}
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
