import { useEffect, useState } from "react";
import axios from "axios";
import PatientsList from "../components/PatientsList";

const PhmAppointment = () => {

  const BASE_URL = "http://localhost:3000/";
  const token = (localStorage.getItem("token") || "").replace(/"/g, "").trim();
  console.log(token);
  let userItem = localStorage.getItem("user");
  const user = userItem ? JSON.parse(userItem) : null;
  const userId = user.id;

  console.log("user Id sahan"+user.id);

  interface Mother {
    id: number;
    nic: string;
    phone_number: number;
    user: {
      firstName: string;
      lastName: string;
      isVerified: boolean;
    };
    phm: {};
  }

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
