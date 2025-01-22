import DashboardStatCard from "../components/DashboardStatCard";
import feet from "../assets/images/feet.svg";
import fire from "../assets/images/fire.svg";
import water from "../assets/images/drops.svg";
// import LineChart from "../components/LineChart";
import { useEffect, useState } from "react";
import KickCountUpdateModal from "../modals/KickCountUpdateModal";
import HeartRateUpdate from "../modals/HeartRateUpdate";
// import WaterAmountUpdate from "../modals/WaterAmountUpdate";
// import { HeartRateContext } from "../contexts/HeartRateContextProvider";
import axios from "axios";

import useRoleProtection from "../customHooks/useRoleProtection";
import { quotes } from "../data/Data";
import BasicDetailsPreview from "./forms/BasicDetailsPreview";
import { NoticesIcon, ReportProblem } from "../assets/icons/Icons";
import ReportHealthIssueModal from "../modals/ReportHealthIssueModal";
import PregnancyBMIChart from "../components/PregnancyBMIChart";
import SFHChart from "../components/SFHChart";
import Phmstatcard from "../modals/Phmstatcard";
import { useNavigate } from "react-router-dom";

interface Mother {
  id: number;
  fetal_heart_rate: number;
  kick_count: number[];
}
interface Phm {
  result: {
    email: string;
    firstName: string;
    phoneNumber: number;
  };
}

const MotherDashboard = () => {
  useRoleProtection("mother");

  // const heartRateContext = useContext(HeartRateContext);
  // const heartRate = heartRateContext?.heartRate;
  const [random, setRandom] = useState(0);

  let name = "";
  // let role = localStorage.getItem("role");
  let userItem = localStorage.getItem("user");
  const user = userItem ? JSON.parse(userItem) : null;

  const BASE_URL = `${import.meta.env.VITE_API_URL}`;
  const storedToken = localStorage.getItem("token");
  const token = storedToken ? JSON.parse(storedToken) : null;

  const [mother, setMother] = useState<Mother>();
  const [phm, setPhm] = useState<Phm>();
  const [heartRate, setHeartRate] = useState<number>(0);

  const [count, setCount] = useState(0);
  interface KickCount {
    kickCount: number;
  }

  const [kickcounts, setKickcounts] = useState<KickCount[]>([]);
  const [openModal, setOpenModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setRandom(Math.floor(Math.random() * 4));
  }, []);

  useEffect(() => {
    const getMother = () => {
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

    getMother();
  }, []);
  useEffect(() => {
    const getHeartRate = async () => {
      if (!mother) return;
      try {
        const response = await axios.get(`${BASE_URL}device/data`, {
          params: { motherId: mother.id },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const latestData = response.data.data[0];
        console.log("latestData: ", response.data);
        setHeartRate(latestData.heartRate);
      } catch (err) {
        console.log(err);
      }
    };
    console.log("motherid ", mother?.id);
    getHeartRate();
  }, [mother, token]);

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
          console.log("phm: ", response.data.result);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getPhm();
  }, [mother]);

  const getKickCount = () => {
    if (!mother) return;
    const axiosConfig = {
      method: "get",
      url: `${BASE_URL}mother/${mother.id}/kickcounts/`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios(axiosConfig)
      .then((response) => {
        setKickcounts(response.data);
        console.log("res: ", response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getKickCount();
  }, [mother]);

  console.log("kickcounts: ", kickcounts[kickcounts.length - 1]?.kickCount);

  useEffect(() => {
    setCount(kickcounts[kickcounts.length - 1]?.kickCount);
  }, [kickcounts]);

  console.log("phm: ", phm);

  return (
    <div className="mx-11">
      {phm?.result && (
        <>
          <div className="w-full justify-end flex ">
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
            phm={phm.result}
            phoneNumber={phm?.result?.phoneNumber ?? ""}
            firstName={phm?.result?.firstName ?? ""}
          />
        </>
      )}

      <div className="mt-14 lg:mt-0 h-auto min-h-44 px-8 py-5 text-white bg-[#BA97FE] rounded-2xl mb-8 w-auto">
        <h1 className="mb-2 text-lg">
          Hello{" "}
          <span className="">
            {user.firstName}.<span> 😃</span>
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
          count={count}
          title="Kick Count"
          subtitle="kicks"
          updateComponent={
            <KickCountUpdateModal motherId={mother ? mother.id : 0} />
          }
        />
        <DashboardStatCard
          image={fire}
          color="bg-[#A8F0DB]"
          count={heartRate}
          title="Heart Rate"
          subtitle="bpm"
          updateComponent={
            <HeartRateUpdate
              motherId={mother ? mother.id : 0}
              heartRateO={heartRate}
            />
          }
        />
        <Phmstatcard />
      </div>


      <div className="mt-12">
        {mother && <PregnancyBMIChart motherId={mother.id.toString()} />}
      </div>
      <div className="mt-6">
        {mother && <SFHChart motherId={mother.id.toString()} />}
      </div>
      <div className="py-6">
        <button
          onClick={() => navigate(`/mother/${mother?.id}/form-preview`)}
          className=" items-center px-4 py-2 flex bg-blue_primary text-white rounded-md hover:bg-blue_secondary"
        >
          <NoticesIcon className="mr-2" />
          Full Form Preview
        </button>{" "}
        {mother && <BasicDetailsPreview motherId={mother.id.toString()} />}
      </div>
    </div>
  );
};

export default MotherDashboard;
