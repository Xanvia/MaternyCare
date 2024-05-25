import React, { useState } from "react";
import { Edit, EyeIcon, EyeOffIcon } from "../assets/icons/Icons";

const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="mx-10 bg-white rounded-xl p-5 flex flex-col gap-8">
      <div className="border-solid border-2 rounded-lg md:py-2 px-5 sm:flex justify-between items-center py-5">
        <div className="flex flex-col items-center bg-white xs:flex-row xs:max-w-xl">
          <img
            className="object-cover w-24 rounded-full h-24"
            src="https://randomuser.me/api/portraits/women/94.jpg"
            alt=""
          />
          <div className="flex flex-col  justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-text_color_1 dark:text-white">
              Ushani Anuruddhika
            </h5>
            <p className="mb-1 font-normal text-text_color_2 dark:text-gray-400">
              30 years old
            </p>
            <p className="mb-1 font-normal text-text_color_2 dark:text-gray-400">
              Badulla, Srilanka
            </p>
          </div>
        </div>
        <button
          type="button"
          className="text-blue_primary hover:text-white border border-blue_primary hover:bg-blue_primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 text-center me-2 mb-2 h-1/2 w-full sm:w-auto"
        >
          <Edit className="mr-2 p-0.5" />
          Edit
        </button>
      </div>
      <div className="border-solid border-2 rounded-lg py-5 px-5 ">
        <div className="flex justify-between ">
          <h5 className="text-xl mb-5">Personal information</h5>
          <button
            type="button"
            className="text-blue_primary hover:text-white border border-blue_primary hover:bg-blue_primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 text-center me-2 mb-2 h-1/2 w-full sm:w-auto"
          >
            <Edit className="mr-2 p-0.5" />
            Edit
          </button>
        </div>
        <div className="grid grid-cols-2">
          <div className="text-text_color_2">
            <h5 className="">First Name</h5>
            <p className="font-semibold mt-2 mb-4">Ushani</p>
          </div>
          <div className="text-text_color_2">
            <h5 className="">Last Name</h5>
            <p className="font-semibold mt-2 mb-4">Anuruddhika</p>
          </div>
          <div className="text-text_color_2">
            <h5 className="">Email address</h5>
            <p className="font-semibold mt-2 mb-4">ushani123@gmail.com</p>
          </div>
          <div className="text-text_color_2">
            <h5 className="">Phone</h5>
            <p className="font-semibold mt-2 mb-4">(+94) 714530767</p>
          </div>
          <div className="text-text_color_2">
            <h5 className="">Age</h5>
            <p className="font-semibold mt-2 mb-4">30 years old</p>
          </div>
          <div className="text-text_color_2">
            <h5 className="">Bio</h5>
            <p className="font-semibold mt-2 mb-4">
              I'm currently working as a Teacher
            </p>
          </div>
        </div>
      </div>
      <div className="border-solid border-2 rounded-lg py-5 px-5 ">
        <div className="flex justify-between ">
          <h5 className="text-xl mb-5">Location information</h5>
          <button
            type="button"
            className="text-blue_primary hover:text-white border border-blue_primary hover:bg-blue_primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 text-center me-2 mb-2 h-1/2 w-full sm:w-auto"
          >
            <Edit className="mr-2 p-0.5" />
            Edit
          </button>
        </div>
        <div className="grid grid-cols-2">
          <div className="text-text_color_2">
            <h5 className="">Country</h5>
            <p className="font-semibold mt-2 mb-4">Srilanka</p>
          </div>
          <div className="text-text_color_2">
            <h5 className="">State / Province</h5>
            <p className="font-semibold mt-2 mb-4">Uva</p>
          </div>
          <div className="text-text_color_2">
            <h5 className="">City / District</h5>
            <p className="font-semibold mt-2 mb-4">Badulla</p>
          </div>
          <div className="text-text_color_2">
            <h5 className="">Postal Code</h5>
            <p className="font-semibold mt-2 mb-4">90048</p>
          </div>
          <div className="text-text_color_2">
            <h5 className="">GS Division Number</h5>
            <p className="font-semibold mt-2 mb-4">80B-ILUKTHENNA</p>
          </div>
        </div>
      </div>
      <div className="border-solid border-2 rounded-lg py-5 px-5 ">
        <div className="flex justify-between ">
          <h5 className="text-xl mb-5">Account information</h5>
          <button
            type="button"
            className="text-blue_primary hover:text-white border border-blue_primary hover:bg-blue_primary focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-1 text-center me-2 mb-2 h-1/2 w-full sm:w-auto"
          >
            <Edit className="mr-2 p-0.5" />
            Edit
          </button>
        </div>
        <div className="grid grid-cols-2">
          <div className="text-text_color_2">
            <h5 className="">User Name</h5>
            <p className="font-semibold mt-2 mb-4">Ushani</p>
          </div>
          <div className="text-text_color_2">
            <h5 className="">Password</h5>
            <div className="relative w-1/2">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="bg-gray-50 border border-none pl-0 text-gray-900 text-sm rounded-lg disabled:opacity-50 focus:ring-0 focus:outline-none w-full"
                value="qwerty123"
                required
              />
              <button
                type="button"
                className="absolute right-0 top-1/2 transform -translate-y-1/2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOffIcon className="h-5 w-5 text-gray-500" />
                ) : (
                  <EyeIcon className="h-5 w-5 text-gray-500" />
                )}
              </button>
            </div>
          </div>
          <div className="text-text_color_2">
            <h5 className="">Stage</h5>
            <p className="font-semibold mt-2 mb-4">Postnatal</p>
          </div>
          <div className="text-text_color_2">
            <h5 className="">Baby count</h5>
            <p className="font-semibold mt-2 mb-4">1</p>
          </div>
          <div className="text-text_color_2">
            <h5 className="">GS Division Number</h5>
            <p className="font-semibold mt-2 mb-4">80B-ILUKTHENNA</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
