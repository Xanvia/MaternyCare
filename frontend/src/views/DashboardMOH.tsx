import React from 'react'
import { useEffect, useState } from "react";

const DashboardMOH = () => {
  return (
    <div>
      <h1 className='font-sans text-lg text-text_color_2 ml-5'>Dashboard Overview</h1>

      <div className='flex flex-row justify-center border-b mb-5 mt-5'>
        <button className='px-20 font-medium'>MOTHER LIST</button>
        <button className='px-20 font-medium'>PHM LIST</button>
        <button className='px-20 font-medium'>PENDING LIST</button>
      </div>

      <div className='flex bg-white'>
        <button className='px-5'>Patient List</button>
        <button className='px-5'>Red Patient List</button>
        <button className='px-5'>Remove</button>

        <input
        type="text"
        placeholder="Search any keywords"
        className="border p-2 rounded-md shadow-sm w-52 bg-background text-sm"
      />
      </div>
    </div>
    


//     <div className="bg-white p-6 rounded-md shadow-md">
//   <h1 className="text-customGray font-sans text-lg mb-4">Dashboard Overview</h1>

//   {/* Tab Navigation */}
//   <div className="flex border-b mb-5">
//     <button className="py-2 px-4 font-semibold text-blue-600 border-b-2 border-blue-600">
//       MOTHER LIST
//     </button>
//     <button className="py-2 px-4 font-semibold text-gray-400">
//       PHM LIST
//     </button>
//     <button className="py-2 px-4 font-semibold text-gray-400">
//       PENDING LIST
//     </button>
//   </div>

//   {/* Controls */}
//   <div className="flex justify-between items-center mb-4">
//     <div className="text-purple-600">
//       <span className="mr-4">Patient List</span>
//       <span className="text-red-600 cursor-pointer">Red Patient List</span>
//     </div>
//     <div className="flex items-center">
      // <input
      //   type="text"
      //   placeholder="Search any keywords"
      //   className="border p-2 rounded-md shadow-sm w-72"
      // />
//       <button className="bg-purple-500 text-white px-4 py-2 ml-4 rounded-md">
//         + Add
//       </button>
//     </div>
//   </div>

//   {/* Table */}
//   <div className="overflow-x-auto">
//     <table className="min-w-full bg-white border">
//       <thead>
//         <tr>
//           <th className="bg-purple-400 text-white px-4 py-2">Patients</th>
//           <th className="bg-purple-400 text-white px-4 py-2">Address</th>
//           <th className="bg-purple-400 text-white px-4 py-2">Appointment</th>
//           <th className="bg-purple-400 text-white px-4 py-2">Status</th>
//         </tr>
//       </thead>
//       <tbody>
//         {Array(6).fill(0).map((_, index) => (
//           <tr key={index} className="border-t">
//             <td className="px-4 py-2 text-gray-600">Patients</td>
//             <td className="px-4 py-2 text-gray-600">Address goes here.....</td>
//             <td className="px-4 py-2 text-gray-600">Appointment Description...</td>
//             <td className="px-4 py-2 text-gray-600 flex items-center justify-between">
//               Completed
//               <div className="w-6 h-6 bg-green-500 rounded-full"></div>
//             </td>
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// </div>

    
  );
}

export default DashboardMOH







// import DashboardStatCard from "../components/DashboardStatCard";
// import feet from "../assets/images/feet.svg";
// import fire from "../assets/images/fire.svg";
// import water from "../assets/images/drops.svg";
// import PatientsList from "../components/PatientsList";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import useRoleProtection from "../customHooks/useRoleProtection";

// const DashboardMOH = () => {
//   useRoleProtection("moh");

//   const BASE_URL = "http://localhost:3000/";

//   interface Moh {
//     id: number;
//     firstName: string;
//     email: string;
//     role: string;
//   }

//   const [mohs, setMohs] = useState<Moh[]>([]);

//   useEffect(() => {
//     const getMohs = () => {
//       // setLoading(true);
//       const axiosConfig = {
//         method: "get",
//         url: `${BASE_URL}users`,
//       };
//       axios(axiosConfig)
//         .then((response) => {
//           console.log("check: " + response.data);
//           setMohs(response.data);
//         })
//         .catch((err) => {
//           console.log(err);
//         })
//         .finally(() => {
//           // setLoading(false);
//         });
//     };

//     getMohs();
//   }, []);
//   return (
//     <div className="mx-11">
//       <div>
//         <h1 className="text-lg">
//           List of mothers (for testing axios fetching)
//         </h1>
//         <div className="grid grid-cols-5 gap-2 mb-5">
//           {mohs.map(
//             (moh) =>
//               moh.role === "mother" && (
//                 <div
//                   className="bg-green-200 h-10 flex items-center justify-center"
//                   key={moh.id}
//                 >
//                   <h1>{moh.firstName}</h1>
//                 </div>
//               )
//           )}
//         </div>
//       </div>
//       <div className="grid  sm:grid-cols-3 grid-cols-2 gap-8">
//         <DashboardStatCard
//           image={feet}
//           color="bg-[#F9B8D0]"
//           count={5}
//           title="Ratings"
//           subtitle="/10"
//         />
//         <DashboardStatCard
//           image={fire}
//           color="bg-[#A8F0DB]"
//           count={10}
//           title="Checked"
//           subtitle="patients"
//         />
//         <DashboardStatCard
//           image={water}
//           color="bg-[#80CAFF]"
//           count={8}
//           title="Unchecked"
//           subtitle="patients"
//         />
//       </div>
//       <div className="mt-12">
//         <PatientsList />
//       </div>
//     </div>
//   );
// };

// export default DashboardMOH;
