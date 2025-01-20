import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignaturePad from "signature_pad";

const storedToken = localStorage.getItem("token");
const token = storedToken ? JSON.parse(storedToken) : null;


const ClinicCare = () => {
  const signaturePadRef = useRef<HTMLCanvasElement>(null);
  const padInstance = useRef<SignaturePad | null>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const { appointmentid } = useParams<{ appointmentid: string }>();

  useEffect(() => {
      if (signaturePadRef.current) {
        // Set canvas dimensions
        const canvas = signaturePadRef.current;
        const ratio = Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        canvas.getContext("2d")?.scale(ratio, ratio);
  
        // Initialize SignaturePad
        padInstance.current = new SignaturePad(canvas, {
          minWidth: 0.5,
          maxWidth: 2.5,
          backgroundColor: "rgb(255, 255, 255)",
        });
      }
  
      // Cleanup
      return () => {
        if (padInstance.current) {
          padInstance.current.off();
        }
      };
    }, []);

    useEffect(() => {
      const fetchSignature = async () => {
        const storedToken = localStorage.getItem("token");
        const token = storedToken ? JSON.parse(storedToken) : null;
  
        try {
          const response = await axios.get(
            `http://localhost:3000/appointments/${appointmentid}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
  
          if (response.data.signature_of_the_officer_examined) {
            setSignature(response.data.signature_of_the_officer_examined);
            if (padInstance.current) {
              padInstance.current.fromDataURL(response.data.signature_of_the_officer_examined);
            }
          }
        } catch (error) {
          console.error("Error fetching signature:", error);
          toast.error("Failed to load signature");
        }
      };
  
      fetchSignature();
    }, [appointmentid]);
  
    const clearSignature = () => {
      if (padInstance.current) {
        padInstance.current.clear();
        setSignature(null);
      }
    };
  
    const saveSignature = async () => {
      if (!padInstance.current || padInstance.current.isEmpty()) {
        toast.warning("Please provide a signature before saving");
        return;
      }
  
      const dataURL = padInstance.current.toDataURL("image/png");
      const storedToken = localStorage.getItem("token");
      const token = storedToken ? JSON.parse(storedToken) : null;
  
      try {
        await axios.put(
          `http://localhost:3000/appointments/${appointmentid}`,
          {
            signature_of_the_officer_examined: dataURL,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
  
        setSignature(dataURL);
        toast.success("Signature saved successfully");
      } catch (error) {
        console.error("Error saving signature:", error);
        toast.error("Failed to save signature");
      }

    };

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
          `http://localhost:3000/appointments/${appointmentid}`,
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
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Weeks"
                  min="0"
              />
              
              <input
                  type="number"
                  id="POV_days"
                  name="POV_days"
                  value={formData.POV_days}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-xs"
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
                <div>රුධිර පීඩනය</div>
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
                htmlFor="poa  "
                className="block text-sm font-medium text-gray-700 mt-4"
                >
                <div>Signature of the officer examined</div>
                <div>පරීක්ෂා කරන ලද නිලධාරියාගේ අත්සන</div>
              </label>

              <div className="mt-4">
                  {signature ? (
                    <div>
                      
                      <img
                        src={signature}
                        alt="Saved Signature"
                        className="border border-gray-300 rounded-md"
                      />
                      
                    </div>
                  ) : (
                    <div>
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
                  )}
                </div>

              </div>
              
              <div>
              <label
                htmlFor="designation"
                className="block text-sm font-medium text-gray-700 mt-4"
                >
                <div>Designation</div>
                <div>නිල නාමය</div>
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
          
          <div className="flex flex-col">

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
                htmlFor="engagement_of_the_presenting_part"
                className="block text-sm font-medium text-gray-700 mt-4"
                >
                <div>Engagement of the presenting part</div>
                <div>ප්‍රමුඛ කොටස ශ්‍රෝණි කුහරය තුළ පිහිටීම</div>
              </label>

              <input
                type="text"
                id="engagement_of_the_presenting_part"
                name="engagement_of_the_presenting_part"
                value={formData.engagement_of_the_presenting_part}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Engagement of the presenting part"
              />

              </div>

              <div className="grid grid-cols-2">
                <div>
                  <label
                    htmlFor="fm"
                    className="block text-sm font-medium text-gray-700 mt-4"
                    >
                    <div>FM</div>
                    <div>භ්‍රෑණ චලන</div>
                  </label>

                  <select
                    id="fm"
                    name="fm"
                    value={formData.fm}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                  >
                  <option value="" disabled selected>
                    Select FM
                  </option>
                  <option value="positive">Positive (+) </option>
                  <option value="negative">Negative (-)</option>
                  </select>
                </div>

                <div>
                <label
                  htmlFor="fhs"
                  className="block text-sm font-medium text-gray-700 mt-4"
                  >
                  <div>FHS</div>
                  <div>හෘද චලන</div>
                </label>

                <select
                    id="fhs"
                    name="fhs"
                    value={formData.fhs}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                  >
                  <option value="" disabled selected>
                    Select FHS
                  </option>
                  <option value="positive">Positive (+) </option>
                  <option value="negative">Negative (-)</option>
                  </select>

                </div>
              </div>

              <div className="grid grid-cols-2">
                <div>
                <label
                  htmlFor="iron"
                  className="block text-sm font-medium text-gray-700 mt-4"
                  >
                  <div>Iron</div>
                  <div>යකඩ</div>
                </label>

                <input
                  type="number"
                  id="iron"
                  name="iron"
                  value={formData.iron}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Iron"
                />

                </div>

                <div>
                <label
                  htmlFor="folate"
                  className="block text-sm font-medium text-gray-700 mt-4"
                  >
                  <div>Folate</div>
                  <div>ෆෝලේට්</div>
                </label>

                <input
                  type="number"
                  id="folate"
                  name="folate"
                  value={formData.folate}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Folate"
                />

                </div>
              </div>

              <div className="grid grid-cols-2">
                <div>
                <label
                  htmlFor="calcium"
                  className="block text-sm font-medium text-gray-700 mt-4"
                  >
                  <div>Calcium</div>
                  <div>කැල්සියම්</div>
                </label>

                <input
                  type="number"
                  id="calcium"
                  name="calcium"
                  value={formData.calcium}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Calcium"
                />

                </div>

                <div>
                <label
                  htmlFor="vitamin_C"
                  className="block text-sm font-medium text-gray-700 mt-4"
                  >
                  <div>Vitamin C</div>
                  <div>විටමින් C</div>
                </label>

                <input
                  type="number"
                  id="vitamin_C"
                  name="vitamin_C"
                  value={formData.vitamin_C}
                  onChange={handleChange}
                  className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                  placeholder="Vitamin C"
                />

                </div>
              </div>

              <div>
              <label
                htmlFor="food_supplementation"
                className="block text-sm font-medium text-gray-700 mt-4"
                >
                <div>Food Supplementation</div>
                <div>පෝෂක අතිරේකය</div>
              </label>

              <input
                type="number"
                id="food_supplementation"
                name="food_supplementation"
                value={formData.food_supplementation}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Food Supplementation"
              />
              </div>

              <div>
              <label
                htmlFor="weight"
                className="block text-sm font-medium text-gray-700 mt-4"
                >
                <div>Weight</div>
                <div>බර</div>
              </label>

              <input
                type="text"
                id="weight"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Weight"
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
