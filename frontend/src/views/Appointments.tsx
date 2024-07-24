import * as React from 'react';
// import Appointments from '../components/AppointmentGrid'; // Adjust the path as necessary
import AppointmentCard from '../components/AppointmentCard';
import { appointments } from '../data/Data';

const App: React.FC = () => {
  return (
    <div className='flex justify-center'>
      <div className="w-full mx-11 my grid xl:grid-cols-5 lg:grid-cols-4 sm:grid-cols-3 md:grid-cols-4 xs:grid-cols-2 grid-cols-1 xs:gap-y-10 xs:gap-x-16 gap-y-5 xs:px-10 justify-center">
      {appointments.map((item)=>(
        <AppointmentCard year={item.year} month={item.month}  start_day={item.start_day} end_day={item.end_day} title={item.title}/>
        
      ))}
      </div>
    </div>
    
  );
};

export default App;
