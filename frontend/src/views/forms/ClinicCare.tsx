import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const storedToken = localStorage.getItem("token");
const token = storedToken ? JSON.parse(storedToken) : null;


const ClinicCare = () => {
  const [formData, setFormData] = useState({
    Date_Of_Visited: "",
    POA_weeks: "",
    POV_days:"",
    urine:"",
    sugar:"",
    albumin:"",
    pallor:"",
    ankle:"",
    facial:"",
    blood_pressure : "",
    fundal_height: "",
    foetal_lie: "",
    presentation: "",
    
  });
  const [loading, setLoading] = useState(false);
  // const [success, setSuccess] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // const { id } = useParams<{ id: string }>();
  const { appointmentid } = useParams<{ appointmentid: string }>();
  // Fetch existing data when component mounts
  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/appointments/${appointmentid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ); 
        console.log("sahan"+response.data.Date_Of_Visited);
        setFormData({
          Date_Of_Visited: response.data.Date_Of_Visited || "",
          POA_weeks: response.data.POA_weeks || "",
          POV_days: response.data.POV_days || "",
          urine: response.data.urine || "",
          sugar: response.data.sugar || "",
          albumin: response.data.albumin || "",
          pallor: response.data.pallor || "",
          ankle: response.data.ankle || "",
          facial: response.data.facial || "",
          blood_pressure: response.data.blood_pressure || "",
          fundal_height: response.data.fundal_height || "",
          foetal_lie: response.data.foetal_lie || "",
          presentation: response.data.presentation || "",


          
        });
      } catch (err) {
        console.error("Error fetching basic details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointmentDetails();
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

      console.log(`Endpoint: http://localhost:3000/appointments/${appointmentid}`);
      console.log(`data-latest${formData.Date_Of_Visited}`);

      await axios.put(
        `http://localhost:3000/appointments/${appointmentid}`,
        {
          Date_Of_Visited: formData.Date_Of_Visited,
          POA_weeks: formData.POA_weeks,
          POV_days : formData.POV_days,
          urine : formData.urine,
          sugar : formData.sugar,
          albumin : formData.albumin,
          pallor : formData.pallor,
          ankle : formData.ankle,
          facial : formData.facial,
          blood_pressure : formData.blood_pressure,
          fundal_height : formData.fundal_height,
          foetal_lie : formData.foetal_lie,
          presentation: formData.presentation,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      

      // setSuccess(true);
      setIsUpdating(false);
      toast.success("Clinic Care Details Updated successful!");
      // Clear success message after 3 seconds
      // setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error("Error updating clinic care details:", err);
      toast.error("Update failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      id="appointment-details"
      className="max-w-full mx-4 my-4 bg-white shadow-lg rounded-lg p-6 border border-gray-200"
    >
      <form onSubmit={handleSubmit}>
        <h2 className="my-2 font-medium text-lg">Clinic Care</h2>
        <h2 className="my-2 font-medium text-lg">සායනික සංරක්ෂණය</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Side Fields */}
          <div className="flex flex-col">

              <label
                htmlFor="hospitalclinic"
                className="block text-sm font-medium text-gray-700 mt-4"
              >
                <div>Date of visit</div>
                <div>සායනයට පැමිණි දිනය</div>
              </label>

              <div className="flex">
                <input
                type="date"
                id="Date_Of_Visited"
                name="Date_Of_Visited"
                value = {formData.Date_Of_Visited}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Registration Date"
              />
              </div>

              <label
              htmlFor="poa"
              className="block text-sm font-medium text-gray-700 mt-4"
              >
              <div>POA</div>
              <div>ගර්භයට සති ගණන</div>
              </label>

              <div className="flex">
              
              <input
                  type="number"
                  id="POA_weeks"
                  name="POA_weeks"
                  value={formData.POA_weeks}
                  onChange={handleChange}
                  className="mt-1 block w-full px-1 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-xs"
                  placeholder="Weeks"
                  min="0"
              />
              
              <input
                  type="number"
                  id="POV_days"
                  name="POV_days"
                  value={formData.POV_days}
                  onChange={handleChange}
                  className="mt-1 block w-full px-1 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-xs"
                  placeholder="Days"
                  min="0"
                  max="6" 
              />
              </div>

              <div className="flex flex-row">

                <div>
                <label
                  htmlFor="urine  "
                  className="block text-sm font-medium text-gray-700 mt-4"
                  >
                  <div>Urine</div>
                  <div>මුත්‍රා</div>
                </label>

                <input
                  type="text"
                  id="urine"
                  name="urine"
                  value={formData.urine}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="urine"
                />

                </div>
              
                <div>
                <label
                  htmlFor="sugar  "
                  className="block text-sm font-medium text-gray-700 mt-4"
                  >
                  <div>Sugar</div>
                  <div>සීනි</div>
                </label>

                <input
                  type="text"
                  id="sugar"
                  name="sugar"
                  value={formData.sugar}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="sugar"
                />

                </div>

                <div>
                <label
                  htmlFor="albumin  "
                  className="block text-sm font-medium text-gray-700 mt-4"
                  >
                  <div>Albumin</div>
                  <div>ඇල්බුමින්</div>
                </label>

                <input
                  type="text"
                  id="albumin"
                  name="albumin"
                  value={formData.albumin}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="albumin"
                />

                </div>
              </div>

              <div>
              <label
                htmlFor="pallor  "
                className="block text-sm font-medium text-gray-700 mt-4"
                >
                <div>Pallor</div>
                <div>සුදුමැලි බව</div>
              </label>

              <input
                type="text"
                id="pallor"
                name="pallor"
                value={formData.pallor}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="pallor"
              />

              </div >
      
              <div className="grid grid-cols-2">
                      <div>
                        <label
                          htmlFor="ankle"
                          className="block text-sm font-medium text-gray-700 mt-4"
                          >
                          <div>Ankle Oedema</div>
                          <div>වළලුකර ඉදිමුම</div>
                        </label>

                        <input
                          type="text"
                          id="ankle"
                          name="ankle"
                          onChange={handleChange}
                          value={formData.ankle}
                          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                          placeholder="Ankle"
                        />
                      </div>
                      <div>
                        <label
                          htmlFor="facial"
                          className="block text-sm font-medium text-gray-700 mt-4"
                          >
                          <div>Facial Oedema</div>
                          <div>මුහුණ ඉදිමුම</div>
                        </label>

                        <input
                          type="text"
                          id="facial"
                          name="facial"
                          value={formData.facial}
                          onChange={handleChange}
                          className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                          placeholder="Facial"
                        />
                      </div>
              </div>
              
              <div>
              <label
                htmlFor="poa  "
                className="block text-sm font-medium text-gray-700 mt-4"
                >
                <div>Blood Pressure</div>
                <div>මුත්‍රා</div>
              </label>

              <select
                id="blood_pressure"
                name="blood_pressure"
                value={formData.blood_pressure}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
              >
              <option value="" disabled selected>
                Select Blood Pressure
              </option>
              <option value="50">50</option>
              <option value="60">60</option>
              <option value="70">70</option>
              <option value="80">80</option>
              <option value="90">90</option>
              <option value="100">100</option>
              <option value="110">110</option>
              <option value="120">120</option>
              <option value="130">130</option>
              <option value="140">140</option>
              <option value="150">150</option>
              <option value="160">160</option>

              </select>

              </div>

              <div>
              <label
                htmlFor="fundal_height"
                className="block text-sm font-medium text-gray-700 mt-4"
                >
                <div>Fundal height</div>
                <div>බුධිනයේ උස</div>
              </label>

              <input
                type="text"
                id="fundal_height"
                name="fundal_height"
                value={formData.fundal_height}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Fundal height"
              />

              </div>

              <div>
              <label
                htmlFor="fundal_height"
                className="block text-sm font-medium text-gray-700 mt-4"
                >
                <div>Foetal lie</div>
                <div>භ්‍රෑණයේ ලීලාව</div>
              </label>

              <input
                type="text"
                id="foetal_lie"
                name="foetal_lie"
                value={formData.foetal_lie}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Foetal lie"
              />

              </div>

              <div>
              <label
                htmlFor="presentation"
                className="block text-sm font-medium text-gray-700 mt-4"
                >
                <div>Presentation</div>
                <div>භ්‍රෑණයේ පිහිටීම</div>
              </label>

              <input
                type="text"
                id="presentation"
                name="presentation"
                value={formData.presentation}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Presentation"
              />

              </div>

              <div>
              <label
                htmlFor="poa  "
                className="block text-sm font-medium text-gray-700 mt-4"
                >
                <div>Urine</div>
                <div>මුත්‍රා</div>
              </label>

              <input
                type="text"
                id="bloodtype"
                name="mother_blood_type"
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Blood Type"
              />

              </div>

              <div>
              <label
                htmlFor="poa  "
                className="block text-sm font-medium text-gray-700 mt-4"
                >
                <div>Urine</div>
                <div>මුත්‍රා</div>
              </label>

              <input
                type="text"
                id="bloodtype"
                name="mother_blood_type"
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Blood Type"
              />

              </div>
              <div>
              <label
                htmlFor="poa  "
                className="block text-sm font-medium text-gray-700 mt-4"
                >
                <div>Urine</div>
                <div>මුත්‍රා</div>
              </label>

              <input
                type="text"
                id="bloodtype"
                name="mother_blood_type"
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Blood Type"
              />

              </div>
              <div>
              <label
                htmlFor="poa  "
                className="block text-sm font-medium text-gray-700 mt-4"
                >
                <div>Urine</div>
                <div>මුත්‍රා</div>
              </label>

              <input
                type="text"
                id="bloodtype"
                name="mother_blood_type"
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Blood Type"
              />

              </div>
              <div>
              <label
                htmlFor="poa  "
                className="block text-sm font-medium text-gray-700 mt-4"
                >
                <div>Urine</div>
                <div>මුත්‍රා</div>
              </label>

              <input
                type="text"
                id="bloodtype"
                name="mother_blood_type"
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Blood Type"
              />

              </div>
              <div>
              <label
                htmlFor="poa  "
                className="block text-sm font-medium text-gray-700 mt-4"
                >
                <div>Urine</div>
                <div>මුත්‍රා</div>
              </label>

              <input
                type="text"
                id="bloodtype"
                name="mother_blood_type"
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Blood Type"
              />

              </div>
              <div>
              <label
                htmlFor="poa  "
                className="block text-sm font-medium text-gray-700 mt-4"
                >
                <div>Urine</div>
                <div>මුත්‍රා</div>
              </label>

              <input
                type="text"
                id="bloodtype"
                name="mother_blood_type"
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Blood Type"
              />

              </div>
              <div>
              <label
                htmlFor="poa  "
                className="block text-sm font-medium text-gray-700 mt-4"
                >
                <div>Urine</div>
                <div>මුත්‍රා</div>
              </label>

              <input
                type="text"
                id="bloodtype"
                name="mother_blood_type"
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Blood Type"
              />

              </div>
              <div>
              <label
                htmlFor="poa  "
                className="block text-sm font-medium text-gray-700 mt-4"
                >
                <div>Urine</div>
                <div>මුත්‍රා</div>
              </label>

              <input
                type="text"
                id="bloodtype"
                name="mother_blood_type"
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Blood Type"
              />

              </div>
              <div>
              <label
                htmlFor="poa  "
                className="block text-sm font-medium text-gray-700 mt-4"
                >
                <div>Urine</div>
                <div>මුත්‍රා</div>
              </label>

              <input
                type="text"
                id="bloodtype"
                name="mother_blood_type"
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Blood Type"
              />

              </div>
              <div>
              <label
                htmlFor="poa  "
                className="block text-sm font-medium text-gray-700 mt-4"
                >
                <div>Urine</div>
                <div>මුත්‍රා</div>
              </label>

              <input
                type="text"
                id="bloodtype"
                name="mother_blood_type"
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Blood Type"
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

export default ClinicCare;
