import DashboardStatCard from "../components/DashboardStatCard";
import feet from "../assets/images/feet.svg";
import fire from "../assets/images/fire.svg";
import water from "../assets/images/drops.svg";
import PatientsList from "../components/PatientsList";
// import { useEffect, useState } from "react";

// const quotes = [
//   {
//     id: 1,
//     text: "The joy of motherhood comes in moments. There will be hard times and frustrating times. But amid the challenges, there are shining moments of joy and satisfaction.",
//     author: "M. Russell Ballard",
//   },
//   {
//     id: 1,
//     text: "Motherhood: All love begins and ends there.",
//     author: "Robert Browning",
//   },
//   {
//     id: 1,
//     text: "A mother’s arms are more comforting than anyone else’s.",
//     author: "Princess Diana",
//   },
//   {
//     id: 1,
//     text: "Being a mother is learning about strengths you didn’t know you had and dealing with fears you didn’t know existed.",
//     author: "Linda Wooten",
//   },
// ];

const DashboardPHM = () => {
  // const [random, setRandom] = useState(0);
  // useEffect(() => {
  //   setRandom(Math.floor(Math.random() * 4));
  // }, []);
  return (
    <div className="mx-11">
      {/* <div className="mt-14 lg:mt-0 h-auto min-h-44 px-8 py-5 text-white bg-[#BA97FE] rounded-2xl mb-8 w-auto">
        <h1 className="mb-2 text-lg">
          Hello{" "}
          <span className="">
            Ushani<span> 😃</span>
          </span>
        </h1>
        <p className="text-2xl">
          <span className="text-3xl">❝</span> {quotes[random].text}
          <span className="text-3xl">❞</span>
        </p>
        <div className="w-full flex justify-end text-sm mt-3">
          {`– ${quotes[random].author}`}
        </div>
      </div> */}
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
