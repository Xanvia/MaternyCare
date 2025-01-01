import DashboardStatCard from "../components/DashboardStatCard";
import feet from "../assets/images/feet.svg";
import fire from "../assets/images/fire.svg";
import water from "../assets/images/drops.svg";
import LineChart from "../components/LineChart";
import { useEffect, useState, useContext } from "react";
import KickCountUpdateModal from "../modals/KickCountUpdateModal";
import HeartRateUpdate from "../modals/HeartRateUpdate";
// import WaterAmountUpdate from "../modals/WaterAmountUpdate";
import { HeartRateContext } from "../contexts/HeartRateContextProvider";
import axios from "axios";

import toTitleCase from "../components/CaseConverter";
import useRoleProtection from "../customHooks/useRoleProtection";
import { quotes } from "../data/Data";
import BasicDetailsPreview from "./forms/BasicDetailsPreview";
import { ReportProblem } from "../assets/icons/Icons";
import ReportHealthIssueModal from "../modals/ReportHealthIssueModal";

interface Mother {
  id: number;
  fetal_heart_rate: number;
  kick_count: number[];
}
interface Phm {
  firstName: string;
  email: string;
  phoneNumber: number;
}

const MotherDashboard = () => {
  useRoleProtection("mother");

  const heartRateContext = useContext(HeartRateContext);
  const heartRate = heartRateContext?.heartRate;
  const [random, setRandom] = useState(0);

  let name = "";
  let role = localStorage.getItem("role");
  let userItem = localStorage.getItem("user");
  const user = userItem ? JSON.parse(userItem) : null;

  const BASE_URL = "http://localhost:3000/";
  const storedToken = localStorage.getItem("token");
  const token = storedToken ? JSON.parse(storedToken) : null;

  const [mother, setMother] = useState<Mother>();
  const [phm, setPhm] = useState<Phm>();
  const [openModal, setOpenModal] = useState(false);

  if (user.firstName) {
    name = toTitleCase(user.firstName);
  } else {
    name = role ? (JSON.parse(role) as string) : "";
  }

  useEffect(() => {
    setRandom(Math.floor(Math.random() * 4));
  }, []);

  if (heartRateContext == null) {
    return;
  }
  console.log("tokennn", token);

  useEffect(() => {
    const getMothers = () => {
      const axiosConfig = {
        method: "get",
        url: `${BASE_URL}users/motherbyuser/${user.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios(axiosConfig)
        .then((response) => {
          setMother(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getMothers();
  }, []);

  useEffect(() => {
    const getPhm = () => {
      if (!mother) return;
      const axiosConfig = {
        method: "get",
        url: `${BASE_URL}users/phm/bymother/${mother.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios(axiosConfig)
        .then((response) => {
          setPhm(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getPhm();
  }, []);

  const kicks = mother?.kick_count[mother.kick_count.length - 1];
  console.log("kciksss", kicks);

  useEffect(() => {
    console.log("Updated kicks value:", kicks);
  }, []);

  return (
    <div className="mx-11">
      <div className="w-full justify-end flex ">
        {" "}
        <button
          className="flex items-center bg-red-500 text-white px-4 py-2 rounded mb-3"
          onClick={() => setOpenModal(true)}
        >
          <ReportProblem />
          <span className="ml-2">Report Health Issue</span>
        </button>
      </div>
      <ReportHealthIssueModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        phm={phm || { firstName: "", phoneNumber: 0 }}
      />

      <div className="mt-14 lg:mt-0 h-auto min-h-44 px-8 py-5 text-white bg-[#BA97FE] rounded-2xl mb-8 w-auto">
        <h1 className="mb-2 text-lg">
          Hello{" "}
          <span className="">
            {name}.<span> 😃</span>
          </span>
        </h1>
        <p className="text-2xl">
          <span className="text-3xl">❝</span> {quotes[random].text}
          <span className="text-3xl">❞</span>
        </p>
        <div className="w-full flex justify-end text-sm mt-3">
          {`– ${quotes[random].author}`}
        </div>
      </div>
      <div className="grid  sm:grid-cols-3 grid-cols-2 gap-8">
        <DashboardStatCard
          image={feet}
          color="bg-[#F9B8D0]"
          count={kicks ?? 0}
          title="Kick Count"
          subtitle="kicks"
          updateComponent={<KickCountUpdateModal />}
        />
        <DashboardStatCard
          image={fire}
          color="bg-[#A8F0DB]"
          count={heartRate ?? 0}
          title="Heart Rate"
          subtitle="bpm"
          updateComponent={<HeartRateUpdate />}
        />
        <DashboardStatCard
          image={water}
          color="bg-[#80CAFF]"
          count={8}
          title="Water Amount"
          subtitle="litres"
          // updateComponent=<WaterAmountUpdate />
        />
      </div>
      <div className="mt-12 h-96 w-auto">
        <LineChart />
      </div>
      <div className="py-6">
        <BasicDetailsPreview />
      </div>
    </div>
  );
};

export default MotherDashboard;
