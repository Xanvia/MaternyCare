import React from 'react';

interface AppointmentCardProps {
  year: number;
  month: string;
  start_day: number;
  end_day: number;
  title: string;  // appointment title or description
 
}
const AppointmentCard: React.FC<AppointmentCardProps> = ({year, month, start_day, end_day, title}) => {
  return (
    
    <div className='sm:w-36 w-full bg-white rounded-3xl pb-2'>
      <button  className='sm:w-36 w-full  items-center justify-center'>
        <div  className='flex flex-col items-center justify-center pt-1'>
          <header className='xs:text-base text-blue_primary mt-1 text-lg'>{year}</header>
          <header className='text-xl md:text-xl sm:text-lg xs:text-base text-pink_primary font-bold'>{month}</header>
        </div>
        <div className='flex justify-center w-full'>
          <hr className='mt-2 w-10/12 border-1 border-gray-300' />
        </div>
        <div className='flex flex-row items-center justify-center mt-2 m-2'>
          <div className='md:text-3xl sm:text-3xl xs:text-2xl text-3xl text-blue_primary font-bold'>{start_day}</div>
          <hr className='w-2 border-2 border-gray-300 mx-1'/>
          <div className='md:text-3xl sm:text-3xl xs:text-2xl text-3xl text-blue_primary font-bold'>{end_day}</div>
        </div>
        <header className=' flex mt-2 justify-center pb-1 text-pink_primary text-sm'>{title}</header>
      </button>
      
    </div>
  );
};

export default AppointmentCard;
