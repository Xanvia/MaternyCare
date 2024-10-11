//import { useEffect, useState } from "react";
//import axios from "axios";
//import { Rings } from "react-loader-spinner";
//import AddAppointmentModal from "../modals/AddAppointmentModal";

import Checkbox from "@mui/material/Checkbox";


const Appointments = () => {


  return (
    <div className="mx-11 my ">
      <h1 className="mt-9 mb-4">Vaccine</h1>
      <div className="my-4 items-center">
          <div className="flex flex-row">
          <div className='sm:w-36 w-full bg-white rounded-3xl pb-2'>
            <button  className='sm:w-36 w-full  items-center justify-center mx-3'>
                  <div  className='flex flex-row items-center justify-center pt-1'>
                    <header className='xs:text-base text-blue_primary mt-1 text-lg'>{"Polio Vaccine"}</header>
                    <Checkbox
                      //checked={checked}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </div>
              </button>              
          </div> 


          {/* <div className='sm:w-36 w-full bg-white rounded-3xl pb-2'>
            <button  className='sm:w-36 w-full  items-center justify-center mx-3'>
                  <div  className='flex flex-row items-center justify-center pt-1'>
                    <header className='xs:text-base text-blue_primary mt-1 text-lg'>{"Polio Vaccine"}</header>
                    <Checkbox
                      //checked={checked}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </div>
              </button>              
          </div>      */}
        </div>    
      
         
        <h1 className="mt-9 mb-4">Appointments</h1>
          <div className='sm:w-36 w-full bg-white rounded-3xl pb-2'>
            <button  className='sm:w-36 w-full  items-center justify-center'>
                <div  className='flex flex-col items-center justify-center pt-1'>
                  <header className='xs:text-base text-blue_primary mt-1 text-lg'>{2024}</header>
                  <header className='text-xl md:text-xl sm:text-lg xs:text-base text-pink_primary font-bold'>{"November"}</header>
                </div>
                <div className='flex justify-center w-full'>
                  <hr className='mt-2 w-10/12 border-1 border-gray-300' />
                </div>
                <div className='flex flex-row items-center justify-center mt-2 m-2'>
                  <div className='md:text-3xl sm:text-3xl xs:text-2xl text-3xl text-blue_primary font-bold'>{25}</div>
                    <hr className='w-2 border-2 border-gray-300 mx-1'/>
                  <div className='md:text-3xl sm:text-3xl xs:text-2xl text-3xl text-blue_primary font-bold'>{29}</div>
                </div>
                  <header className=' flex mt-2 justify-center pb-1 text-pink_primary text-sm'>{"1st Home Vist"}</header>
              </button>
            </div>
      </div> 
    </div>
  );
};

export default Appointments;
