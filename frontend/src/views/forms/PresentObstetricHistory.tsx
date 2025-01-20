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
  const padInstance = useRef<SignaturePad | null>(null);
  const { id } = useParams<{ id: string }>();
  const [signature, setSignature] = useState<string | null>(null);

  // Initialize signature pad
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

  // Fetch existing signature
  useEffect(() => {
    const fetchSignature = async () => {
      const storedToken = localStorage.getItem("token");
      const token = storedToken ? JSON.parse(storedToken) : null;

      try {
        const response = await axios.get(
          `${process.env.BASE_URL}users/mother/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.signature) {
          setSignature(response.data.signature);
          if (padInstance.current) {
            padInstance.current.fromDataURL(response.data.signature);
          }
        }
      } catch (error) {
        console.error("Error fetching signature:", error);
        toast.error("Failed to load signature");
      }
    };

    fetchSignature();
  }, [id]);

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
        `${process.env.BASE_URL}users/mother/${id}/signature`,
        {
          signature: dataURL,
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
    gravidity_G: 0,
    gravidity_P: 0,
    gravidity_C: 0,
    age_of_youngest_child: 0,
    LRMP: "",
    EDD: "",
    US_corrected_EDD: "",
    POA_at_dating_scan: "",
    date_of_quickening: "",
    POA_at_registration: "",
  });
  // const [loading, setLoading] = useState(false);
  // const [success, setSuccess] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  // Fetch existing data when component mounts
  useEffect(() => {
    const fetchBasicDetails = async () => {
      try {
        // setLoading(true);
        const response = await axios.get(
          `${process.env.BASE_URL}users/mother/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        ); // Adjust endpoint as needed
        setFormData({
          gravidity_G: response.data.gravidity_G || 0,
          gravidity_P: response.data.gravidity_P || 0,
          gravidity_C: response.data.gravidity_C || 0,
          age_of_youngest_child: response.data.age_of_youngest_child || 0,
          LRMP: response.data.LRMP || "",
          EDD: response.data.EDD || "",
          US_corrected_EDD: response.data.US_corrected_EDD || "",
          POA_at_dating_scan: response.data.POA_at_dating_scan || "",
          date_of_quickening: response.data.date_of_quickening || "",
          POA_at_registration: response.data.POA_at_registration || "",
        });
      } catch (err) {
        console.error("Error fetching basic details:", err);
      } finally {
        // setLoading(false);
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
      // setLoading(true);
      // setSuccess(false);
      setIsUpdating(true);

      console.log("id from form ", id);

      await axios.put(
        `${process.env.BASE_URL}users/mother/${id}/present-obstetric-history`,
        {
          gravidity_G: formData.gravidity_G,
          gravidity_P: formData.gravidity_P,
          gravidity_C: formData.gravidity_C,
          age_of_youngest_child: formData.age_of_youngest_child,
          LRMP: formData.LRMP,
          EDD: formData.EDD,
          US_corrected_EDD: formData.US_corrected_EDD,
          POA_at_dating_scan: formData.POA_at_dating_scan,
          date_of_quickening: formData.date_of_quickening,
          POA_at_registration: formData.POA_at_registration,
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
      // setLoading(false);
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
              htmlFor="gravidity"
              className="block text-sm font-medium text-gray-700 mt-3"
            >
              Gravidity
            </label>
            <label
              htmlFor="gravidity"
              className="block text-sm font-medium text-gray-700"
            >
              කීවෙනි ගර්භයද
            </label>
            <div className="flex">
              <input
                type="number"
                id="gravidity_G"
                name="gravidity_G"
                value={formData.gravidity_G}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="G"
              />
              <input
                type="number"
                id="gravidity_P"
                name="gravidity_P"
                value={formData.gravidity_P}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="P"
              />
              <input
                type="number"
                id="gravidity_C"
                name="gravidity_C"
                value={formData.gravidity_C}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="C"
              />
            </div>

            <label
              htmlFor="age_of_youngest_child"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              <div>Age of youngest child</div>
              <div>බාලම ළමයාගේ වයස</div>
            </label>
            <input
              type="number"
              id="age_of_youngest_child"
              name="age_of_youngest_child"
              value={formData.age_of_youngest_child}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Age"
            />

            <label
              htmlFor="LRMP"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              <div>LRMP</div>
              <div>අන්තිමට ක්‍රමවත්ව ඔසප් වූ දිනය</div>
            </label>
            <input
              type="date"
              id="LRMP"
              name="LRMP"
              value={formData.LRMP}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Registration Date"
            />

            <div className="pt-6">
              <div className="flex items-center justify-between h-auto mt-4">
                <label
                  htmlFor="POA_at_dating_scan"
                  className="block text-sm font-medium text-gray-700 mr-4"
                >
                  POA at dating scan
                </label>

                <label className="relative flex items-center cursor-pointer">
                  <input
                    type="text"
                    id="POA_at_dating_scan"
                    name="POA_at_dating_scan"
                    value={formData.POA_at_dating_scan}
                    onChange={handleChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder="POA at dating scan"
                  />
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
                  {signature ? (
                    <div>
                      {/* <h3>Saved Signature:</h3> */}
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
            </div>
          </div>

          {/* Right Side Fields */}
          <div>
            <label
              htmlFor="EDD"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              <div>Expected delivery date (Date of 40 weeks completion)</div>
              <div>බලාපොරොත්තු වන ප්‍රසූත දිනය (සති 40 සම්පූර්ණවන දිනය)</div>
            </label>
            <input
              type="date"
              id="EDD"
              name="EDD"
              value={formData.EDD}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Expected delivery date "
            />

            <label
              htmlFor="US_corrected_EDD"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              <div>US corrected EDD (To be filled by VOG/MO)</div>
              <div>US නිවැරදි කළ බලපොරොත්තු ප්‍රසූත දිනය</div>
            </label>
            <input
              type="date"
              id="US_corrected_EDD"
              name="US_corrected_EDD"
              value={formData.US_corrected_EDD}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="US corrected EDD"
            />
            <label
              htmlFor="date_of_quickening"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              <div>Date of quickening</div>
              <div>භ්‍රෑණ චලන පළමුවෙන්ම දැණුන දිනය</div>
            </label>
            <input
              type="date"
              id="date_of_quickening"
              name="date_of_quickening"
              value={formData.date_of_quickening}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Date of quickening"
            />
            <label
              htmlFor="POA_at_registration"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              <div>POA at Registration</div>
              <div>ලියාපදිංචි කරන විට ගර්භයට සති ගණන</div>
            </label>

            <div className="flex gap-4">
              <input
                type="number"
                id="POA_at_registration"
                name="POA_at_registration"
                value={formData.POA_at_registration}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="POA_at_registration"
                min="0"
                // value={formData.weeks} // Bind to weeks in state
                // onChange={handleChange} // Handle changes
              />

              {/* <input
                type="number"
                id="days"
                name="days"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Days"
                min="0"
                max="6" // Maximum 6 days to maintain proper week-day format
                // value={formData.days} // Bind to days in state
                // onChange={handleChange} // Handle changes
              /> */}
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
