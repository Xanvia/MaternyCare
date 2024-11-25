import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ToTitle from "../components/CaseConverter";
import BasicDetails from "./forms/BasicDetails";
import { ExpandLess, ExpandMore, TickCircle } from "../assets/icons/Icons";

const SingleMother = () => {
  const { id } = useParams<{ id: string }>();
  const { appointmentid } = useParams<{ appointmentid: string }>();
  const [mother, setMother] = useState<any>(null);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const [appointment, setAppointment] = useState<any>(null);
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
  
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsCollapsed(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Check initial screen size

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    const getAppointment = async () => {
      try {
        
        const response = await axios.get(`${BASE_URL}appointments/${appointmentid}`, {
        });
        setAppointment(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching mother data:", error);
      }
    };

    getAppointment();
  }, [id]);

  const updateAppointment = async() => {
    try{
        await axios.put(`${BASE_URL}appointments/${appointmentid}}`,{
        checkedByPHM : true
      });
    window.location.reload()
  }
  catch (error) {
    console.error("Error posting appointment data:", error);
    }
  }
    

  if (!mother) {
    return <div>Loading...</div>;
  }

  const handleNavigate = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setIsCollapsed(true);
  };

  return (
    <div>
      {/* <div className="max-w-full mx-4 flex bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200">
        <div className="px-6 m-3 border rounded-md  flex items-center justify-center">
          <span className="font-medium text-2xl text-gray-600 dark:text-gray-300">
            {`${ToTitle(mother.user.firstName[0])} ${ToTitle(
              mother.user.lastName[0]
            )}`}
          </span>
        </div>
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
      </div> */}
      <div className="max-w-full mx-4 grid grid-cols-2 sm:flex bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 justify-between items-center">
        <div className="w-24 h-24 m-3 border rounded-md flex items-center justify-center">
          <span className="font-medium text-2xl text-gray-600 dark:text-gray-300">
            {`${ToTitle(mother.user.firstName[0])} ${ToTitle(
              mother.user.lastName[0]
            )}`}
          </span>
        </div>

        <div className="sm:px-6 py-4 flex-grow">
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

        <div className="m-3">
          <button onClick={updateAppointment} disabled={appointment?.checkedByPHM} className="flex items-center px-4 py-2 bg-green_primary text-white rounded-md hover:bg-green-400">
            <TickCircle className="mr-2" />
            {appointment?.checkedByPHM ? "Completed":"Mark As Completed"}
          </button>
        </div>
      </div>

      <div className="px-4 py-3 sm:hidden w-full">
        <button className="flex items-center px-4 py-2 bg-green_primary text-white rounded-md hover:bg-green-400 w-full">
          <TickCircle className="mr-2" />
          Complete Appointment
        </button>
      </div>

      <div className="m-4 bg-white shadow-lg rounded-lg p-6 grid xs:grid-cols-5 gap-5 sticky top-4 z-10">
        <button
          className="bg-purple_primary text-white p-3 rounded-lg text-md"
          onClick={() => handleNavigate("basic-details")}
        >
          Basic Details
        </button>
        {!isCollapsed && (
          <>
            <button
              onClick={() => handleNavigate("second-details")}
              className="bg-purple_primary text-white p-3 rounded-lg text-md"
            >
              Present Obsteric History
            </button>
            <button className="bg-purple_primary text-white p-3 rounded-lg text-md">
              Family Details
            </button>
            <button className="bg-purple_primary text-white p-3 rounded-lg text-md">
              History Details
            </button>
            <button className="bg-purple_primary text-white p-3 rounded-lg text-md">
              Past Obsteric History
            </button>
          </>
        )}
        <button
          className="bg-purple_primary text-white p-3 rounded-lg text-md xs:hidden"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? <ExpandMore /> : <ExpandLess />}
        </button>
      </div>
      {/* Basic Details form */}
      <BasicDetails />

      <div
        id="second-details"
        className="max-w-full mx-4 my-4 bg-white shadow-lg rounded-lg p-6 border border-gray-200"
      >
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
                className="mt-1 block w-full text-sm px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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

              <label
                htmlFor="hospitalclinic"
                className="block text-sm font-medium text-gray-700 mt-4"
              >
                Registration No
              </label>
              <input
                type="text"
                id="regno"
                name="regno"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Registration No"
              />

              <label
                htmlFor="hospitalclinic"
                className="block text-sm font-medium text-gray-700 mt-4"
              >
                Registration Date
              </label>
              <input
                type="date"
                id="regdate"
                name="regdate"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Registration Date"
              />
              <div className="pt-6">
                <div className="flex items-center justify-between h-auto mt-4">
                  <label
                    htmlFor="hospitalclinic"
                    className="block text-sm font-medium text-gray-700 mr-4"
                  >
                    Consanguinity
                  </label>

                  <label className="relative flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" />
                    <div className="w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-0 rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 hover:peer-checked:bg-indigo-700"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between h-auto mt-4 ">
                  <label
                    htmlFor="hospitalclinic"
                    className="block text-sm font-medium text-gray-700 mr-4"
                  >
                    Rubella Immunization
                  </label>

                  <label className="relative flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" />
                    <div className="w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-0 rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 hover:peer-checked:bg-indigo-700"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between h-auto mt-4 ">
                  <label
                    htmlFor="hospitalclinic"
                    className="block text-sm font-medium text-gray-700 mr-4"
                  >
                    Pre-pregnancy screening done
                  </label>

                  <label className="relative flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" />
                    <div className="w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-0 rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 hover:peer-checked:bg-indigo-700"></div>
                  </label>
                </div>{" "}
                <div className="flex items-center justify-between h-auto mt-4 ">
                  <label
                    htmlFor="hospitalclinic"
                    className="block text-sm font-medium text-gray-700 mr-4"
                  >
                    Preconceptional folic acid
                  </label>

                  <label className="relative flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" />
                    <div className="w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-0 rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 hover:peer-checked:bg-indigo-700"></div>
                  </label>
                </div>{" "}
                <div className="flex items-center justify-between h-auto mt-4 ">
                  <label
                    htmlFor="hospitalclinic"
                    className="block text-sm font-medium text-gray-700 mr-4"
                  >
                    History of Subfertility
                  </label>

                  <label className="relative flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" />
                    <div className="w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-0 rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 hover:peer-checked:bg-indigo-700"></div>
                  </label>
                </div>{" "}
                <div className="flex items-center justify-between h-auto mt-4 ">
                  <label
                    htmlFor="hospitalclinic"
                    className="block text-sm font-medium text-gray-700 mr-4"
                  >
                    Planned gregnancy or not
                  </label>

                  <label className="relative flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" />
                    <div className="w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-0 rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 hover:peer-checked:bg-indigo-700"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between h-auto mt-4 ">
                  <label
                    htmlFor="hospitalclinic"
                    className="block text-sm font-medium text-gray-700 mr-4"
                  >
                    Familiy planning method last used
                  </label>

                  <label className="relative flex items-center cursor-pointer">
                    <input type="checkbox" value="" className="sr-only peer" />
                    <div className="w-9 h-5 bg-gray-200 hover:bg-gray-300 peer-focus:outline-0 rounded-full peer transition-all ease-in-out duration-500 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-indigo-600 hover:peer-checked:bg-indigo-700"></div>
                  </label>
                </div>
              </div>
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
                className="mt-1 block text-sm w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
                className="mt-1 block text-sm w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
              <label
                htmlFor="risk"
                className="block text-sm font-medium text-gray-700 mt-4"
              >
                Identified Antenatal Risk Conditions & Morbidities
              </label>
              <textarea
                id="risk"
                name="risk"
                className="mt-1 block w-full text-sm px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                placeholder="Risk Conditions"
              />
              <label
                htmlFor="hospitalclinic"
                className="block text-sm font-medium text-gray-700 mt-4"
              >
                Eligible Family Register
              </label>
              <input
                type="text"
                id="famregister"
                name="famregister"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Eligible Family Register"
              />

              <label
                htmlFor="hospitalclinic"
                className="block text-sm font-medium text-gray-700 mt-4"
              >
                Pregnant Mother's Register
              </label>
              <input
                type="text"
                id="motherregister"
                name="motherregister"
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                placeholder="Pregnant Mother's Register"
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
