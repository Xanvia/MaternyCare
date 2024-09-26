import { useEffect, useState } from "react";
import axios from "axios";
import { Rings } from "react-loader-spinner";
import AddAppointmentModal from "../modals/AddAppointmentModal";

const Appointments = () => {
  const BASE_URL = "http://localhost:3000/";
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
//   const colors = ["#BA97FE", "#0D99FF", "#F580AB", "#F1CB3A", "#3AF16C"];

  useEffect(() => {
    const getAppointments = () => {
      setLoading(true);
      const axiosConfig = {
        method: "get",
        url: `${BASE_URL}appointments`,
        // headers: {
        //   Authorization: `Bearer`,
        // },
      };
      axios(axiosConfig)
        .then((response) => {
          console.log(response.data);
          setAppointments(response.data);
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
      <div className="flex justify-between my-4 items-center ">
        <h1 className="mt-9 mb-4">Appointments</h1>
        <div className="flex justify-end">
          <AddAppointmentModal />
        </div>
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
          appointments.map(
            (
              appointment: {
                appointment_type: string;
                startDate: string;
                endDate: string;
                month: string;
              },
              index: number
            ) => {
            

              return (
                <div key={index} className='sm:w-36 w-full bg-white rounded-3xl pb-2'>
                <button  className='sm:w-36 w-full  items-center justify-center'>
                    <div  className='flex flex-col items-center justify-center pt-1'>
                    <header className='xs:text-base text-blue_primary mt-1 text-lg'>{2024}</header>
                    <header className='text-xl md:text-xl sm:text-lg xs:text-base text-pink_primary font-bold'>{appointment.month}</header>
                    </div>
                    <div className='flex justify-center w-full'>
                    <hr className='mt-2 w-10/12 border-1 border-gray-300' />
                    </div>
                    <div className='flex flex-row items-center justify-center mt-2 m-2'>
                    <div className='md:text-3xl sm:text-3xl xs:text-2xl text-3xl text-blue_primary font-bold'>{appointment.startDate}</div>
                    <hr className='w-2 border-2 border-gray-300 mx-1'/>
                    <div className='md:text-3xl sm:text-3xl xs:text-2xl text-3xl text-blue_primary font-bold'>{appointment.endDate}</div>
                    </div>
                    <header className=' flex mt-2 justify-center pb-1 text-pink_primary text-sm'>{appointment.appointment_type}</header>
                </button>
                
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
