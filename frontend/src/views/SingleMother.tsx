import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { NoticesIcon, TickCircle } from "../assets/icons/Icons";
import ClinicCare from "./forms/ClinicCare";
import PostnatalClinicCare from "./forms/PostnatalClinicCare";
// import ClinicCare2 from "./forms/ClinicCare2";
// import DentalCare from "./forms/DentalCare";

const SingleMother = () => {
  const { id } = useParams<{ id: string }>();
  const { appointmentid } = useParams<{ appointmentid: string }>();
  const [mother, setMother] = useState<any>(null);
  const [appointment, setAppointment] = useState<any>(null);
  const BASE_URL = `${import.meta.env.VITE_API_URL}`;

  const navigate = useNavigate();

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
    const getAppointment = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}appointments/${appointmentid}`,
          {}
        );
        setAppointment(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching mother data:", error);
      }
    };

    getAppointment();
  }, [id]);

  const updateAppointment = async () => {
    try {
      await axios.put(`${BASE_URL}appointments/${appointmentid}}`, {
        checkedByPHM: true,
      });
      window.location.reload();
    } catch (error) {
      console.error("Error posting appointment data:", error);
    }
  };

  if (!mother) {
    return <div>Loading...</div>;
  }

  const renderClinicCareComponent = () => {
    if (!appointment) return null;

    switch (appointment.appointment_state) {
      case "postnatal":
        return <PostnatalClinicCare />;
      case "prenatal":
        return <ClinicCare />;
      default:
        return null;
    }
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

        <button
          onClick={() => navigate(`/mother/${mother.id}/form-preview`)}
          className=" items-center px-4 py-2 hidden sm:flex bg-blue_primary text-white rounded-md hover:bg-blue_secondary"
        >
          <NoticesIcon className="mr-2" />
          Form Preview
        </button>
        <div className="m-3">
          <button
            onClick={updateAppointment}
            disabled={appointment?.checkedByPHM}
            className="sm:flex items-center px-4 py-2 hidden bg-green_primary text-white rounded-md hover:bg-green-400"
          >
            <TickCircle className="mr-2" />
            {appointment?.checkedByPHM ? "Completed" : "Mark As Completed"}
          </button>
        </div>
      </div>
      <div className="px-4">
        <button
          onClick={() => navigate(`/mother/${mother.id}/form-preview`)}
          className="flex items-center px-4 py-2 sm:hidden  mt-2 w-full bg-blue_primary text-white rounded-md hover:bg-blue_secondary"
        >
          <NoticesIcon className="mr-2" />
          Form Preview
        </button>
      </div>

      <div className="px-4 py-3 sm:hidden w-full">
        <button
          onClick={updateAppointment}
          disabled={appointment?.checkedByPHM}
          className="flex items-center px-4 py-2 bg-green_primary text-white rounded-md hover:bg-green-400 w-full"
        >
          <TickCircle className="mr-2" />
          {appointment?.checkedByPHM ? "Completed" : "Mark As Completed"}
        </button>
      </div>
      {renderClinicCareComponent()}
    </div>
  );
};

export default SingleMother;
