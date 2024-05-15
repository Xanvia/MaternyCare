import SearchIcon from "@mui/icons-material/Search";

const Dashboard = () => {
  return (
    <div className="w-3/5 mx-11 my">
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
    </div>
  );
};

export default Dashboard;
