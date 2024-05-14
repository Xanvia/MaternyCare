import React from "react";
import logo from "../assets/images/logo.png";

const LandingPage = () => {
  return (
    <div>
      <div className="flex flex-col justify-start items-center h-screen bg-[#F5F5F5]">
        <div className="mt-10">
          <img src={logo} alt="Materny Logo" className="w-24" />
        </div>

        
      </div>
    </div>
  );
};

export default LandingPage;
