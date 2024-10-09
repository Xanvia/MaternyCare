import React from "react";
import ToTitle from "./CaseConverter";
import { LocationIcon, PlusCircle } from "../assets/icons/Icons";

interface MotherCardProps {
  firstName: string;
  lastName: string;
  nic: string;
  location: string;

  // profileImage: string;
  //   onAdd: () => void;
}

const MotherCard: React.FC<MotherCardProps> = ({
  firstName,
  lastName,
  nic,
  location,
  // profileImage,
  //   onAdd,
}) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white border border-gray-200 p-4">
      {/* <div className="bg-[#EAEEFD] flex justify-center items-center rounded-xl w-16 h-16 p-2">
        <div className="relative inline-flex items-center justify-center w-12 h-12 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
          <span className="font-medium text-xl text-gray-600 dark:text-gray-300">
            {`${ToTitle(firstName[0])} ${ToTitle(lastName[0])}`}
          </span>
        </div>
      </div>
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-2">{firstName}</h2>
        <p className="text-gray-600 mb-1">NIC: {nic}</p>
        <p className="text-gray-600 mb-4">Location: {location}</p>
        <button
          //   onClick={onAdd}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Add 
        </button>
      </div> */}

      <div className="grid grid-cols-4 gap-6">
        <div className="flex justify-center items-center  px-2 py-0 col-span-1">
          <div className="relative inline-flex items-center justify-center w-14 h-14 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-medium text-2xl text-gray-600 dark:text-gray-300">
              {`${ToTitle(firstName[0])} ${ToTitle(lastName[0])}`}
            </span>
          </div>
        </div>

        <div className="text-start col-span-2">
          <h2 className="text-xl font-semibold mb-2">{firstName}</h2>
          <p className="text-gray-600 mb-1">NIC: {nic}</p>
          <p className="text-gray-600 mb-4">
            <span>
              <LocationIcon />{" "}
            </span>
            {location}
          </p>
        </div>

        <div className="flex items-center col-span-1">
          {" "}
          <button
            //   onClick={onAdd}
            className="bg-green_tertiary hover:bg-green_secondary text-green_primary font-semibold p-2 rounded w-auto"
          >
            <PlusCircle />
          </button>
        </div>
      </div>
    </div>
  );
};

export default MotherCard;
