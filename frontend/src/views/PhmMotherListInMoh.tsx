import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

interface Mother {
  id: number;
  firstName: string;
  lastName: string;
  nic: string;
  phone_number: number;
}

const BASE_URL = 'http://localhost:3000/';
const storedToken = localStorage.getItem('token');
const token = storedToken ? JSON.parse(storedToken) : null;

const PhmMotherListInMoh: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [mothers, setMothers] = useState<Mother[]>([]);
  const itemsPerPage = 10;

  // useEffect(() => {
  //   // Fetch the mother list based on the PHM ID
  //   const fetchMothers = async () => {
  //     try {
  //       const response = await fetch(`/api/mothers?phmId=${id}`);
  //       const data = await response.json();
  //       setMothers(data);
  //     } catch (error) {
  //       console.error('Error fetching mother list:', error);
  //     }
  //   };

  //   fetchMothers();
  // }, [id]);

  useEffect(() => {
    const getMothers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}phm/mothers/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMothers(response.data);
      } catch (error) {
        console.error('Error fetching mother list:', error);
      }
    };
  
    if (id) {
      getMothers();
    }
  }, [id, token]);
  

  // const filteredData = mothers.filter((mother) =>
  //   mother.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   mother.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   mother.nic.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   mother.phone_number.toString().includes(searchTerm.toLowerCase())
  // );

  const filteredData = mothers.filter((mother) => {
    const firstName = mother.firstName || "";
    const lastName = mother.lastName || "";
    const nic = mother.nic || "";
    const phoneNumber = mother.phone_number ? mother.phone_number.toString() : "";
  
    return (
      firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      nic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      phoneNumber.includes(searchTerm.toLowerCase())
    );
  });
  

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mx-auto p-4 space-y-4">
      {/* <h1>Mother List for PHM ID: {id}</h1> */}
      <div className="flex rounded-t-lg overflow-hidden" style={{ backgroundColor: "#F5F5F5" }}>
        <button className="flex-1 py-2 px-4 text-sm font-medium transition-colors duration-200 bg-purple_primary text-gray-800 border border-purple-600 rounded-2xl mx-1">
          Mother List for PHM ID: {id}
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">NIC</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Number</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.map((mother) => (
              <tr key={mother.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {mother.firstName} {mother.lastName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{mother.nic}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{mother.phone_number}</td>
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