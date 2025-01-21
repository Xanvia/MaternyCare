// import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
// import { toast } from 'react-toastify';
import useRoleProtection from '../customHooks/useRoleProtection';
import ProgressTable from '../components/ProgressTable';

const Progress = () => {
  useRoleProtection('moh');
  // const [value, setValue] = React.useState('mother'); // Default tab is 'MOTHER LIST'
  const BASE_URL = `${import.meta.env.VITE_API_URL}`;
  const storedToken = localStorage.getItem('token');
  const token = storedToken ? JSON.parse(storedToken) : null;
  // const [isPendingCollapsed, setIsPendingCollapsed] = useState(true);
  // const [isVerifiedCollapsed, setIsVerifiedCollapsed] = useState(true);
  // const [activeTab, setActiveTab] = useState('pending');

  interface Phm {
    star_points: number;
    phm_area: string;
    id: number;
    phone_number: number;
    mother_count: number;
    user: {
      firstName: string;
      lastName: string;
      isVerified: boolean;
      nic: string;
    } | null; // Allow null for safety
    moh: {};
  }

  const [phms, setPhms] = useState<Phm[]>([]);

  useEffect(() => {
    const getPhms = () => {
      const axiosConfig = {
        method: 'get',
        url: `${BASE_URL}users/phm/all`,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      axios(axiosConfig)
        .then((response) => {
          setPhms(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getPhms();
  }, [token]);

  // const handleAddPhm = (phmID: number) => {
  //   const axiosConfig = {
  //     method: 'post',
  //     url: `${BASE_URL}users/moh/addPhm`,
  //     headers: {
  //       Authorization: `Bearer ${token}`,
  //     },
  //     data: {
  //       phmID: phmID,
  //     },
  //   };

  //   axios(axiosConfig)
  //     .then(() => {
  //       toast.success('PHM added successfully!');
  //       setTimeout(() => window.location.reload(), 1000);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <div>
      <h1 className="font-sans text-lg text-text_color_2 ml-5">Progress Overview</h1>

      <ProgressTable phms = {phms}/>
    </div>
  );
};

export default Progress;
