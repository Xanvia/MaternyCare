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
    mother_weight: "",
    allergies: "",
    moh_area: "",
    phm_area: "",
    field_clinic: "",
    gs_division: "",
    eligible_family_register: "",
    pregnant_mother_register: "",
    hospital_clinic: "",
    consultant_obstetrician: "",
    antenatal_risk_conditions: "",
    risk_type: "",
    registration_no: "",
    registration_date: "",
    consanguinity: false,
    rubella_immunization: false,
    pre_pregnancy_screening: false,
    preconceptional_folic_acid: false,
    history_of_subfertility: false,
    planned_pregnancy: false,
    last_family_planing_method: false,
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
          `${import.meta.env.VITE_API_URL}users/mother/${id}`,
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
          risk_type: response.data.risk_type,
          registration_no: response.data.registration_no || "",
          registration_date: response.data.registration_date || "",
          mother_weight: response.data.mother_weight || "",
          hospital_clinic: response.data.hospital_clinic || "",
          consanguinity: response.data.consanguinity || false,
          rubella_immunization: response.data.rubella_immunization || false,
          pre_pregnancy_screening:
            response.data.pre_pregnancy_screening || false,
          preconceptional_folic_acid:
            response.data.preconceptional_folic_acid || false,
          history_of_subfertility:
            response.data.history_of_subfertility || false,
          planned_pregnancy: response.data.planned_pregnancy || false,
          last_family_planing_method:
            response.data.last_family_planing_method || false,
        });
        console.log("Basic details fetched:", response.data);
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
        `${import.meta.env.VITE_API_URL}users/mother/${id}/basic-details`,
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
          risk_type: formData.risk_type,
          registration_no: formData.registration_no,
          registration_date: formData.registration_date,
          mother_weight: formData.mother_weight,
          hospital_clinic: formData.hospital_clinic,
          consanguinity: formData.consanguinity,
          rubella_immunization: formData.rubella_immunization,
          pre_pregnancy_screening: formData.pre_pregnancy_screening,
          preconceptional_folic_acid: formData.preconceptional_folic_acid,
          history_of_subfertility: formData.history_of_subfertility,
          planned_pregnancy: formData.planned_pregnancy,
          last_family_planing_method: formData.last_family_planing_method,
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
      {loading && "Loading..."}
      <form onSubmit={handleSubmit}>
        {/* <label
          htmlFor="riskType"
          className="block text-sm font-medium text-gray-700 mt-4"
        >
          Risk Type
        </label> */}
        <select
          id="riskType"
          name="risk_type"
          value={formData.risk_type}
          onChange={handleChange}
          className={`mt-1 mb-8  block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm ${
            formData.risk_type === "red"
              ? "bg-red-500"
              : formData.risk_type === "blue"
              ? "bg-blue-500"
              : ""
          }`}
        >
          <option value="">Select Risk Type</option>
          <option value="red">Red</option>
          <option value="blue">Blue</option>
        </select>
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
              htmlFor="mother_height"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              Height(cm)
            </label>
            <input
              type="text"
              id="mother_height"
              name="mother_height"
              value={formData.mother_height}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Height"
            />

            <label
              htmlFor="mother_weight"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              Weight(KG)
            </label>
            <input
              type="text"
              id="mother_weight"
              name="mother_weight"
              value={formData.mother_weight}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Weight"
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
              htmlFor="gs_division"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              Grama Niladhari Division
            </label>
            <input
              type="text"
              id="gs_division"
              name="gs_division"
              value={formData.gs_division}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Grama Niladhari Division"
            />

            <label
              htmlFor="hospital_clinic"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              Name of the Hospital Clinic
            </label>
            <input
              type="text"
              id="hospital_clinic"
              name="hospital_clinic"
              value={formData.hospital_clinic}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Name of the Hospital Clinic"
            />

            <label
              htmlFor="registration_no"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              Registration No
            </label>
            <input
              type="text"
              id="registration_no"
              name="registration_no"
              value={formData.registration_no}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Registration No"
            />

            <label
              htmlFor="registration_date"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              Registration Date
            </label>
            <input
              type="date"
              id="registration_date"
              name="registration_date"
              value={formData.registration_date}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Registration Date"
            />
            <div className="pt-6">
              <div className="flex items-center justify-between h-auto mt-4">
                <label
                  htmlFor="consanguinity"
                  className="block text-sm font-medium text-gray-700 mr-4"
                >
                  Consanguinity
                </label>

                <label className="relative flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="consanguinity"
                    checked={formData.consanguinity}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        consanguinity: e.target.checked,
                      }))
                    }
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-0 rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 hover:peer-checked:bg-indigo-700"></div>
                </label>
              </div>
              <div className="flex items-center justify-between h-auto mt-4 ">
                <label
                  htmlFor="rubella_immunization"
                  className="block text-sm font-medium text-gray-700 mr-4"
                >
                  Rubella Immunization
                </label>

                <label className="relative flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="rubella_immunization"
                    checked={formData.rubella_immunization}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        rubella_immunization: e.target.checked,
                      }))
                    }
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-0 rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 hover:peer-checked:bg-indigo-700"></div>
                </label>
              </div>
              <div className="flex items-center justify-between h-auto mt-4 ">
                <label
                  htmlFor="pre_pregnancy_screening"
                  className="block text-sm font-medium text-gray-700 mr-4"
                >
                  Pre-pregnancy screening done
                </label>

                <label className="relative flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="pre_pregnancy_screening"
                    checked={formData.pre_pregnancy_screening}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        pre_pregnancy_screening: e.target.checked,
                      }))
                    }
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-0 rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 hover:peer-checked:bg-indigo-700"></div>
                </label>
              </div>{" "}
              <div className="flex items-center justify-between h-auto mt-4 ">
                <label
                  htmlFor="preconceptional_folic_acid"
                  className="block text-sm font-medium text-gray-700 mr-4"
                >
                  Preconceptional folic acid
                </label>

                <label className="relative flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="preconceptional_folic_acid"
                    checked={formData.preconceptional_folic_acid}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        preconceptional_folic_acid: e.target.checked,
                      }))
                    }
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-0 rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 hover:peer-checked:bg-indigo-700"></div>
                </label>
              </div>{" "}
              <div className="flex items-center justify-between h-auto mt-4 ">
                <label
                  htmlFor="history_of_subfertility"
                  className="block text-sm font-medium text-gray-700 mr-4"
                >
                  History of Subfertility
                </label>

                <label className="relative flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="history_of_subfertility"
                    checked={formData.history_of_subfertility}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        history_of_subfertility: e.target.checked,
                      }))
                    }
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-0 rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 hover:peer-checked:bg-indigo-700"></div>
                </label>
              </div>{" "}
              <div className="flex items-center justify-between h-auto mt-4 ">
                <label
                  htmlFor="planned_pregnancy"
                  className="block text-sm font-medium text-gray-700 mr-4"
                >
                  Planned pregnancy or not
                </label>

                <label className="relative flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="planned_pregnancy"
                    checked={formData.planned_pregnancy}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        planned_pregnancy: e.target.checked,
                      }))
                    }
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-0 rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 hover:peer-checked:bg-indigo-700"></div>
                </label>
              </div>
              <div className="flex items-center justify-between h-auto mt-4 ">
                <label
                  htmlFor="last_family_planing_method"
                  className="block text-sm font-medium text-gray-700 mr-4"
                >
                  Familiy planning method last used
                </label>

                <label className="relative flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="last_family_planing_method"
                    checked={formData.last_family_planing_method}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        last_family_planing_method: e.target.checked,
                      }))
                    }
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-0 rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 hover:peer-checked:bg-indigo-700"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Side Fields */}
          <div>
            <label
              htmlFor="moh_area"
              className="block text-sm font-medium text-gray-700"
            >
              MOH Area
            </label>
            <input
              type="text"
              id="moh_area"
              name="moh_area"
              value={formData.moh_area}
              onChange={handleChange}
              className="text-sm mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="MOH Area"
            />

            <label
              htmlFor="phm_area"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              PHM area
            </label>
            <input
              type="text"
              id="phm_area"
              name="phm_area"
              value={formData.phm_area}
              onChange={handleChange}
              className="mt-1 block text-sm w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter your PHM area"
            />

            <label
              htmlFor="field_clinic"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              Field Clinic Name
            </label>
            <input
              type="text"
              id="field_clinic"
              name="field_clinic"
              value={formData.field_clinic}
              onChange={handleChange}
              className="mt-1 block text-sm w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter Field Clinic Name"
            />

            <label
              htmlFor="consultant_obstetrician"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              Name of the Consultant Obstetrician
            </label>
            <input
              type="text"
              id="consultant_obstetrician"
              name="consultant_obstetrician"
              value={formData.consultant_obstetrician}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Name of the Consultant Obstetrician"
            />
            <label
              htmlFor="antenatal_risk_conditions"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              Identified Antenatal Risk Conditions & Morbidities
            </label>
            <textarea
              id="antenatal_risk_conditions"
              name="antenatal_risk_conditions"
              value={formData.antenatal_risk_conditions}
              onChange={handleChange}
              className="mt-1 block w-full text-sm px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Risk Conditions"
            />
            <label
              htmlFor="eligible_family_register"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              Eligible Family Register
            </label>
            <input
              type="text"
              id="eligible_family_register"
              name="eligible_family_register"
              value={formData.eligible_family_register}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Eligible Family Register"
            />

            <label
              htmlFor="pregnant_mother_register"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              Pregnant Mother's Register
            </label>
            <input
              type="text"
              id="pregnant_mother_register"
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
