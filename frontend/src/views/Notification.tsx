import React from 'react'
import MOH from '../assets/images/moh.png';
import PHM from '../assets/images/phm.png';

const Notification = () => {
  return (
    <div className="flex flex-col justify-start items-center min-h-screen bg-background relative space-y-4 p-4">
      <div className="w-full max-w-2xl p-4 bg-purple_tertiary rounded-2xl shadow-md text-purple_primary flex">
        <img src={MOH} alt="MOH image" className="w-1/6 h-auto rounded-l-2xl" />
        <div className="w-2/3 p-4">
          {"Notification 1"}
        </div>
      </div>

      <div className="w-full max-w-2xl p-4 bg-pink_tertiary rounded-2xl shadow-md text-pink_primary flex">
        <img src={PHM} alt="PHM image" className="w-1/6 h-auto rounded-l-2xl" />
        <div className="w-2/3 p-4">
          {"Notification 2"}
        </div>
      </div>

      <div className="w-full max-w-2xl p-4 bg-blue_tertiary rounded-2xl shadow-md text-blue_primary flex">
      <img src={MOH} alt="MOH image" className="w-1/6 h-auto rounded-l-2xl" />
        <div className="w-2/3 p-4">
          {"Notification 3"}
        </div>
      </div>

      <div className="w-full max-w-2xl p-4 bg-green_tertiary rounded-2xl shadow-md text-green_primary flex">
      <img src={PHM} alt="PHM image" className="w-1/6 h-auto rounded-l-2xl" />
        <div className="w-2/3 p-4">
          {"Notification 4"}
        </div>
      </div>
    </div>
  );
}

export default Notification;