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
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your name"
              />

              <label
                htmlFor="nic"
                className="block text-sm font-medium text-gray-700 mt-4"
              >
                NIC
              </label>
              <input
                type="text"
                id="nic"
                name="nic"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your NIC"
              />

              <label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700 mt-4"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your address"
              />
            </div>

            {/* Right Side Fields */}
            <div>
              <label
                htmlFor="phone"
                className="block text-sm font-medium text-gray-700"
              >
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your phone number"
              />

              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mt-4"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your email"
              />

              <label
                htmlFor="occupation"
                className="block text-sm font-medium text-gray-700 mt-4"
              >
                Occupation
              </label>
              <input
                type="text"
                id="occupation"
                name="occupation"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter your occupation"
              />
            </div>
          </div>

          {/* Update Button */}
          <div className="mt-6">
            <button
              type="submit"
              className="w-full md:w-auto px-6 py-2 bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
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
