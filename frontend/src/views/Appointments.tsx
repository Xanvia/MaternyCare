import { useEffect, useState } from "react";
import axios from "axios";
import { Rings } from "react-loader-spinner";
//import AddFixAppointmentModal from "../modals/FixAppointmentDatePopu";
import FixAppointmentDatePopup from "../modals/FixAppointmentDatePopu";
import { useNavigate, useParams } from "react-router-dom";
import { NoticesIcon, TickCircle } from "../assets/icons/Icons";
import FeedbackPopup from "../modals/FeedbackPopup";
import PostnatalAppointment from "../components/PostnatalAppointment";
import AddAppointmentModal from "../modals/AddAppointmentModal";

const Appointments = () => {
  const BASE_URL = `${import.meta.env.VITE_API_URL}`;
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const role = (localStorage.getItem("role") || "")
    .replace(/"/g, "")
    .trim()
    .toLowerCase();
  console.log("role from appointment page: " + role);
  //   const colors = ["#BA97FE", "#0D99FF", "#F580AB", "#F1CB3A", "#3AF16C"];

  // get id from route
  const { id: motherId } = useParams<{ id: string }>();

  let userItem = localStorage.getItem("user");
  const user = userItem ? JSON.parse(userItem) : null;
  //const userId = user.id;

  const Id = user && user.role === "mother" ? user.id : motherId;

  const navigate = useNavigate();

  const [mother, setMother] = useState<any>(null);

  // console.log(mother.user.firstName);

  useEffect(() => {
    const getAppointments = () => {
      setLoading(true);
      const url =
        role === "mother"
          ? `${BASE_URL}appointments/user/${Id}`
          : `${BASE_URL}appointments/mother/${Id}`;
      const axiosConfig = {
        method: "get",
        url: url,
        // headers: {
        //   Authorization: `Bearer`,
        // },
      };
      axios(axiosConfig)
        .then((response) => {
          const sortedAppointments = response.data

            .filter(
              (appointment: { appointment_state: string }) =>
                appointment.appointment_state === "prenatal" // Filter for prenatal appointments
            )

            .sort(
              (
                a: { fixedDate: any; startDate: any },
                b: { fixedDate: any; startDate: any }
              ) => {
                if (a.fixedDate && !b.fixedDate) return -1;
                if (!a.fixedDate && b.fixedDate) return 1;

                const dateA = new Date(a.fixedDate || a.startDate).getTime();
                const dateB = new Date(b.fixedDate || b.startDate).getTime();
                return dateA - dateB;
              }
            );
          setAppointments(sortedAppointments);
          console.log(response.data);
          //setAppointments(response.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    getAppointments();
  }, []);

  useEffect(() => {
    const getMother = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}users/mother/${motherId}`,
          {}
        );
        setMother(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching mother data:", error);
      }
    };

    getMother();
  }, [motherId]);

  return (
    <div className="mx-11 my ">
      {/* <div>
        {appointments.map((item) =>(
          1
        )) }
      </div> */}
      <div className="flex flex-col justify-between my-4 items-left ">
        {role !== "mother" && (
          <div className="flex flex-row justify-between mt-9 mb-4 text-sm">
            <div>
              <div>
                <strong>Mother's Name: </strong>{" "}
                {`${mother?.user?.firstName} ${mother?.user?.lastName}`}
              </div>
              <div>
                <strong>Address: </strong>
                {` ${mother?.address}`}
              </div>
              <div>
                <strong>Expected Delivery Date: </strong>
                {` ${mother?.delivery_date}`}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                 onClick={() =>
                  navigate(
                    `/mother/${motherId}/general-form`
                  )
                }
                className="flex items-center px-4 py-2 bg-green_primary text-white rounded-md hover:bg-green-400"
              >
                <NoticesIcon className="mr-2" />
                Fill General Form
              </button>
              <AddAppointmentModal userId={mother?.user?.id} />
            </div>
          </div>
        )}

        <h1 className="mt-4 mb-4 text-sm">Prenatal Appointments</h1>
        {/* <div className="flex justify-end">
          <AddFixAppointmentModal />
        </div> */}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-5 ">
        {loading ? (
          <Rings
            visible={true}
            height="80"
            width="80"
            color="#BA97FE"
            ariaLabel="rings-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        ) : (
          appointments
            //.filter((appointment) => appointment.mother?.id)
            .map(
              (
                appointment: {
                  appointment_description: string;
                  appointment_state: string;
                  feedback: string;
                  startDate: string;
                  endDate: string;
                  fixedDate: string;
                  month: string;
                  checkedByPHM: boolean;
                  id: string;
                  mother: {
                    id: string;
                  };
                },
                index: number
              ) => {
                const start_date = new Date(appointment.startDate).getDate();
                const end_date = new Date(appointment.endDate).getDate();
                const fixedDate = new Date(appointment.fixedDate).getDate();
                const appointmentYear =
                  appointment.fixedDate !== null
                    ? new Date(appointment.fixedDate).getFullYear()
                    : new Date(appointment.startDate).getFullYear();
                const appointmentMonth =
                  appointment.fixedDate !== null
                    ? new Date(appointment.fixedDate).toLocaleString("en-US", {
                        month: "long",
                      })
                    : new Date(appointment.startDate).toLocaleString("en-US", {
                        month: "long",
                      });

                return (
                  <div
                    key={index}
                    className="sm:w-40 w-full bg-white rounded-3xl pb-2"
                  >
                    <div className="sm:w-40 w-full  items-center justify-center">
                      <button
                        className="flex flex-col w-full items-center"
                        disabled={
                          appointment.fixedDate === null ||
                          appointment.checkedByPHM === true
                        }
                        onClick={() =>
                          navigate(
                            `/mother-singleview/${motherId}/appointment/${appointment.id}`
                          )
                        }
                      >
                        <div className="flex flex-col items-center justify-center pt-1">
                          <header className="xs:text-base text-blue_primary mt-1 text-lg">
                            {appointmentYear}
                          </header>
                          <header className="text-xl md:text-xl sm:text-lg xs:text-base text-pink_primary font-bold">
                            {appointmentMonth}
                          </header>
                        </div>
                        <div className="flex justify-center w-full">
                          <hr className="mt-2 w-10/12 border-1 border-gray-300" />
                        </div>
                        {appointment.fixedDate === null ? (
                          <div className="flex flex-row items-center justify-center mt-2 m-2">
                            <div className="md:text-3xl sm:text-3xl xs:text-2xl text-3xl text-blue_primary font-bold">
                              {start_date}
                            </div>
                            <hr className="w-2 border-2 border-gray-300 mx-1" />
                            <div className="md:text-3xl sm:text-3xl xs:text-2xl text-3xl text-blue_primary font-bold">
                              {end_date}
                            </div>
                          </div>
                        ) : (
                          <div className="flex flex-row items-center justify-center mt-2 m-2">
                            <div className="md:text-3xl sm:text-3xl xs:text-2xl text-3xl text-blue_primary font-bold">
                              {fixedDate}
                            </div>
                          </div>
                        )}
                        <header className=" flex mt-2 justify-center pb-1 text-pink_primary text-sm">
                          {appointment.appointment_description}
                        </header>
                      </button>

                      <div className="flex w-full justify-center">
                        {role !== "mother" &&
                          appointment.checkedByPHM !== true && (
                            <FixAppointmentDatePopup
                              appointmentId={appointment.id}
                              appointment_description={
                                appointment.appointment_description
                              }
                              fixedDate={appointment.fixedDate}
                            />
                          )}
                      </div>

                      <div className="flex w-full justify-center">
                        {role === "mother" &&
                          appointment.checkedByPHM === true &&
                          appointment.feedback === null && (
                            <FeedbackPopup
                              appointmentId={appointment.id}
                              checkedByphm={appointment.checkedByPHM}
                              feedback={appointment.feedback}
                            />
                          )}
                      </div>

                      {appointment.checkedByPHM === true &&
                        appointment.feedback !== null && (
                          <div
                            className="flex justify-center items-center gap-2 text-blue_primary rounded-md text-xs font-medium py-0.5 w-5/6 ml-3.5"
                            style={{ border: "0.5px solid #0d99ff" }}
                          >
                            Completed
                            <TickCircle
                              className="text-green_primary"
                              style={{ fontSize: "12px" }}
                            />
                          </div>
                        )}

                      {role !== "mother" &&
                        appointment.checkedByPHM === true &&
                        appointment.feedback === null && (
                          <div className="flex justify-center items-center gap-2 text-blue_primary rounded-md text-xs font-medium py-0.5 w-5/6 ml-3.5">
                            pending for feedback
                            {/* <TickCircle className = "text-green_primary" style={{ fontSize: '12px'}} /> */}
                          </div>
                        )}
                    </div>
                  </div>
                );
              }
            )
        )}
      </div>

      <div>
        <PostnatalAppointment />
      </div>
    </div>
  );
};

export default Appointments;
