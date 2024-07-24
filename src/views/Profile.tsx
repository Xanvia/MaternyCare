import { useState } from "react";
import { EyeIcon, EyeOffIcon } from "../assets/icons/Icons";
import EditPersonalInfo from "../modals/PersonalInfoEditPopup";
import EditAccountInfo from "../modals/AccountInfoEditPopup";
import EditLocationInfo from "../modals/LocationInfoEditPopup";
import ToTitle from "../components/CaseConverter";

const Profile = () => {
  const [showPassword, setShowPassword] = useState(false);
  let userItem = localStorage.getItem("user");
  const user = userItem ? JSON.parse(userItem) : null;

  return (
    <div className="xs:mx-10 mx-3 bg-white rounded-xl p-5 flex flex-col gap-8">
      <div className="border-solid border-2 rounded-lg md:py-2 px-5 sm:flex justify-between items-center py-5">
        <div className="flex flex-col items-center bg-white xs:flex-row xs:max-w-xl">
          <img
            className="object-cover w-24 rounded-full h-24"
            src="https://randomuser.me/api/portraits/women/94.jpg"
            alt=""
          />
          <div className="flex flex-col  justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-text_color_1 dark:text-white">
              {`${user.firstName} ${user.lastName}`}
            </h5>
            <p className="mb-1 font-normal text-text_color_2 dark:text-gray-400">
              30 years old
            </p>
            <p className="mb-1 font-normal text-text_color_2 dark:text-gray-400">
              Badulla, Srilanka
            </p>
          </div>
        </div>
      </div>
      <div className="border-solid border-2 rounded-lg py-5 px-5 ">
        <div className="flex justify-between items-center">
          <h5 className="text-xl mb-5">Personal information</h5>
          <EditPersonalInfo />
        </div>
        <div className="grid xs:grid-cols-2 grid-cols-1">
          <div className="text-text_color_2">
            <h5 className="">First Name</h5>
            <p className="font-semibold mt-2 mb-4">{ToTitle(user.firstName)}</p>
          </div>
          <div className="text-text_color_2">
            <h5 className="">Last Name</h5>
            <p className="font-semibold mt-2 mb-4">{ToTitle(user.lastName)}</p>
          </div>
          <div className="text-text_color_2">
            <h5 className="">Email address</h5>
            <p className="font-semibold mt-2 mb-4">{user.email}</p>
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
          <EditLocationInfo />
        </div>
        <div className="grid xs:grid-cols-2 grid-cols-1">
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
          <EditAccountInfo />
        </div>
        <div className="grid xs:grid-cols-2 grid-cols-1">
          <div className="text-text_color_2">
            <h5 className="">User Name</h5>
            <p className="font-semibold mt-2 mb-4">{ToTitle(user.firstName)}</p>
          </div>
          <div className="text-text_color_2 pr-4 xs:pr-0">
            <h5 className="">Password</h5>
            <div className="relative w-full xs:w-1/2">
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
