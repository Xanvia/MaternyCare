import DashboardStatCard from "../components/DashboardStatCard";
import feet from "../assets/images/feet.svg";
import fire from "../assets/images/fire.svg";
import water from "../assets/images/drops.svg";
import PatientsList from "../components/PatientsList";
import React, { useEffect, useState } from "react";
import axios from "axios";
import useRoleProtection from "../customHooks/useRoleProtection";
import MotherCard from "../components/MotherCard";
import { toast, ToastContainer } from "react-toastify";

const DashboardPHM = () => {
  useRoleProtection("phm");

  const BASE_URL = "http://localhost:3000/";
  const storedToken = localStorage.getItem("token");
  const token = storedToken ? JSON.parse(storedToken) : null;

  interface Mother {
    id: number;
    nic: string;
    phone_number: number;
    mother_count: number;
    user: {
      firstName: string;
      lastName: string;
    };
    phm: {};
  }

  const [mothers, setMothers] = useState<Mother[]>([]);

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
      url: `${BASE_URL}users/phm/addMother`, // Assuming this is the API to add a mother to a PHM
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        motherID: motherID, // Send the NIC or any unique identifier for the mother
      },
    };

    axios(axiosConfig)
      .then((response) => {
        console.log("Mother added successfully:", response.data);
        toast.success("Mother added successfully!.");
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
          <DashboardStatCard
            image={feet}
            color="bg-[#F9B8D0]"
            count={5}
            title="Ratings"
            subtitle="/10"
          />
          <DashboardStatCard
            image={fire}
            color="bg-[#A8F0DB]"
            count={10}
            title="Checked"
            subtitle="patients"
          />
          <DashboardStatCard
            image={water}
            color="bg-[#80CAFF]"
            count={8}
            title="Unchecked"
            subtitle="patients"
          />
        </div>
        <div>
          <h1 className="text-lg my-4">Mother list in your area</h1>
          <div className="grid grid-cols-3 gap-y-4 gap-x-6 mb-5">
            {mothers.map((mother) => (
              <MotherCard
                key={mother.id}
                firstName={mother.user.firstName}
                lastName={mother.user.lastName}
                nic={mother.nic}
                location="New York, USA"
                onAdd={() => handleAddMother(mother.id)}
                phm={mother.phm}
              />
            ))}
          </div>
        </div>
        <div className="mt-12">
          <PatientsList mothers={mothers} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default DashboardPHM;
