import React, { useState } from 'react';
import { Link } from 'react-router-dom';

interface Phm {
  phm_area: string;
  id: number;
  nic: string;
  phone_number: number;
  mother_count: number;
  user: {
    firstName: string;
    lastName: string;
    isVerified: boolean;
  } | null; // Allow null for safety
}

interface PhmTableProps {
  phms: Phm[];
}

const PhmTable: React.FC<PhmTableProps> = ({ phms }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredData = phms.filter((phm) =>
    [phm.user?.firstName, phm.user?.lastName, phm.phm_area, phm.phone_number?.toString()]
      .filter(Boolean)
      .some((value) =>
        value?.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex rounded-t-lg overflow-hidden" style={{ backgroundColor: "#F5F5F5" }}>
        <button className="flex-1 py-2 px-4 text-sm font-medium transition-colors duration-200 bg-purple_primary text-gray-800 border border-purple-600 rounded-2xl mx-1">
          PHM LIST
        </button>
      </div>
      <div className="space-y-4">
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">PHM Area</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact Number</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentData.map((phm) => (
                <tr key={phm.id} className="hover:bg-gray-100">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    <Link to={`/mohdashboard/phm/${phm.id}`} className="block w-full h-full">
                      {phm.user ? `${phm.user.firstName} ${phm.user.lastName}` : "Unknown User"}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{phm.phm_area || "Not Available"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{phm.phone_number || "N/A"}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{phm.id}</td>
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
    </div>
  );
};

export default PhmTable;
