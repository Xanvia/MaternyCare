import DashboardStatCard from "../components/DashboardStatCard";
import feet from "../assets/images/feet.svg";
import fire from "../assets/images/fire.svg";
import water from "../assets/images/drops.svg";
import PatientsList from "../components/PatientsList";
import { useEffect, useState } from "react";
import axios from "axios";
import useRoleProtection from "../customHooks/useRoleProtection";

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
      <div>
        <h1 className="text-lg">
          List of mothers (for testing axios fetching)
        </h1>
        <div className="grid grid-cols-5 gap-2 mb-5">
          {phms.map((phm) => (
            <div
              className="bg-green-200 h-10 flex items-center justify-center"
              key={phm.id}
            >
              <h1>{phm.user.firstName}</h1>
            </div>
          ))}
        </div>
      </div>
      <div className="grid  sm:grid-cols-3 grid-cols-2 gap-8">
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
      <div className="mt-12">
        <PatientsList />
      </div>
    </div>
  );
};

export default DashboardPHM;
