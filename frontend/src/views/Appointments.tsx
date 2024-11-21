import { useEffect, useState } from "react";
import axios from "axios";
import { Rings } from "react-loader-spinner";
//import AddFixAppointmentModal from "../modals/FixAppointmentDatePopu";
import FixAppointmentDatePopup from "../modals/FixAppointmentDatePopu";
import { useNavigate, useParams } from "react-router-dom";

const Appointments = () => {
  
  const BASE_URL = "http://localhost:3000/";
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


  useEffect(() => {
    const getAppointments = () => {
      setLoading(true);
      const url = role === "mother"
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
          const sortedAppointments = response.data.sort((a: { fixedDate: any; startDate: any; }, b: { fixedDate: any; startDate: any; }) => {

            if (a.fixedDate && !b.fixedDate) return -1;
            if (!a.fixedDate && b.fixedDate) return 1;

            const dateA = new Date(a.fixedDate || a.startDate).getTime();
            const dateB = new Date(b.fixedDate || b.startDate).getTime();
            return dateA - dateB;
          });
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

  return (
    <div className="mx-11 my ">
      {/* <div>
        {appointments.map((item) =>(
          1
        )) }
      </div> */}
      <div className="flex justify-between my-4 items-center ">
        <h1 className="mt-9 mb-4">Appointments</h1>
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
                appointment_type: string;
                startDate: string;
                endDate: string;
                fixedDate: string;
                month: string;
                id: string;
                mother :{
                  id: string;
                };
                
              },
              index: number
            ) => {
            
              const start_date = new Date(appointment.startDate).getDate();
              const end_date = new Date(appointment.endDate).getDate();
              const fixedDate = new Date(appointment.fixedDate).getDate();
              const appointmentYear = appointment.fixedDate !== null ? new Date(appointment.fixedDate).getFullYear() : new Date(appointment.startDate).getFullYear();
              const appointmentMonth = appointment.fixedDate !== null 
              ? new Date(appointment.fixedDate).toLocaleString('en-US', { month: 'long' })
              : new Date(appointment.startDate).toLocaleString('en-US', { month: 'long' });

              
              return (
                <div key={index} className='sm:w-40 w-full bg-white rounded-3xl pb-2'>
                 <div className='sm:w-40 w-full  items-center justify-center'>
                    <button className='flex flex-col w-full items-center'
                    onClick={() =>
                      navigate(`/mother-singleview/${motherId}`)
                    }>
                      <div  className='flex flex-col items-center justify-center pt-1'>
                        <header className='xs:text-base text-blue_primary mt-1 text-lg'>{appointmentYear}</header>
                        <header className='text-xl md:text-xl sm:text-lg xs:text-base text-pink_primary font-bold'>{appointmentMonth}</header>
                      </div>
                      <div className='flex justify-center w-full'>
                        <hr className='mt-2 w-10/12 border-1 border-gray-300' />
                      </div>
                      {appointment.fixedDate === null ?(
                      <div className='flex flex-row items-center justify-center mt-2 m-2'>
                        <div className='md:text-3xl sm:text-3xl xs:text-2xl text-3xl text-blue_primary font-bold'>{start_date}</div>
                        <hr className='w-2 border-2 border-gray-300 mx-1'/>
                      <div className='md:text-3xl sm:text-3xl xs:text-2xl text-3xl text-blue_primary font-bold'>{end_date}</div>
                      </div>
                      ):(
                        <div className='flex flex-row items-center justify-center mt-2 m-2'>
                          <div className='md:text-3xl sm:text-3xl xs:text-2xl text-3xl text-blue_primary font-bold'>{fixedDate}</div>
                        </div>
                      ) }
                      <header className=' flex mt-2 justify-center pb-1 text-pink_primary text-sm'>{appointment.appointment_type}</header>
                    </button>
                    
                    <div className="flex w-full justify-center">
                      {role !== "mother" && (
                      <FixAppointmentDatePopup 
                      appointmentId={appointment.id}
                      appointment_type={appointment.appointment_type} 
                      fixedDate={appointment.fixedDate} 
                      />
                    )}
                    </div>
                    
                  </div>
                </div>
              );
            }
          )
        )}
      </div>
    </div>
  );
};

export default Appointments;
