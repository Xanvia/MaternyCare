import React from "react";
import { useNavigate } from "react-router-dom";

interface Mother {
  id: number;
  nic: string;
  phone_number: number;
  mother_count: number;
  user: {
    firstName: string;
    lastName: string;
  };
  phm: {};
}

interface PatientsListProps {
  mothers: Mother[];
}
const PatientsList: React.FC<PatientsListProps> = ({ mothers }) => {
  const navigate = useNavigate();

  const handleButtonClick = ({ id }: { id: number }) => {
    navigate(`/mother-singleview/${id}`);
  };

  return (
    <div className="container mx-auto antialiased">
      <div className="py-4">
        <div>
          <h2 className="text-2xl font-semibold leading-tight">Appointments</h2>
        </div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    User
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Expected Date
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {mothers
                  .filter((mother) => mother.phm !== null)
                  .map((mother) => (
                    <tr>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <button
                          onClick={() => handleButtonClick({ id: mother.id })}
                        >
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
                          <a href="tel:+94776337406">{mother.phone_number}</a>
                        </p>
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <p className="text-gray-900 whitespace-no-wrap">
                          Jan 21 - Jan 28
                        </p>
                      </td>
                      <td className="px-5 py-5 bg-white text-sm">
                        <span className="relative inline-block px-3 py-1 font-semibold text-red-900 leading-tight">
                          <span
                            aria-hidden
                            className="absolute inset-0 bg-red-200 opacity-50 rounded-full"
                          ></span>
                          <span className="relative">Pending</span>
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
              <span className="text-xs xs:text-sm text-gray-900">
                Showing results from 2024 Jan - Mar
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default PatientsList;
