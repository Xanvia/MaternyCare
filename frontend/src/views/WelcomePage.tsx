import React from "react";
import { useNavigate } from "react-router-dom";

const WelcomePage: React.FC = () => {
  const navigate = useNavigate();

  const handleRegister = () => {
    navigate("/landing");
  };

  const handleLogin = () => {
    navigate("/login");
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-blue-100 to-blue-200 px-4">
      <div className="flex w-full max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl overflow-hidden">
        {/* Left Side Image */}
        <div className="w-1/2 hidden md:block">
          <img
            src="https://img.freepik.com/free-vector/cute-lovers-couple-pregnancy-characters-landscape_25030-39517.jpg?t=st=1731333500~exp=1731337100~hmac=d542c0efb3fe67162b2438b6e2539f515605036da010cb8fe9a8e82520a0b77f&w=740"
            alt="Maternycare"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Side Content */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to Maternycare
          </h1>
          <p className="text-gray-600 mb-8">
            Experience comprehensive care and guidance throughout your maternity
            journey with Maternycare.
          </p>

          {/* Buttons */}
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <button
              onClick={handleLogin}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              Login
            </button>
            <button
              onClick={handleRegister}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-6 rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              Register
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
