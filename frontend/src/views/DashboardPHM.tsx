import React, { useEffect, useState } from "react";
import fire from "../assets/images/fire.svg";
import water from "../assets/images/drops.svg";
// import PatientsList from "../components/PatientsList";
import axios from "axios";
import useRoleProtection from "../customHooks/useRoleProtection";
import MotherCard from "../components/MotherCard";
import { toast, ToastContainer } from "react-toastify";
import PhmDashboardStatCard from "../components/PhmDashboardCard";

const DashboardPHM = () => {
  useRoleProtection("phm");

  const BASE_URL = `${import.meta.env.VITE_API_URL}`;
  const storedToken = localStorage.getItem("token");
  const token = storedToken ? JSON.parse(storedToken) : null;
  // const [isCollapsed, setIsCollapsed] = useState(true);
  const [isPendingCollapsed, setIsPendingCollapsed] = useState(true);
  const [isVerifiedCollapsed, setIsVerifiedCollapsed] = useState(true);
  const [activeTab, setActiveTab] = useState("pending");

  interface Mother {
    id: number;
    nic: string;
    location: string;
    phone_number: number;
    mother_count: number;
    user: {
      firstName: string;
      lastName: string;
      isVerified: boolean;
      profilePic: string;
    };
    phm: {};
  }

  const [mothers, setMothers] = useState<Mother[]>([]);
  // const visibleMothers = isCollapsed ? mothers.slice(0, 3) : mothers;

  useEffect(() => {
    const getMothers = () => {
      const axiosConfig = {
        method: "get",
        url: `${BASE_URL}users/mother/all`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios(axiosConfig)
        .then((response) => {
          setMothers(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getMothers();
  }, [token]);

  const handleAddMother = (motherID: number) => {
    const axiosConfig = {
      method: "post",
      url: `${BASE_URL}users/phm/addMother`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        motherID: motherID,
      },
    };

    axios(axiosConfig)
      .then(() => {
        toast.success("Mother added successfully!");
        setTimeout(() => window.location.reload(), 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
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
          <PhmDashboardStatCard
            image={fire}
            color="bg-[#A8F0DB]"
            count={10}
            title="Checked"
            subtitle="patients"
          />
          <PhmDashboardStatCard
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
          </div>
        </div>
        <div>
          <h1 className="text-lg my-4">Mother list in your area</h1>
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
                {mothers
                  .filter((mother) => mother.phm == null)
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
                        location={mother.location}
                        onAdd={() => handleAddMother(mother.id)}
                        phm={mother.phm}
                        isVerified={mother.user.isVerified}
                        profilePic={mother.user.profilePic}
                      />
                    </div>
                  ))}
              </div>
              {mothers.filter((mother) => !mother.user.isVerified).length >=
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
                {mothers
                  .filter((mother) => mother.phm !== null)
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
                        location={mother.location}
                        onAdd={() => handleAddMother(mother.id)}
                        phm={mother.phm}
                        isVerified={mother.user.isVerified}
                        profilePic={mother.user.profilePic}
                      />
                    </div>
                  ))}
              </div>
              {mothers.filter((mother) => mother.user.isVerified).length >=
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
  );
};

export default DashboardPHM;
