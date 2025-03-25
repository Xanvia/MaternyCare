import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Mother {
  phone_1: string;
  antenatal_risk_conditions: string;
  user: {
    firstName: string;
    lastName: string;
    nic: string;
  };
  id: number;
  address: string;
}

const BASE_URL = `${import.meta.env.VITE_API_URL}`;
const storedToken = localStorage.getItem('token');
const token = storedToken ? JSON.parse(storedToken) : null;

const PhmMotherListInMoh: React.FC = () => {
  const { id: phmId } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [mothers, setMothers] = useState<Mother[]>([]);
  const itemsPerPage = 10;

  useEffect(() => {
    const getMothers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}phm/mothers/${phmId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMothers(response.data);
      } catch (error) {
        console.error('Error fetching mother list:', error);
      }
    };

    if (phmId) {
      getMothers();
    }
  }, [phmId, token]);

  const filteredData = mothers.filter((mother) => {
    const firstName = mother.user.firstName || "";
    const lastName = mother.user.lastName || "";
    const nic = mother.address || "";
    const phoneNumber = mother.phone_1 || "";
    const antenatal_risk_conditions = mother.antenatal_risk_conditions || "";

    return (
      firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      phoneNumber.includes(searchTerm.toLowerCase()) ||
      antenatal_risk_conditions.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleRowClick = (motherId: number) => {
    navigate(`/mother/${motherId}/form-preview/`);
  };
  console.log(mothers);
  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex rounded-t-lg overflow-hidden" style={{ backgroundColor: "#F5F5F5" }}>
        <button className="flex-1 py-2 px-4 text-sm font-medium transition-colors duration-200 bg-purple_primary text-gray-800 border border-purple-600 rounded-2xl mx-1">
          Mother List for PHM ID: {phmId}
        </button>
      </div>
      <div className="flex justify-between items-center">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="pl-8 w-full border rounded py-2 px-3"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
      </div>
      <div className="overflow-x-auto border rounded">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-purple_secondary">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Conditions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Number</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.map((mother) => (
              <tr
                key={mother.id}
                className="hover:bg-gray-100 cursor-pointer"
                onClick={() => handleRowClick(mother.id)}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {mother.user.firstName} {mother.user.lastName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{mother.address}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{mother.antenatal_risk_conditions}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{mother.phone_1}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-700">
          Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} results
        </p>
        <div className="flex space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageCount))}
            className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhmMotherListInMoh;