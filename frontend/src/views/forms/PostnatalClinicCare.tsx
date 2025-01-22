import { useState, useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



const PostnatalClinicCare = () => {
  const { appointmentid } = useParams<{ appointmentid: string }>();
  const BASE_URL = `${import.meta.env.VITE_API_URL}`;
  const storedToken = localStorage.getItem("token");
  const token = storedToken ? JSON.parse(storedToken) : null;
  
    

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
    engagement_of_the_presenting_part: "",
    fm: "",
    fhs: "",
    iron: "",
    folate: "",
    calcium: "",
    vitamin_C: "",
    food_supplementation: "",
    designation: "",
    weight: "",
    
  });
  const [loading, setLoading] = useState(false);
  // const [success, setSuccess] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // const { id } = useParams<{ id: string }>();
  
  // Fetch existing data when component mounts
  useEffect(() => {
    const fetchAppointmentDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${BASE_URL}appointments/${appointmentid}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ); 
        
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
          engagement_of_the_presenting_part: response.data.engagement_of_the_presenting_part || "",
          fm: response.data.fm || "",
          fhs: response.data.fhs || "",
          iron: response.data.iron || "",
          folate: response.data.folate || "",
          calcium: response.data.calcium || "",
          vitamin_C: response.data.vitamin_C || "",
          food_supplementation: response.data.food_supplementation || "",
          designation: response.data.designation || "",
          weight: response.data.weight || "",

          
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

      console.log(`Endpoint: ${BASE_URL}appointments/${appointmentid}`);
      console.log(`data-latest${formData.Date_Of_Visited}`);

      await axios.put(
        `${BASE_URL}appointments/${appointmentid}`,
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
          engagement_of_the_presenting_part: formData.engagement_of_the_presenting_part,
          fm: formData.fm,
          fhs: formData.fhs,
          iron: formData.iron,
          folate: formData.folate,
          calcium: formData.calcium,
          vitamin_C: formData.vitamin_C,
          food_supplementation: formData.food_supplementation,
          designation: formData.designation,
          weight: formData.weight,
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
      {loading && "Loading..."}
      <form onSubmit={handleSubmit}>
        <h2 className="my-2 font-medium text-lg">Post Partum Field Care</h2>
        <h2 className="my-2 font-medium text-lg">පසු ප්‍රසූත ක්ෂේත්ර සංරක්ෂණය</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left Side Fields */}
          <div className="flex flex-col">

              <label
                htmlFor="hospitalclinic"
                className="block text-sm font-medium text-gray-700 mt-4"
              >
                <div>Date of home visit by phm</div>
                <div>පවුල් සෞඛය සේවා නිළධාරිනිය නිවසට පැමිණි දිනය</div>
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

              <div>
              <label
                htmlFor="pallor  "
                className="block text-sm font-medium text-gray-700 mt-4"
                >
                <div>Identified post partum morbidities & actions taken</div>
                <div>හදුනාගත් පසුප්‍රසූත රෝගී තත්ව සහ ගත් පියවර</div>
              </label>

              <textarea
                id="pallor"
                name="pallor"
                value={formData.pallor}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 h-32 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Identified post partum morbidities & actions taken"
              />

              </div >

          </div>
          
          <div className="flex flex-col">

              <label
                htmlFor="hospitalclinic"
                className="block text-sm font-medium text-gray-700 mt-4"
              >
                <div>Date of issuing micronutrients</div>
                <div>ක්ෂුද්‍ර පෝෂක ලබාදුන් දිනය</div>
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
                htmlFor="hospitalclinic"
                className="block text-sm font-medium text-gray-700 mt-4"
              >
                <div>Date for postpartum clinic</div>
                <div>පසු ප්‍රසූත සායන දිනය</div>
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
              
              <div>
              <label
                htmlFor="poa  "
                className="block text-sm font-medium text-gray-700 mt-4"
                >
                <div>Place for postpartum clinic</div>
                <div>පසු ප්‍රසූත සායන ස්ථානය</div>
              </label>
                <input
                  type="text"
                  id="designation"
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Designation"
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

export default PostnatalClinicCare;
