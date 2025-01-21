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

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}users/mother/${id}/dental-care`,
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
        setLoading(false);
        setIsDataLoading(false);
      }
    };

    fetchDetails();
  }, [id, token]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setIsUpdating(true);

    const dataURL = padInstance.current?.toDataURL("image/png") || "";

    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}users/mother/${id}/dental-care`,
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

  const saveSignature = () => {
    if (padInstance.current) {
      const dataURL = padInstance.current.toDataURL("image/png");
      setSignature(dataURL);
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

  if (isDataLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        Loading dental care data...
      </div>
    );
  }

  return (
    <div
      id="dental-care"
      className="max-w-full mx-4 my-4 bg-white shadow-lg rounded-lg p-6 border border-gray-200"
    >
      <ToastContainer />
      {loading && "Loading..."}
      <form onSubmit={handleSubmit}>
        <h2 className="my-2 font-medium text-lg">Dental Care</h2>
        <h2 className="my-2 font-medium text-lg">දන්ත සංරක්ෂණය</h2>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
          <div>
            <label
              htmlFor="referred_date"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              <div>Referred Date</div>
              <div>යොමුකළ දිනය</div>
            </label>
            <input
              type="date"
              id="referred_date"
              name="referred_date"
              value={formData.referred_date}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
            />

            <label
              htmlFor="examination_date"
              className="block text-sm font-medium text-gray-700 mt-4"
            >
              <div>Date of Examination</div>
              <div>පරීක්ෂා කළ දිනය</div>
            </label>
            <input
              type="date"
              id="examination_date"
              name="examination_date"
              value={formData.examination_date}
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

export default DentalCare;