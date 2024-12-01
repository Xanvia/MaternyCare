import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AddMotherModal from '../modals/AddMotherModal';
import CustomPaginationActionsTable from '../components/CustomPaginationActionsTable';
import PatientTable from '../components/PatientTable';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const DashboardMOH = () => {
  const [value, setValue] = React.useState('mother'); // Default tab is 'MOTHER LIST'
  const BASE_URL = "http://localhost:3000/";
  const storedToken = localStorage.getItem("token");
  const token = storedToken ? JSON.parse(storedToken) : null;

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  interface Phm {
    id: number;
    nic: string;
    phone_number: number;
    mother_count: number;
    user: {
      firstName: string;
      lastName: string;
      isVerified: boolean;
    };
    moh: {};
  }

  const [phms, setPhms] = useState<Phm[]>([]);

  useEffect(() => {
    const getPhms = () => {
      const axiosConfig = {
        method: "get",
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

  const handleAddPhm = (phmID: number) => {
    const axiosConfig = {
      method: "post",
      url: `${BASE_URL}users/moh/addPhm`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        phmID: phmID,
      },
    };

    axios(axiosConfig)
      .then((response) => {
        toast.success("PHM added successfully!");
        setTimeout(() => window.location.reload(), 1000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <h1 className='font-sans text-lg text-text_color_2 ml-5'>Dashboard Overview</h1>

      <PatientTable />
      
    </div>
  );
};

export default DashboardMOH;
