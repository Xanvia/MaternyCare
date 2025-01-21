import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignaturePad from "signature_pad";

const storedToken = localStorage.getItem("token");
const token = storedToken ? JSON.parse(storedToken) : null;

const PostnatalClinicCare = () => {
  const signaturePadRef = useRef<HTMLCanvasElement>(null);
  const padInstance = useRef<SignaturePad | null>(null);
  const [signature, setSignature] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    referredDate: "",
    dateOfExamination: "",
    treatment: "",
    dentistsignature: "",
  });
  const [loading, setLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}users/mother/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setFormData({
          referredDate: response.data.referredDate || "",
          dateOfExamination: response.data.dateOfExamination || "",
          treatment: response.data.treatment || "",
          dentistsignature: response.data.dentistsignature || "",
        });
        if (response.data.dentistsignature) {
          setSignature(response.data.dentistsignature);
          if (padInstance.current) {
            padInstance.current.fromDataURL(response.data.dentistsignature);
          }
        }
      } catch (err) {
        console.error("Error fetching details:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id, token]);

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
        `${import.meta.env.VITE_API_URL}users/mother/${id}/dentistsignature`,
        {
          dentistsignature: dataURL,
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

  useEffect(() => {
    if (signaturePadRef.current) {
      const canvas = signaturePadRef.current;
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
      canvas.getContext("2d")?.scale(ratio, ratio);

      padInstance.current = new SignaturePad(canvas, {
        minWidth: 0.5,
        maxWidth: 2.5,
        backgroundColor: "rgb(255, 255, 255)",
      });
    }

    return () => {
      if (padInstance.current) {
        padInstance.current.off();
      }
    };
  }, []);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      setLoading(true);
      setIsUpdating(true);

      const dataURL = padInstance.current?.toDataURL("image/png") || "";

      await axios.put(
        `${import.meta.env.VITE_API_URL}users/mother/${id}/dentistsignature`,
        {
          referredDate: formData.referredDate,
          dateOfExamination: formData.dateOfExamination,
          treatment: formData.treatment,
          dentistsignature: dataURL,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSignature(dataURL);
      setIsUpdating(false);
      toast.success("Details updated successfully!");
    } catch (err) {
      console.error("Error updating details:", err);
      toast.error("Update failed!");
    } finally {
      setLoading(false);
    }
  };

  const clearSignature = () => {
    if (padInstance.current) {
      padInstance.current.clear();
      setSignature(null);
    }
  };

  return (
    <div
      id="dental-care"
      className="max-w-full mx-4 my-4 bg-white shadow-lg rounded-lg p-6 border border-gray-200"
    >
      {loading && "Loading..."}
      <form onSubmit={handleSubmit}>
        <h2 className="my-2 font-medium text-lg">Dental Care</h2>
        <h2 className="my-2 font-medium text-lg">දන්ත සංරක්ෂණය</h2>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <div>
            <label
              htmlFor="referredDate"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              <div>Referred Date</div>
              <div>යොමුකළ දිනය</div>
            </label>
            <input
              type="date"
              id="referredDate"
              name="referredDate"
              value={formData.referredDate}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
            />

            <label
              htmlFor="dateOfExamination"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              <div>Date of Examination</div>
              <div>පරීක්ෂා කළ දිනය</div>
            </label>
            <input
              type="date"
              id="dateOfExamination"
              name="dateOfExamination"
              value={formData.dateOfExamination}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
            />

            <label
              htmlFor="treatment"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              <div>Treatment</div>
              <div>ප්‍රතිකාර</div>
            </label>
            <textarea
              id="treatment"
              name="treatment"
              value={formData.treatment}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Enter details about the treatment"
            />

            <label
              htmlFor="dentistsignature"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              <div>Signature</div>
              <div>අත්සන</div>
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
        </div>

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