import { useEffect, useState } from "react";
import axios from "axios";
import PatientsList from "../components/PatientsList";
import { Mother } from "../components/Mother";

const PhmAppointment = () => {

  const BASE_URL = `${import.meta.env.VITE_API_URL}`;
  const token = (localStorage.getItem("token") || "").replace(/"/g, "").trim();
  
  let userItem = localStorage.getItem("user");
  const user = userItem ? JSON.parse(userItem) : null;
  const userId = user.id;


  // interface Mother {
  //   id: number;
  //   nic: string;
  //   phone_number: number;
  //   delivery_date: string;
  //   user: {
  //     firstName: string;
  //     lastName: string;
  //   };
  //   phm: {};
  //   appointments: {
  //     id: number;
  //     appointment_type: string;
  //     startDate: string;
  //     endDate: string;
  //     fixedDate: string;
  //     month: string;
  //     checkedByMother: boolean;
  //     checkedByPHM: boolean;
  //   }[];
  // }

  const [mothers, setMothers] = useState<Mother[]>([]);
  // const visibleMothers = isCollapsed ? mothers.slice(0, 3) : mothers;

  useEffect(() => {
    const getMothers = () => {
      const axiosConfig = {
        method: "get",
        url: `${BASE_URL}phm/user/mothers/${userId}`,
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

  return (
    <div className="mt-12">
      <PatientsList mothers={mothers} />
    </div>
  );
};

export default PhmAppointment;
