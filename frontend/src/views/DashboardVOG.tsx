import * as React from "react";
import PatientTable from "../components/PatientTable";
import RedPatientTable from "../components/RedPatientList";

const DashboardVOG = () => {
  return (
    <div>
      <h1 className="font-sans text-lg text-text_color_2 ml-5">
        Dashboard Overview
      </h1>
      {/* Red Patient List
      <div className="flex bg-white w-full justify-between items-center p-4">
        <div className="flex space-x-4">
          <button className="px-5">Red Patient List</button>
        </div>

        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search any keywords"
            className="border p-2 rounded-md shadow-sm w-52 bg-background text-sm"
          />
        </div>
      </div> */}
      {/* Red Patient List Table */}
      <div className="mt-5 px-4">
        <RedPatientTable />
      </div>
    </div>
  );
};

export default DashboardVOG;
