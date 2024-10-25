import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SingleMother = () => {
  const { id } = useParams<{ id: string }>();
  const [mother, setMother] = useState<any>(null);
  const BASE_URL = "http://localhost:3000/";

  useEffect(() => {
    const fetchMother = async () => {
      try {
        const storedToken = localStorage.getItem("token");
        const token = storedToken ? JSON.parse(storedToken) : null;

        const response = await axios.get(`${BASE_URL}users/mother/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMother(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching mother data:", error);
      }
    };

    fetchMother();
  }, [id]);

  if (!mother) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className="max-w-full mx-4 bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
        <div className="px-6 py-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {mother.user.firstName} {mother.user.lastName}
          </h2>
          <p className="text-gray-600">
            <span className="font-semibold">NIC:</span> {mother.nic}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Phone:</span> {mother.phone_1}
          </p>
        </div>
      </div>

      <div className="max-w-full mx-4 my-4 bg-white shadow-lg rounded-lg p-6 border border-gray-200">
        <form>
          <h2 className="my-2 font-medium text-lg">Basic Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Left Side Fields */}
            <div>
              <label
                htmlFor="bloodtype"
                className="block text-sm font-medium text-gray-700"
              >
                Blood Type
              </label>
              <input
                type="text"
                id="bloodtype"
                name="bloodtype"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Blood Type"
              />

              <label
                htmlFor="height"
                className="block text-sm font-medium text-gray-700 mt-4"
              >
                Height(cm)
              </label>
              <input
                type="text"
                id="height"
                name="height"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Height"
              />

              <label
                htmlFor="alergies"
                className="block text-sm font-medium text-gray-700 mt-4"
              >
                Allergies
              </label>
              <textarea
                id="alergies"
                name="alergies"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Allergies"
              />

              <label
                htmlFor="gsdivision"
                className="block text-sm font-medium text-gray-700 mt-4"
              >
                Grama Niladhari Division
              </label>
              <input
                type="text"
                id="gsdivision"
                name="gsdivision"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Grama Niladhari Division"
              />

              <label
                htmlFor="hospitalclinic"
                className="block text-sm font-medium text-gray-700 mt-4"
              >
                Name of the Hospital Clinic
              </label>
              <input
                type="text"
                id="hospitalclinic"
                name="hospitalclinic"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Name of the Hospital Clinic"
              />
            </div>

            {/* Right Side Fields */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                MOH Area
              </label>
              <input
                type="text"
                id="moharea"
                name="moharea"
                className="text-sm mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="MOH Area"
              />

              <label
                htmlFor="phmarea"
                className="block text-sm font-medium text-gray-700 mt-4"
              >
                PHM area
              </label>
              <input
                type="text"
                id="phmarea"
                name="phmarea"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your PHM area"
              />

              <label
                htmlFor="fieldclinic"
                className="block text-sm font-medium text-gray-700 mt-4"
              >
                Field Clinic Name
              </label>
              <input
                type="text"
                id="fieldclinic"
                name="fieldclinic"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter Field Clinic Name"
              />

              <label
                htmlFor="consulatantobstetrician"
                className="block text-sm font-medium text-gray-700 mt-4"
              >
                Name of the Consultant Obstetrician
              </label>
              <input
                type="text"
                id="consulatantobstetrician"
                name="consulatantobstetrician"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Name of the Consultant Obstetrician"
              />
            </div>
          </div>

          {/* Update Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-2 bg-blue_primary text-white rounded-md shadow-sm hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SingleMother;
