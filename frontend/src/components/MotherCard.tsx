import React from "react";
import ToTitle from "./CaseConverter";
import { LocationIcon, PlusCircle, TickCircle } from "../assets/icons/Icons";

interface MotherCardProps {
  firstName: string;
  lastName: string;
  nic: string;
  location: string;
  onAdd: () => void;
  phm: {};
}

const MotherCard: React.FC<MotherCardProps> = ({
  firstName,
  lastName,
  nic,
  location,
  onAdd,
  phm,
}) => {
  const [isAdded, setIsAdded] = React.useState(false);

  const handleAddClick = () => {
    onAdd(); // Call the onAdd function passed from the parent
    setIsAdded(true); // Update UI state after adding
  };

  const handleRemoveClick = () => {
    // onAdd();
    setIsAdded(false); // Update UI state after adding
  };

  return (
    <div className="max-w-sm rounded-md overflow-hidden shadow-lg bg-white border border-gray-200 p-4">
      <div className="grid grid-cols-4 gap-6">
        <div className="flex justify-center items-center px-2 py-0 col-span-1">
          <div className="relative inline-flex items-center justify-center w-14 h-14 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
            <span className="font-medium text-xl text-gray-600 dark:text-gray-300">
              {`${ToTitle(firstName[0])} ${ToTitle(lastName[0])}`}
            </span>
          </div>
        </div>

        <div className="text-start col-span-2">
          <h2 className="text-xl font-semibold mb-1">{firstName}</h2>
          <p className="text-gray-600 ">NIC: {nic}</p>
          <p className="text-gray-600 mb-4">{location}</p>
        </div>

        <div className="flex items-center col-span-1">
          {phm == null ? (
            <button
              onClick={handleAddClick} // Handle button click
              className="bg-green_tertiary hover:bg-green_secondary text-green_primary font-semibold p-2 rounded w-auto"
            >
              <PlusCircle />
            </button>
          ) : (
            // <button
            //   className="bg-red-300 hover:bg-red-400 text-red-600 font-semibold p-2 rounded w-auto"
            //   onClick={handleRemoveClick}
            // >
            <TickCircle className="text-green_primary" />
            // </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MotherCard;
