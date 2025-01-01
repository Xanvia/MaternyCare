import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignaturePad from "signature_pad";

const storedToken = localStorage.getItem("token");
const token = storedToken ? JSON.parse(storedToken) : null;

const PresentObstetricHistory = () => {
  const signaturePadRef = useRef<HTMLCanvasElement>(null);

  const clearSignature = () => {
    if (signaturePadRef.current) {
      const signaturePad = new SignaturePad(signaturePadRef.current);
      signaturePad.clear();
    }
  };

  const saveSignature = async () => {
    if (signaturePadRef.current) {
      const signaturePad = new SignaturePad(signaturePadRef.current);
      const dataURL = signaturePad.toDataURL();

      try {
        await axios.put("http://localhost:3000/update-signature", {
          signature: dataURL,
        });
        console.log("Signature saved successfully");
      } catch (error) {
        console.error("Error saving signature:", error);
      }
    }
  };

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
        <h2 className="my-2 font-medium text-lg">Present Obstetric History</h2>
        <h2 className="my-2 font-medium text-lg">වර්තමාන ගර්භ ඉතිහාසය</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Side Fields */}
          <div>
            <label
              htmlFor="bloodtype"
              className="block text-sm font-medium text-gray-700 mt-3"
            >
              Gravidity
            </label>
            <label
              htmlFor="bloodtype"
              className="block text-sm font-medium text-gray-700"
            >
              කීවෙනි ගර්භයද
            </label>
            <div className="flex">
              <input
                type="number"
                id="gravidity_G"
                name="mother_gravidity_G"
                value={formData.mother_gravidity_G}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="G"
              />
              <input
                type="number"
                id="gravidity_P"
                name="mother_gravidity_G"
                value={formData.mother_gravidity_P}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="P"
              />
              <input
                type="number"
                id="gravidity_C"
                name="mother_gravidity_C"
                value={formData.mother_gravidity_C}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="C"
              />
            </div>

            <label
              htmlFor="height"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              <div>Age of youngest child</div>
              <div>බාලම ළමයාගේ වයස</div>
            </label>
            <input
              type="number"
              id="height"
              name="mother_height"
              value={formData.mother_height}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Age"
            />

            <label
              htmlFor="hospitalclinic"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              <div>LRMP</div>
              <div>අන්තිමට ක්‍රමවත්ව ඔසප් වූ දිනය</div>
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
                  POA at dating scan
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
                  Signature
                </label>

                <div className="mt-4">
                  <canvas
                    ref={signaturePadRef}
                    className="border border-gray-300 rounded-md"
                  ></canvas>
                  <div className="mt-2 flex space-x-2">
                    <button
                      type="button"
                      onClick={clearSignature}
                      className="px-4 py-2 bg-red-500 text-white rounded-md"
                    >
                      Clear
                    </button>
                    <button
                      type="button"
                      onClick={saveSignature}
                      className="px-4 py-2 bg-green-500 text-white rounded-md"
                    >
                      Save
                    </button>
                  </div>
                </div>

                {/* <label className="relative flex items-center cursor-pointer">
                  <input type="checkbox" value="" className="sr-only peer" />
                  <div className="w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-0 rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 hover:peer-checked:bg-indigo-700"></div>
                </label> */}
              </div>
            </div>
          </div>

          {/* Right Side Fields */}
          <div>
            <label
              htmlFor="hospitalclinic"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              <div>Expected delivery date (Date of 40 weeks completion)</div>
              <div>බලාපොරොත්තු වන ප්‍රසූත දිනය (සති 40 සම්පූර්ණවන දිනය)</div>
            </label>
            <input
              type="date"
              id="regdate"
              name="regdate"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Registration Date"
            />

            <label
              htmlFor="hospitalclinic"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              <div>US corrected EDD (To be filled by VOG/MO)</div>
              <div>US නිවැරදි කළ බලපොරොත්තු ප්‍රසූත දිනය</div>
            </label>
            <input
              type="date"
              id="regdate"
              name="regdate"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Registration Date"
            />
            <label
              htmlFor="hospitalclinic"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              <div>Date of quickening</div>
              <div>භ්‍රෑණ චලන පළමුවෙන්ම දැණුන දිනය</div>
            </label>
            <input
              type="date"
              id="regdate"
              name="regdate"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Registration Date"
            />
            <label
              htmlFor="poa"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              <div>POA at Registration</div>
              <div>ලියාපදිංචි කරන විට ගර්භයට සති ගණන</div>
            </label>

            <div className="flex gap-4">
              <input
                type="number"
                id="weeks"
                name="weeks"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Weeks"
                min="0"
                // value={formData.weeks} // Bind to weeks in state
                // onChange={handleChange} // Handle changes
              />

              <input
                type="number"
                id="days"
                name="days"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Days"
                min="0"
                max="6" // Maximum 6 days to maintain proper week-day format
                // value={formData.days} // Bind to days in state
                // onChange={handleChange} // Handle changes
              />
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

export default PresentObstetricHistory;
