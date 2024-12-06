import React from "react";
import { useNavigate } from "react-router-dom";
import { Mother } from "./Mother";

// interface Mother {
//   id: number;
//   nic: string;
//   phone_number: number;
//   location: string;
//   delivery_date: string;
//   user: {
//     firstName: string;
//     lastName: string;
//   };
//   phm: {};
//   appointments: {
//     id: number;
//     appointment_type: string;
//     startDate: string;
//     endDate: string;
//     fixedDate: string;
//     month: string;
//     checkedByMother: boolean;
//     checkedByPHM: boolean;
//   }[];
// }

interface PatientsListProps {
  mothers: Mother[];
}

const PatientsList: React.FC<PatientsListProps> = ({ mothers }) => {
  const navigate = useNavigate();

  const handleButtonClick = ({ id }: { id: number }) => {
    navigate(`/mother-appointment-singleview/${id}`);
  };

  // Helper function to get the latest fixed appointment
  const getLatestAppointment = (appointments: Mother["appointments"]) => {
    const today = new Date().setHours(0, 0, 0, 0); // Normalize to start of today
  
    const withFixedDateAfterToday = appointments
      .filter((appointment) => appointment.fixedDate && new Date(appointment.fixedDate).getTime() > today)
      .sort((a, b) => new Date(a.fixedDate).getTime() - new Date(b.fixedDate).getTime());
      
  
    if (withFixedDateAfterToday.length > 0) return withFixedDateAfterToday[0]; // Return the next fixed appointment
  
    const withStartDateAfterToday = appointments
      .filter((appointment) => new Date(appointment.startDate).getTime() > today)
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  
    return withStartDateAfterToday[0] || null; // Return the next start date appointment or null
  };

  return (
    <div className="container mx-auto antialiased">
      <div className="py-4">
        <div>
          <h2 className="text-2xl font-semibold leading-tight mx-12">Appointments</h2>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="flex flex-col justify-center inline-block min-w-11/12 shadow rounded-lg overflow-hidden mx-12">
          <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Address
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Expected Delivery Date
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Latest Appointment Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {mothers
                  .filter((mother) => mother.phm !== null)
                  .map((mother) => ({
                    ...mother,
                    latestAppointment: getLatestAppointment(mother.appointments),
                  }))
                  .sort((a, b) => {
                    const dateA = new Date(a.latestAppointment?.fixedDate || a.latestAppointment?.startDate || 0);
                    const dateB = new Date(b.latestAppointment?.fixedDate || b.latestAppointment?.startDate || 0);
                    return dateA.getTime() - dateB.getTime(); // Sort descending by date
                  })
                  .map((mother) => (
                    <tr key={mother.id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <button onClick={() => handleButtonClick({ id: mother.id })}>
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-10 h-10">
                              <img
                                className="w-full h-full rounded-full"
                                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.2&w=160&h=160&q=80"
                                alt=""
                              />
                            </div>
                            <div className="ml-3">
                              <p className="text-gray-900 whitespace-no-wrap">
                                {mother.user.firstName} {mother.user.lastName}
                              </p>
                            </div>
                          </div>
                        </button>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          <a href={`tel:${mother.phone_number}`}>{mother.location}</a>
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">{mother.delivery_date}</p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {mother.latestAppointment ? (
                          <div>
                            <p className="text-gray-900 whitespace-no-wrap">
                              {mother.latestAppointment.appointment_description || "No Fixed Appointment Yet"}
                            </p>
                            <p className="text-gray-500 whitespace-no-wrap">
                              {mother.latestAppointment.fixedDate || mother.latestAppointment.startDate}
                            </p>
                          </div>
                        ) : (
                          <p className="text-gray-500 whitespace-no-wrap">No appointments</p>
                        )}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>

            {/* <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
              <span className="text-xs xs:text-sm text-gray-900">
                Showing results from 2024 Jan - Mar
              </span>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientsList;
