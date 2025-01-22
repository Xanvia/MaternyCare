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
    date_of_phm_home_visit: "",
    date_of_issuing_micronutrients: "",
    identified_post_partum_morbidities:"",
    
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
          date_of_phm_home_visit: response.data.date_of_phm_home_visit || "",
          date_of_issuing_micronutrients: response.data.date_of_issuing_micronutrients || "",
          identified_post_partum_morbidities: response.data.identified_post_partum_morbidities || "",

          
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
      // console.log(`data-latest${formData.Date_Of_Visited}`);

      await axios.put(
        `${BASE_URL}appointments/${appointmentid}`,
        {
          date_of_phm_home_visit: formData.date_of_phm_home_visit,
          date_of_issuing_micronutrients: formData.date_of_issuing_micronutrients,
          identified_post_partum_morbidities : formData.identified_post_partum_morbidities,
          
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
                id="date_of_phm_home_visit"
                name="date_of_phm_home_visit"
                value = {formData.date_of_phm_home_visit}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="PHM home visit Date"
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
                id="identified_post_partum_morbidities"
                name="identified_post_partum_morbidities"
                value={formData.identified_post_partum_morbidities}
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
                id="date_of_issuing_micronutrients"
                name="date_of_issuing_micronutrients"
                value = {formData.date_of_issuing_micronutrients}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Date of issuing micronutrients"
              />
              </div>

              {/* <label
                htmlFor="hospitalclinic"
                className="block text-sm font-medium text-gray-700 mt-4"
              >
                <div>Date for postpartum clinic</div>
                <div>පසු ප්‍රසූත සායන දිනය</div>
              </label> */}

              {/* <div className="flex">
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
              

              </div> */}
          
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
