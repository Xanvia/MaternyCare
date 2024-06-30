import React from 'react';

const AppointmentCard: React.FC = () => {
  return (
    <div className='w-36 bg-white rounded-3xl'>
      <div className='flex flex-col items-center justify-center pt-1'>
        <header className='text-base text-blue_primary mt-1'>2024</header>
        <header className='text-xl md:text-xl sm:text-lg xs:text-base text-pink_primary font-bold'>November</header>
      </div>
      <div className='flex justify-center'>
        <hr className='mt-2 w-11/12 border-1 border-gray-300' />
      </div>
      <div className='flex flex-row items-center justify-center mt-2 m-2'>
        <div className='md:text-3xl sm:text-3xl xs:text-2xl text-blue_primary font-bold'>22</div>
        <hr className='w-2 border-2 border-gray-300 mx-1'/>
        <div className='md:text-3xl sm:text-3xl xs:text-2xl text-blue_primary font-bold'>29</div>
      </div>
      <header className=' flex mt-2 justify-center pb-1 text-pink_primary text-sm'>1st Home visit</header>
    </div>
  );
};

export default AppointmentCard;
