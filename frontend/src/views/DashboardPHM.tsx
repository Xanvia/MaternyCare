import DashboardStatCard from "../components/DashboardStatCard";
import feet from "../assets/images/feet.svg";
import fire from "../assets/images/fire.svg";
import water from "../assets/images/drops.svg";
import PatientsList from "../components/PatientsList";
import { useEffect, useState } from "react";
import axios from "axios";

const DashboardPHM = () => {
  const BASE_URL = "http://localhost:3000/";

  interface Phm {
    id: number;
    firstName: string;
    email: string;
    role: string;
  }

  const [phms, setPhms] = useState<Phm[]>([]);

  useEffect(() => {
    const getPhms = () => {
      // setLoading(true);
      const axiosConfig = {
        method: "get",
        url: `${BASE_URL}users`,
        // headers: {
        //   Authorization: `Bearer`,
        // },
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
        {phms.map(
          (phm) =>
            phm.role === "phm" && (
              <div key={phm.id}>
                <h1>{phm.firstName}</h1>
              </div>
            )
        )}
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
