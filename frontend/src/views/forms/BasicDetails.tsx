import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const storedToken = localStorage.getItem("token");
const token = storedToken ? JSON.parse(storedToken) : null;

const BasicDetails = () => {
  const [formData, setFormData] = useState({
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
        <h2 className="my-2 font-medium text-lg">Basic Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Side Fields */}
          <div>
            <label
              htmlFor="bloodtype"
              className="block text-sm font-medium text-gray-700"
            >
              Blood Type
            </label>
            <input
              type="text"
              id="bloodtype"
              name="mother_blood_type"
              value={formData.mother_blood_type}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Blood Type"
            />

            <label
              htmlFor="height"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              Height(cm)
            </label>
            <input
              type="text"
              id="height"
              name="mother_height"
              value={formData.mother_height}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Height"
            />

            <label
              htmlFor="alergies"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              Allergies
            </label>
            <textarea
              id="alergies"
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
              className="mt-1 block w-full text-sm px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Allergies"
            />

            <label
              htmlFor="gsdivision"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              Grama Niladhari Division
            </label>
            <input
              type="text"
              id="gsdivision"
              name="gs_division"
              value={formData.gs_division}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Grama Niladhari Division"
            />

            <label
              htmlFor="hospitalclinic"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              Name of the Hospital Clinic
            </label>
            <input
              type="text"
              id="hospitalclinic"
              name="hospitalclinic"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Name of the Hospital Clinic"
            />

            <label
              htmlFor="hospitalclinic"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              Registration No
            </label>
            <input
              type="text"
              id="regno"
              name="regno"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Registration No"
            />

            <label
              htmlFor="hospitalclinic"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              Registration Date
            </label>
            <input
              type="date"
              id="regdate"
              name="regdate"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Registration Date"
            />
            <div className="pt-6">
              <div className="flex items-center justify-between h-auto mt-4">
                <label
                  htmlFor="hospitalclinic"
                  className="block text-sm font-medium text-gray-700 mr-4"
                >
                  Consanguinity
                </label>

                <label className="relative flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" />
                  <div className="w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-0 rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 hover:peer-checked:bg-indigo-700"></div>
                </label>
              </div>
              <div className="flex items-center justify-between h-auto mt-4 ">
                <label
                  htmlFor="hospitalclinic"
                  className="block text-sm font-medium text-gray-700 mr-4"
                >
                  Rubella Immunization
                </label>

                <label className="relative flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" />
                  <div className="w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-0 rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 hover:peer-checked:bg-indigo-700"></div>
                </label>
              </div>
              <div className="flex items-center justify-between h-auto mt-4 ">
                <label
                  htmlFor="hospitalclinic"
                  className="block text-sm font-medium text-gray-700 mr-4"
                >
                  Pre-pregnancy screening done
                </label>

                <label className="relative flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" />
                  <div className="w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-0 rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 hover:peer-checked:bg-indigo-700"></div>
                </label>
              </div>{" "}
              <div className="flex items-center justify-between h-auto mt-4 ">
                <label
                  htmlFor="hospitalclinic"
                  className="block text-sm font-medium text-gray-700 mr-4"
                >
                  Preconceptional folic acid
                </label>

                <label className="relative flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" />
                  <div className="w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-0 rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 hover:peer-checked:bg-indigo-700"></div>
                </label>
              </div>{" "}
              <div className="flex items-center justify-between h-auto mt-4 ">
                <label
                  htmlFor="hospitalclinic"
                  className="block text-sm font-medium text-gray-700 mr-4"
                >
                  History of Subfertility
                </label>

                <label className="relative flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" />
                  <div className="w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-0 rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 hover:peer-checked:bg-indigo-700"></div>
                </label>
              </div>{" "}
              <div className="flex items-center justify-between h-auto mt-4 ">
                <label
                  htmlFor="hospitalclinic"
                  className="block text-sm font-medium text-gray-700 mr-4"
                >
                  Planned gregnancy or not
                </label>

                <label className="relative flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" />
                  <div className="w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-0 rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 hover:peer-checked:bg-indigo-700"></div>
                </label>
              </div>
              <div className="flex items-center justify-between h-auto mt-4 ">
                <label
                  htmlFor="hospitalclinic"
                  className="block text-sm font-medium text-gray-700 mr-4"
                >
                  Familiy planning method last used
                </label>

                <label className="relative flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" />
                  <div className="w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-0 rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 hover:peer-checked:bg-indigo-700"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Side Fields */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-700"
            >
              MOH Area
            </label>
            <input
              type="text"
              id="moharea"
              name="moh_area"
              value={formData.moh_area}
              onChange={handleChange}
              className="text-sm mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="MOH Area"
            />

            <label
              htmlFor="phmarea"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              PHM area
            </label>
            <input
              type="text"
              id="phmarea"
              name="phm_area"
              value={formData.phm_area}
              onChange={handleChange}
              className="mt-1 block text-sm w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your PHM area"
            />

            <label
              htmlFor="fieldclinic"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              Field Clinic Name
            </label>
            <input
              type="text"
              id="fieldclinic"
              name="field_clinic"
              value={formData.field_clinic}
              onChange={handleChange}
              className="mt-1 block text-sm w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Field Clinic Name"
            />

            <label
              htmlFor="consulatantobstetrician"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              Name of the Consultant Obstetrician
            </label>
            <input
              type="text"
              id="consulatantobstetrician"
              name="consultant_obstetrician"
              value={formData.consultant_obstetrician}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Name of the Consultant Obstetrician"
            />
            <label
              htmlFor="risk"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              Identified Antenatal Risk Conditions & Morbidities
            </label>
            <textarea
              id="risk"
              name="antenatal_risk_conditions"
              value={formData.antenatal_risk_conditions}
              onChange={handleChange}
              className="mt-1 block w-full text-sm px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Risk Conditions"
            />
            <label
              htmlFor="hospitalclinic"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              Eligible Family Register
            </label>
            <input
              type="text"
              id="famregister"
              name="eligible_family_register"
              value={formData.eligible_family_register}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Eligible Family Register"
            />

            <label
              htmlFor="hospitalclinic"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              Pregnant Mother's Register
            </label>
            <input
              type="text"
              id="motherregister"
              name="pregnant_mother_register"
              value={formData.pregnant_mother_register}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Pregnant Mother's Register"
            />
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

export default BasicDetails;
