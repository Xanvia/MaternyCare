import React from "react";

const Unauthorized = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-red-100">
      <div className="text-center border border-red-300 bg-red-100 p-8 rounded-lg shadow-lg max-w-md mx-4 md:mx-0">
        <h1 className="text-4xl font-bold text-red-700 mb-4">Unauthorized</h1>
        <p className="text-red-600 text-lg">
          You do not have the necessary permissions to access this page.
        </p>
      </div>
    </div>
  );
};

export default Unauthorized;
