import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
// import ToTitle from "../components/CaseConverter";
import BasicDetails from "./forms/BasicDetails";
import { ExpandLess, ExpandMore, TickCircle } from "../assets/icons/Icons";
import PresentObstetricHistory from "./forms/PresentObstetricHistory";
import PregnancyBMIChart from "../components/PregnancyBMIChart";
import EmergencyPlanTable from "../components/EmergencyPlanTable";
import DentalCare from "./forms/DentalCare";
import ClinicCareCheckUp from "./forms/ClinicCareCheckUp";
import SFHChart from "../components/SFHChart";
import CounselingFormTable from "../components/FamilyPlanning";
// import ClinicCare from "./forms/ClinicCare";

const SingleMotherGenral = () => {
  const { id } = useParams<{ id: string }>();
  // const { appointmentid } = useParams<{ appointmentid: string }>();
  const [mother, setMother] = useState<any>(null);
  const [isCollapsed, setIsCollapsed] = useState(true);

  // const [appointment, setAppointment] = useState<any>(null);
  const BASE_URL = `${import.meta.env.VITE_API_URL}`;

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
  // useEffect(() => {
  //   const getAppointment = async () => {
  //     try {
  //       const response = await axios.get(
  //         `${BASE_URL}appointments/${appointmentid}`,
  //         {}
  //       );
  //       setAppointment(response.data);
  //       console.log(response.data);
  //     } catch (error) {
  //       console.error("Error fetching mother data:", error);
  //     }
  //   };

  //   getAppointment();
  // }, [id]);

  // const updateAppointment = async () => {
  //   try {
  //     await axios.put(`${BASE_URL}appointments/${appointmentid}}`, {
  //       checkedByPHM: true,
  //     });
  //     window.location.reload();
  //   } catch (error) {
  //     console.error("Error posting appointment data:", error);
  //   }
  // };

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
      <div className="max-w-full mx-4 grid grid-cols-2 sm:flex bg-white shadow-lg rounded-lg overflow-hidden border border-gray-200 justify-between items-center">
        <div className="w-24 h-24 m-3 border rounded-md flex items-center justify-center">
          <span className="font-medium text-2xl text-gray-600 dark:text-gray-300">
            {`${mother.user.firstName[0]} ${mother.user.lastName[0]}`}
          </span>
        </div>

        <div className="sm:px-6 py-4 flex-grow">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">
            {mother.user.firstName} {mother.user.lastName}
          </h2>
          <p className="text-gray-600">
            <span className="font-semibold">NIC:</span> {mother.user.nic}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Phone:</span> {mother.phone_1}
          </p>
        </div>

        {/* <div className="m-3">
          <button
            onClick={updateAppointment}
            disabled={appointment?.checkedByPHM}
            className="flex items-center px-4 py-2 bg-green_primary text-white rounded-md hover:bg-green-400"
          >
            <TickCircle className="mr-2" />
            {appointment?.checkedByPHM ? "Completed" : "Mark As Completed"}
          </button>
        </div> */}
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
      <PresentObstetricHistory />
      <ClinicCareCheckUp />
      <DentalCare />
      <PregnancyBMIChart />
      <SFHChart />
      <EmergencyPlanTable motherId={mother.id} />
      <CounselingFormTable motherId={mother.id} />
    </div>
  );
};

export default SingleMotherGenral;
