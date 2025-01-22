import React, { useEffect, useState } from "react";
import { EyeIcon, EyeOffIcon } from "../assets/icons/Icons";
import PHMEditPersonalInfo from "../modals/PHMPersonalInfoEditPopup"; 
import PHMEditAccountInfo from "../modals/PHMAccountInfoEditPopup"; 
import axios from "axios";
import { CircularProgress } from "@mui/material";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//import { faCamera } from "@fortawesome/free-solid-svg-icons";

interface PHM {
  user: {
    firstName: string;
    lastName: string;
    nic: string;
    email: string;
    password: string;
    profileImage?: string; 
  };
  phone_number: string;
  phm_id: string;
  phm_area: string;
  moh_division: string; 
}

const PHMProfile: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  //const [image, setImage] = useState<File | null>(null);
  //const fileInputRef = useRef<HTMLInputElement>(null);
  const [phm, setPHM] = useState<PHM>();
  const [loading, setLoading] = useState(false);
  let userItem = localStorage.getItem("user");
  const user = userItem ? JSON.parse(userItem) : null;

  const BASE_URL = `${import.meta.env.VITE_API_URL}`;
  const storedToken = localStorage.getItem("token");
  const token = storedToken ? JSON.parse(storedToken) : null;

  useEffect(() => {
    const getPHM = () => {
      setLoading(true);
      const axiosConfig = {
        method: "get",
        url: `${BASE_URL}users/phm/${user.id}`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios(axiosConfig)
        .then((response) => {
          setPHM(response.data);
        })
        .catch((err) => {
          console.error("Error fetching PHM data:", err);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    getPHM();
  }, [token]);
/*
  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      const formData = new FormData();
      formData.append("profileImage", file);

      try {
        const response = await axios.post(`${BASE_URL}users/upload`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        });
        setPHM((prevPHM) => prevPHM && {
          ...prevPHM,
          user: { ...prevPHM.user, profileImage: response.data.imageUrl },
        });
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };
*/
  if (loading) {
    return <CircularProgress />;
  }

  //const initials = `${phm?.user.firstName.charAt(0)}${phm?.user.lastName.charAt(0)}`;

  return (
    <div className="xs:mx-10 mx-3 bg-white rounded-xl p-5 flex flex-col gap-8">
      <div className="border-solid border-2 rounded-lg md:py-2 px-5 sm:flex justify-between items-center py-5">
        <div className="flex flex-col items-center bg-white xs:flex-row xs:max-w-xl relative">
{/*
          <div className="relative">
            {phm?.user.profileImage ? (
              <img
                className="object-cover w-24 rounded-full h-24"
                src={phm.user.profileImage}
                alt="Profile"
              />
            ) : (
              <div className="flex items-center justify-center w-24 h-24 bg-gray-300 rounded-full">
                <span className="text-3xl font-bold text-white">{initials}</span>
              </div>
            )}
            <button
              className="absolute bottom-0 right-0 bg-blue-500 text-white rounded-full px-2 py-1"
              onClick={() => fileInputRef.current?.click()}
            >
              <FontAwesomeIcon icon={faCamera} />
            </button>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />
          </div>
*/}
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-text_color_1 dark:text-white">
              {`${phm?.user?.firstName} ${phm?.user?.lastName}`}
            </h5>
            <p className="mb-1 font-normal text-text_color_2 dark:text-gray-400">
              Public Health Midwife (PHM)
            </p>
          </div>
        </div>
      </div>
      <div className="border-solid border-2 rounded-lg py-5 px-5 ">
        <div className="flex justify-between items-center">
          <h5 className="text-xl mb-5">Personal Information</h5>
          <PHMEditPersonalInfo />
        </div>
        <div className="grid xs:grid-cols-2 grid-cols-1">
          <div className="text-text_color_2">
            <h5 className="">First Name</h5>
            <p className="font-semibold mt-2 mb-4">{phm?.user?.firstName || "N/A"}</p>
          </div>
          <div className="text-text_color_2">
            <h5 className="">Last Name</h5>
            <p className="font-semibold mt-2 mb-4">{phm?.user?.lastName || "N/A"}</p>
          </div>
          
          <div className="text-text_color_2">
            <h5 className="">Phone</h5>
            <p className="font-semibold mt-2 mb-4">{phm?.phone_number || "N/A"}</p>
          </div>
          <div className="text-text_color_2">
            <h5 className="">PHM ID</h5>
            <p className="font-semibold mt-2 mb-4">{phm?.phm_id || "N/A"}</p>
          </div>
          <div className="text-text_color_2">
            <h5 className="">PHM Area</h5>
            <p className="font-semibold mt-2 mb-4">{phm?.phm_area || "N/A"}</p>
          </div>
          <div className="text-text_color_2">
            <h5 className="">MOH Division</h5>
            <p className="font-semibold mt-2 mb-4">{phm?.moh_division || "N/A"}</p>
          </div>
        </div>
      </div>
      <div className="border-solid border-2 rounded-lg py-5 px-5 ">
        <div className="flex justify-between ">
          <h5 className="text-xl mb-5">Account Information</h5>
          <PHMEditAccountInfo />
        </div>
        <div className="grid xs:grid-cols-2 grid-cols-1">
          <div className="text-text_color_2">
            <h5 className="">Email</h5>
            <p className="font-semibold mt-2 mb-4">{phm?.user?.email}</p>
          </div>
          <div className="text-text_color_2 pr-4 xs:pr-0">
            <h5 className="">Password</h5>
            <div className="relative w-full xs:w-1/2">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="bg-gray-50 border border-none pl-0 text-gray-900 text-sm rounded-lg disabled:opacity-50 focus:ring-0 focus:outline-none w-full"
                value={phm?.user?.password}
                required
              />
          <div className="text-text_color_2">
            <h5 className="">NIC</h5>
            <p className="font-semibold mt-2 mb-4">{phm?.user?.nic || "N/A"}</p>
          </div>
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
        </div>
      </div>
    </div>
  );
};

export default PHMProfile;