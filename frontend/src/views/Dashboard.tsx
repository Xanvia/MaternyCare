import SearchIcon from "@mui/icons-material/Search";
import DashboardStatCard from "../components/DashboardStatCard";
import feet from "../assets/images/feet.svg";
import fire from "../assets/images/fire.svg";
import water from "../assets/images/drops.svg";
import LineChart from "../components/LineChart";

const Dashboard = () => {
  return (
    <div className="mx-11">
      <div className="flex justify-between ml-4 mt-7">
        <p className="hidden lg:block">
          Pages <span> / Dashboard</span>
        </p>

        <div className="lg:flex items-center relative hidden ">
          <SearchIcon className="absolute left-3 " />
          <input
            className="border-2 border-gray-300 bg-white h-10 pl-10 pr-16 rounded-lg text-sm focus:outline-none "
            type="search"
            name="search"
            placeholder="Search any keywords"
          />
        </div>
      </div>
      <h1 className="mt-9 mb-4 hidden lg:block">Dashboard Overview</h1>
      <h1 className="text-center text-3xl text-[#0D99FF] lg:hidden">
        Dashboard
      </h1>
      <div className="mt-14 lg:mt-0 h-44 px-8 py-5 text-white bg-[#BA97FE] rounded-2xl mb-8 w-auto">
        <h1 className="mb-2">
          Hello <span className="font-semibold">Ushani,</span>
        </h1>
        <p>
          Every new life brings endless possibilities. Embrace the journey with
          love and joy.{" "}
        </p>
      </div>
      <div className="grid  sm:grid-cols-3 grid-cols-2 gap-8">
        <DashboardStatCard
          image={feet}
          color="bg-[#F9B8D0]"
          count={5}
          title="Kick Count"
          subtitle="kicks"
        />
        <DashboardStatCard
          image={fire}
          color="bg-[#A8F0DB]"
          count={78}
          title="Heart Rate"
          subtitle="bpm"
        />
        <DashboardStatCard
          image={water}
          color="bg-[#80CAFF]"
          count={8}
          title="Water"
          subtitle="litres"
        />
      </div>
      <div className="mt-12">
        <LineChart />
      </div>
    </div>
  );
};

export default Dashboard;
