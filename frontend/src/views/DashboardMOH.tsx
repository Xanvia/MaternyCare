import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import AddMotherModal from '../modals/AddMotherModal';
import CustomPaginationActionsTable from '../components/CustomPaginationActionsTable';
import PatientTable from '../components/PatientTable';

const DashboardMOH = () => {
  const [value, setValue] = React.useState('mother'); // Default tab is 'MOTHER LIST'

  const handleChange = (_event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <div>
      <h1 className='font-sans text-lg text-text_color_2 ml-5'>Dashboard Overview</h1>

      <PatientTable />
      {/* Tabs to switch between Mother, PHM, and Pending List */}
      {/* <div className='flex flex-row justify-center border-b mb-5 mt-8'>
        <Box sx={{ width: '100%' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="dashboard tabs"
            centered
          >
            <Tab value="mother" label="MOTHER LIST" />
            <Tab value="phm" label="PHM LIST" />
            <Tab value="pending" label="PENDING LIST" />
          </Tabs>
        </Box>
      </div> */}

      {/* Search bar and add mother button */}
      {/* <div className="flex bg-white w-full justify-between items-center p-4">
        <div className="flex space-x-4">
          <button className="px-5">Patient List</button>
          <button className="px-5">Red Patient List</button>
          <button className="px-5">Remove</button>
        </div>

        <div className="flex items-center space-x-4">
          <input
            type="text"
            placeholder="Search any keywords"
            className="border p-2 rounded-md shadow-sm w-52 bg-background text-sm"
          />
          <AddMotherModal />
        </div>
      </div> */}

      {/* Tab Panels with the Custom Table */}
      {/* <div className="mt-5 px-4">
        {value === 'mother' && <CustomPaginationActionsTable />}
        {value === 'phm' && <CustomPaginationActionsTable />}
        {value === 'pending' && <CustomPaginationActionsTable />}
      </div> */}
    </div>
  );
};

export default DashboardMOH;
