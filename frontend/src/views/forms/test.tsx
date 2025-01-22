import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SignaturePad from "signature_pad";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const storedToken = localStorage.getItem("token");
const token = storedToken ? JSON.parse(storedToken) : null;

// Validation Schema
const validationSchema = Yup.object().shape({
  Date_Of_Visited: Yup.string().required("Date of visit is required"),
  POA_weeks: Yup.number()
    .required("Weeks is required")
    .min(0, "Weeks must be positive"),
  POV_days: Yup.number()
    .required("Days is required")
    .min(0, "Days must be positive")
    .max(6, "Days must be less than 7"),
  urine: Yup.string().required("Urine is required"),
  sugar: Yup.string().required("Sugar is required"),
  albumin: Yup.string().required("Albumin is required"),
  pallor: Yup.string().required("Pallor is required"),
  ankle: Yup.string().required("Ankle oedema is required"),
  facial: Yup.string().required("Facial oedema is required"),
  blood_pressure: Yup.string().required("Blood pressure is required"),
  fundal_height: Yup.string().required("Fundal height is required"),
  foetal_lie: Yup.string().required("Foetal lie is required"),
  presentation: Yup.string().required("Presentation is required"),
  engagement_of_the_presenting_part: Yup.string().required("Engagement of the presenting part is required"),
  fm: Yup.string().required("FM is required"),
  fhs: Yup.string().required("FHS is required"),
  iron: Yup.number().required("Iron is required"),
  folate: Yup.number().required("Folate is required"),
  calcium: Yup.number().required("Calcium is required"),
  vitamin_C: Yup.number().required("Vitamin C is required"),
  food_supplementation: Yup.number().required("Food supplementation is required"),
  designation: Yup.string().required("Designation is required"),
  weight: Yup.string().required("Weight is required"),
});

const ClinicCare = () => {
  const signaturePadRef = useRef<HTMLCanvasElement>(null);
  const padInstance = useRef<SignaturePad | null>(null);
  const [signature, setSignature] = useState<string | null>(null);
  const { appointmentid } = useParams<{ appointmentid: string }>();
  const BASE_URL = `${import.meta.env.VITE_API_URL}`;
  const [loading, setLoading] = useState(false);
  const [initialValues, setInitialValues] = useState({
    Date_Of_Visited: "",
    POA_weeks: "",
    POV_days: "",
    urine: "",
    sugar: "",
    albumin: "",
    pallor: "",
    ankle: "",
    facial: "",
    blood_pressure: "",
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

  useEffect(() => {
    const fetchData = async () => {
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

        setInitialValues({
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

        if (response.data.signature_of_the_officer_examined) {
          setSignature(response.data.signature_of_the_officer_examined);
          if (padInstance.current) {
            padInstance.current.fromDataURL(response.data.signature_of_the_officer_examined);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
    try {
      await axios.put(
        `${BASE_URL}appointments/${appointmentid}`,
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

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      await axios.put(
        `${BASE_URL}appointments/${appointmentid}`,
        values,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Clinic Care Details Updated successfully!");
    } catch (error) {
      console.error("Error updating clinic care details:", error);
      toast.error("Update failed!");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="max-w-full mx-4 my-4 bg-white shadow-lg rounded-lg p-6 border border-gray-200">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isSubmitting }) => (
          <Form>
            <h2 className="my-2 font-medium text-lg">Clinic Care</h2>
            <h2 className="my-2 font-medium text-lg">සායනික සංරක්ෂණය</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Side Fields */}
              <div className="flex flex-col">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Date of visit / සායනයට පැමිණි දිනය
                  </label>
                  <Field
                    type="date"
                    name="Date_Of_Visited"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="Date_Of_Visited"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    POA / ගර්භයට සති ගණන
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <Field
                        type="number"
                        name="POA_weeks"
                        placeholder="Weeks"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                      <ErrorMessage
                        name="POA_weeks"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                    <div>
                      <Field
                        type="number"
                        name="POV_days"
                        placeholder="Days"
                        className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                      />
                      <ErrorMessage
                        name="POV_days"
                        component="div"
                        className="text-red-500 text-sm mt-1"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Urine / මුත්‍රා
                    </label>
                    <Field
                      type="text"
                      name="urine"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    <ErrorMessage
                      name="urine"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Sugar / සීනි
                    </label>
                    <Field
                      type="text"
                      name="sugar"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    <ErrorMessage
                      name="sugar"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Albumin / ඇල්බුමින්
                    </label>
                    <Field
                      type="text"
                      name="albumin"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    <ErrorMessage
                      name="albumin"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Pallor / සුදුමැලි බව
                  </label>
                  <Field
                    type="text"
                    name="pallor"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="pallor"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Ankle Oedema / වළලුකර ඉදිමුම
                    </label>
                    <Field
                      type="text"
                      name="ankle"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    <ErrorMessage
                      name="ankle"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Facial Oedema / මුහුණ ඉදිමුම
                    </label>
                    <Field
                      type="text"
                      name="facial"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    <ErrorMessage
                      name="facial"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Blood Pressure / රුධිර පීඩනය
                  </label>
                  <Field
                    as="select"
                    name="blood_pressure"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select Blood Pressure</option>
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
                  </Field>
                  <ErrorMessage
                    name="blood_pressure"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Designation / නිල නාමය
                  </label>
                  <Field
                    type="text"
                    name="designation"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="designation"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>

              {/* Right Side Fields */}
              <div className="flex flex-col">
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Fundal height / බුධිනයේ උස
                  </label>
                  <Field
                    type="text"
                    name="fundal_height"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="fundal_height"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Foetal lie / භ්‍රෑණයේ ලීලාව
                  </label>
                  <Field
                    type="text"
                    name="foetal_lie"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="foetal_lie"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Presentation / භ්‍රෑණයේ පිහිටීම
                  </label>
                  <Field
                    type="text"
                    name="presentation"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="presentation"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Engagement of the presenting part / ප්‍රමුඛ කොටස ශ්‍රෝණි කුහරය තුළ පිහිටීම
                  </label>
                  <Field
                    type="text"
                    name="engagement_of_the_presenting_part"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="engagement_of_the_presenting_part"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      FM / භ්‍රෑණ චලන
                    </label>
                    <Field
                      as="select"
                      name="fm"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select FM</option>
                      <option value="positive">Positive (+)</option>
                      <option value="negative">Negative (-)</option>
                    </Field>
                    <ErrorMessage
                      name="fm"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      FHS / හෘද චලන
                    </label>
                    <Field
                      as="select"
                      name="fhs"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="">Select FHS</option>
                      <option value="positive">Positive (+)</option>
                      <option value="negative">Negative (-)</option>
                    </Field>
                    <ErrorMessage
                      name="fhs"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Iron / යකඩ
                    </label>
                    <Field
                      type="number"
                      name="iron"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    <ErrorMessage
                      name="iron"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Folate / ෆෝලේට්
                    </label>
                    <Field
                      type="number"
                      name="folate"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    <ErrorMessage
                      name="folate"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Calcium / කැල්සියම්
                    </label>
                    <Field
                      type="number"
                      name="calcium"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    <ErrorMessage
                      name="calcium"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Vitamin C / විටමින් C
                    </label>
                    <Field
                      type="number"
                      name="vitamin_C"
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                    <ErrorMessage
                      name="vitamin_C"
                      component="div"
                      className="text-red-500 text-sm mt-1"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Food Supplementation / පෝෂක අතිරේකය
                  </label>
                  <Field
                    type="number"
                    name="food_supplementation"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="food_supplementation"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700">
                    Weight / බර
                  </label>
                  <Field
                    type="text"
                    name="weight"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                  <ErrorMessage
                    name="weight"
                    component="div"
                    className="text-red-500 text-sm mt-1"
                  />
                </div>
              </div>
            </div>

            {/* Signature Section */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">
                Signature of the officer examined / පරීක්ෂා කරන ලද නිලධාරියාගේ අත්සන
              </label>
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
                    style={{ width: '100%', height: '200px' }}
                  ></canvas>
                  <div className="mt-2 flex space-x-2">
                    <button
                      type="button"
                      onClick={clearSignature}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                    >
                      Clear
                    </button>
                    <button
                      type="button"
                      onClick={saveSignature}
                      className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                    >
                      Save
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <div className="mt-6">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto px-6 py-2 bg-blue_primary text-white rounded-md shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                {isSubmitting ? "Updating..." : "Update"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ClinicCare;