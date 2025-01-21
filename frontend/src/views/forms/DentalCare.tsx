import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignaturePad from "signature_pad";

const storedToken = localStorage.getItem("token");
const token = storedToken ? JSON.parse(storedToken) : null;

interface DentalCareData {
  referred_date: string;
  examination_date: string;
  treatment: string;
  dentistsignature: string;
}

const DentalCare: React.FC = () => {
  const signaturePadRef = useRef<HTMLCanvasElement>(null);
  const padInstance = useRef<SignaturePad | null>(null);
  const [signature, setSignature] = useState<string | null>(null);

  const [formData, setFormData] = useState<DentalCareData>({
    referred_date: "",
    examination_date: "",
    treatment: "",
    dentistsignature: "",
  });

  const [loading, setLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(true);

  const { id } = useParams<{ id: string }>();

  // Initialize SignaturePad
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

  // Fetch Dental Care Data
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setIsDataLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}users/mother/${id}/updateDentalCare`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setFormData({
          referred_date: response.data.referred_date || "",
          examination_date: response.data.examination_date || "",
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
        toast.error("Failed to load dental care data. Please refresh the page.");
      } finally {
        setIsDataLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!padInstance.current || padInstance.current.isEmpty()) {
      toast.warning("Please provide a signature before submitting.");
      return;
    }

    const dataURL = padInstance.current.toDataURL("image/png");

    setLoading(true);
    setIsUpdating(true);

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}users/mother/${id}/dentistsignature`,
        {
          referred_date: formData.referred_date,
          examination_date: formData.examination_date,
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
      toast.success("Details updated successfully!");
    } catch (err) {
      console.error("Error updating details:", err);
      toast.error("Failed to update dental care details.");
    } finally {
      setLoading(false);
      setIsUpdating(false);
    }
  };

  const clearSignature = () => {
    if (padInstance.current) {
      padInstance.current.clear();
      setSignature(null);
    }
  };

  if (isDataLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        Loading dental care data...
      </div>
    );
  }

  return (
    <div className="max-w-full mx-4 my-4 bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <h2 className="my-2 font-medium text-lg">Dental Care</h2>
        <div className="grid gap-6">
          <div>
            <label htmlFor="referred_date" className="block text-sm font-medium text-gray-700">
              Referred Date
            </label>
            <input
              type="date"
              id="referred_date"
              name="referred_date"
              value={formData.referred_date}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md"
            />

            <label htmlFor="examination_date" className="block text-sm font-medium text-gray-700">
              Examination Date
            </label>
            <input
              type="date"
              id="examination_date"
              name="examination_date"
              value={formData.examination_date}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md"
            />

            <label htmlFor="treatment" className="block text-sm font-medium text-gray-700">
              Treatment
            </label>
            <textarea
              id="treatment"
              name="treatment"
              value={formData.treatment}
              onChange={handleChange}
              className="mt-1 block w-full border-gray-300 rounded-md"
            />

            <label htmlFor="dentistsignature" className="block text-sm font-medium text-gray-700">
              Dentist Signature
            </label>
            <div className="mt-4">
              {signature ? (
                <img src={signature} alt="Saved Signature" className="border border-gray-300 rounded-md" />
              ) : (
                <div>
                  <canvas ref={signaturePadRef} className="border border-gray-300 rounded-md"></canvas>
                  <div className="mt-2 flex space-x-2">
                    <button
                      type="button"
                      onClick={clearSignature}
                      className="px-4 py-2 bg-red-500 text-white rounded-md"
                    >
                      Clear
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
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            disabled={loading}
          >
            {isUpdating ? "Updating..." : "Update"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DentalCare;
