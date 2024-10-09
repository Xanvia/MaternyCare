import DashboardStatCard from "../components/DashboardStatCard";
import feet from "../assets/images/feet.svg";
import fire from "../assets/images/fire.svg";
import water from "../assets/images/drops.svg";
import PatientsList from "../components/PatientsList";
import { useEffect, useState } from "react";
import axios from "axios";
import useRoleProtection from "../customHooks/useRoleProtection";
import MotherCard from "../components/MotherCard";

const DashboardPHM = () => {
  useRoleProtection("phm");

  const BASE_URL = "http://localhost:3000/";
  const storedToken = localStorage.getItem("token");
  const token = storedToken ? JSON.parse(storedToken) : null;

  interface Phm {
    id: number;
    nic: string;
    phone_number: number;
    mother_count: number;
    user: {
      firstName: string;
      lastName: string;
    };
  }

  const [phms, setPhms] = useState<Phm[]>([]);

  useEffect(() => {
    const getPhms = () => {
      // setLoading(true);
      const axiosConfig = {
        method: "get",
        url: `${BASE_URL}users/mother/all`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios(axiosConfig)
        .then((response) => {
          console.log("check: " + response.data);
          setPhms(response.data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          // setLoading(false);
        });
    };

    getPhms();
  }, []);
  return (
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
        <h1 className="text-lg">
          List of mothers (for testing axios fetching)
        </h1>
        <div className="grid grid-cols-3 gap-2 mb-5">
          {phms.map((phm) => (
            <MotherCard
              firstName={phm.user.firstName}
              lastName={phm.user.lastName}
              nic={phm.nic}
              location="New York, USA"
              // profileImage="https://via.placeholder.com/150"
              // onAdd={handleAdd}
            />
          ))}
        </div>
      </div>
      <div className="mt-12">
        <PatientsList />
      </div>
    </div>
  );
};

export default DashboardPHM;
