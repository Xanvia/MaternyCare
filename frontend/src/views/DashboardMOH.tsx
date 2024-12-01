import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AddMotherModal from '../modals/AddMotherModal';
import CustomPaginationActionsTable from '../components/CustomPaginationActionsTable';
import PatientTable from '../components/PatientTable';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from "react-toastify";
import PhmDashboardStatCard from "../components/PhmDashboardCard";
import fire from "../assets/images/fire.svg";
import water from "../assets/images/drops.svg";
import MohDashboardStatCard from '../components/MohDashboardCard';

const DashboardMOH = () => {
  const [value, setValue] = React.useState('mother'); // Default tab is 'MOTHER LIST'
  const BASE_URL = "http://localhost:3000/";
  const storedToken = localStorage.getItem("token");
  const token = storedToken ? JSON.parse(storedToken) : null;
  const [activeTab, setActiveTab] = useState("pending");
  const [isPendingCollapsed, setIsPendingCollapsed] = useState(true);
  const [isVerifiedCollapsed, setIsVerifiedCollapsed] = useState(true);

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  interface Phm {
    id: number;
    nic: string;
    phone_number: number;
    mother_count: number;
    user: {
      firstName: string;
      lastName: string;
      isVerified: boolean;
    };
    moh: {};
  }

  const [phms, setPhms] = useState<Phm[]>([]);

  useEffect(() => {
    const getPhms = () => {
      const axiosConfig = {
        method: "get",
        url: `${BASE_URL}users/phm/all`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios(axiosConfig)
        .then((response) => {
          setPhms(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getPhms();
  }, [token]);

  const handleAddPhm = (phmID: number) => {
    const axiosConfig = {
      method: "post",
      url: `${BASE_URL}users/moh/addPhm`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        phmID: phmID,
      },
    };

    axios(axiosConfig)
      .then((response) => {
        toast.success("PHM added successfully!");
        setTimeout(() => window.location.reload(), 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      {/* <h1 className='font-sans text-lg text-text_color_2 ml-5'>Dashboard Overview</h1>

      <PatientTable /> */}

<React.Fragment>
      <ToastContainer />
      <div className="mx-11">
        <div className="grid sm:grid-cols-3 grid-cols-2 gap-8 mb-5">
          {/* <DashboardStatCard
            image={feet}
            color="bg-[#F9B8D0]"
            count={5}
            title="Ratings"
            subtitle="/10"
          /> */}
          <MohDashboardStatCard
            image={fire}
            color="bg-[#A8F0DB]"
            count={10}
            title="Checked"
            subtitle="patients"
          />
          <MohDashboardStatCard
            image={water}
            color="bg-[#80CAFF]"
            count={8}
            title="Unchecked"
            subtitle="patients"
          />
          <div className="bg-white py-8 xs:px-6 px-4 h-42 rounded-lg">
            <div className="grid xs:grid-cols-2 grid-cols-1 gap-2 items-center">
              <div
                className={` xl:col-span-1 rounded-full bg-[#80CAFF] w-16 h-16 p-4 flex justify-center m-auto`}
              >
                <img src={fire} alt="Stat Icon" />
              </div>

              <div className="flex items-center llg:justify-start justify-center">
                <button className=" p-3 rounded-lg text-white hover:text-white bg-blue_primary hover:bg-blue_primary transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95">
                  Appointments
                </button>
              </div>
            </div>
            {/* <div className="flex justify-center mt-6">
        {updateComponent &&
          React.cloneElement(updateComponent as React.ReactElement<any>, {
            onUpdate: handleUpdate,
          })}
      </div> */}
          </div>
        </div>
        <div>
          <h1 className="text-lg my-4">PHM list in your area</h1>
          <div className="flex space-x-4 mb-4">
            <button
              onClick={() => setActiveTab("pending")}
              className={`p-2 rounded-lg ${
                activeTab === "pending"
                  ? "bg-blue_primary text-white"
                  : "bg-gray-200"
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setActiveTab("verified")}
              className={`p-2 rounded-lg ${
                activeTab === "verified"
                  ? "bg-blue_primary text-white"
                  : "bg-gray-200"
              }`}
            >
              Verified
            </button>
          </div>
          {/* <div className="grid grid-cols-3 gap-y-4 gap-x-6 mb-5">
            {activeTab === "pending" &&
              mothers
                .filter((mother) => !mother.user.isVerified)
                .map((mother, index) => (
                  <div
                    key={mother.id}
                    className={`transform transition-all duration-500 ease-in-out ${
                      index >= 3 && isPendingCollapsed
                        ? "h-0 opacity-0 scale-95 overflow-hidden"
                        : "h-auto opacity-100 scale-100"
                    }`}
                  >
                    <MotherCard
                      firstName={mother.user.firstName}
                      lastName={mother.user.lastName}
                      nic={mother.nic}
                      location="New York, USA"
                      onAdd={() => handleAddMother(mother.id)}
                      phm={mother.phm}
                      isVerified={mother.user.isVerified}
                    />
                  </div>
                  
                ))}
            {activeTab === "verified" &&
              mothers
                .filter((mother) => mother.user.isVerified)
                .map((mother, index) => (
                  <div
                    key={mother.id}
                    className={`transform transition-all duration-500 ease-in-out ${
                      index >= 3 && isVerifiedCollapsed
                        ? "h-0 opacity-0 scale-95 overflow-hidden"
                        : "h-auto opacity-100 scale-100"
                    }`}
                  >
                    <MotherCard
                      firstName={mother.user.firstName}
                      lastName={mother.user.lastName}
                      nic={mother.nic}
                      location="New York, USA"
                      onAdd={() => handleAddMother(mother.id)}
                      phm={mother.phm}
                      isVerified={mother.user.isVerified}
                    />
                  </div>
                ))}
          </div> */}
          {activeTab === "pending" && (
            <>
              <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-y-4 gap-x-6 mb-5">
                {phms
                  .filter((phm) => !phm.user.isVerified)
                  .map((phm, index) => (
                    <div
                      key={phm.id}
                      className={`transform transition-all duration-500 ease-in-out ${
                        index >= 3 && isPendingCollapsed
                          ? "h-0 opacity-0 scale-95 overflow-hidden"
                          : "h-auto opacity-100 scale-100"
                      }`}
                    >
                      <PhmCard
                        firstName={phm.user.firstName}
                        lastName={phm.user.lastName}
                        nic={phm.nic}
                        location="New York, USA"
                        onAdd={() => handleAddPhm(phm.id)}
                        phm={phm.moh}
                        isVerified={phm.user.isVerified}
                      />
                    </div>
                  ))}
              </div>
              {phms.filter((phm) => !phm.user.isVerified).length >=
                4 && (
                <button
                  onClick={() => setIsPendingCollapsed(!isPendingCollapsed)}
                  className="mt-4 p-3 rounded-lg text-white hover:text-white bg-blue_primary hover:bg-blue_primary transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
                >
                  {isPendingCollapsed ? "Show More" : "Show Less"}
                </button>
              )}
            </>
          )}
          {activeTab === "verified" && (
            <>
              <div className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-y-4 gap-x-6 mb-5">
                {phms
                  .filter((phm) => phm.user.isVerified)
                  .map((phm, index) => (
                    <div
                      key={phm.id}
                      className={`transform transition-all duration-500 ease-in-out ${
                        index >= 3 && isVerifiedCollapsed
                          ? "h-0 opacity-0 scale-95 overflow-hidden"
                          : "h-auto opacity-100 scale-100"
                      }`}
                    >
                      <PhmCard
                        firstName={phm.user.firstName}
                        lastName={phm.user.lastName}
                        nic={phm.nic}
                        location="New York, USA"
                        onAdd={() => handleAddPhm(phm.id)}
                        phm={phm.moh}
                        isVerified={phm.user.isVerified}
                      />
                    </div>
                  ))}
              </div>
              {phms.filter((phm) => phm.user.isVerified).length >=
                4 && (
                <button
                  onClick={() => setIsVerifiedCollapsed(!isVerifiedCollapsed)}
                  className="mt-4 p-3 rounded-lg text-white hover:text-white bg-blue_primary hover:bg-blue_primary transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
                >
                  {isVerifiedCollapsed ? "Show More" : "Show Less"}
                </button>
              )}
            </>
          )}
          {/* <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="mt-4 p-3 rounded-lg text-white hover:text-white bg-blue_primary hover:bg-blue_primary transition-all duration-300 ease-in-out transform hover:scale-105 active:scale-95"
          >
            {isCollapsed ? "Show More" : "Show Less"}
          </button> */}
        </div>
        {/* <div className="mt-12">
          <PatientsList mothers={mothers} />
        </div> */}
      </div>
    </React.Fragment>
      
    </div>
  );
};

export default DashboardMOH;
