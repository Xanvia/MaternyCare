import * as React from 'react';
// import Appointments from '../components/AppointmentGrid'; // Adjust the path as necessary
import AppointmentCard from '../components/AppointmentCard';

const App: React.FC = () => {
  return (
    <div className="mx-11 my ">
      {/* <Appointments /> */}
      <AppointmentCard />
    </div>
  );
};

export default App;
