import React, { useState } from "react";
import { Search, Trash, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

type PatientStatus = "Completed" | "Incompleted";

interface Patient {
  id: number;
  patient: string;
  address: string;
  appointment: string;
  status?: PatientStatus;
}

const mockData: Patient[] = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  patient: `Mother ${i + 1}`,
  address: `${i + 1} Main St`,
  appointment: `2023-10-${(i % 30) + 1}`,
  status: i % 2 === 0 ? "Completed" : "Incompleted",
}));

export default function RedPatientTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // New states for delete confirmation modal
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [patientToDelete, setPatientToDelete] = useState<Patient | null>(null);

  const redPatientListData = mockData.filter((_, i) => i % 2 !== 0);

  // Handle delete button click to open the confirmation modal
  const handleDeleteClick = (patient: Patient) => {
    setPatientToDelete(patient);
    setIsDeleteModalOpen(true);
  };

  // Confirm and delete the selected patient
  const confirmDeletePatient = () => {
    if (patientToDelete) {
      setRedPatientListData(
        redPatientListData.filter((p) => p.id !== patientToDelete.id)
      );
      setPatientToDelete(null);
      setIsDeleteModalOpen(false);
      setCurrentPage(1);
    }
  };

  const filteredData = redPatientListData.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const pageCount = Math.ceil(filteredData.length / itemsPerPage);
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const statusColor = (status: PatientStatus) => {
    switch (status) {
      case "Completed":
        return "bg-green-100 text-green-800";
      case "Incompleted":
        return "bg-red-100 text-red-800";
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm border border-red-800 rounded-2xl hover:bg-gray-100">
            Red Patient List
          </button>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
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
      </div>
      <div className="overflow-x-auto border rounded">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-purple_secondary">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Address
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Appointment
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentData.map((row) => (
              <tr key={row.id} className="hover:bg-gray-100">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <Link
                    to={`/vogdashboard/patient/${row.id}`}
                    className="block w-full h-full"
                  >
                    {row.patient}
                  </Link>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.address}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {row.appointment}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColor(
                      row.status!
                    )}`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <button
                    className="text-red-600 hover:text-red-900"
                    aria-label="Remove patient"
                    onClick={() => handleDeleteClick(row)}
                  >
                    <Trash className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-700">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, filteredData.length)} of{" "}
          {filteredData.length} entries
        </p>
        <div className="flex items-center space-x-2">
          <button
            className="px-3 py-1 border rounded text-sm disabled:opacity-50"
            onClick={() => setCurrentPage((old) => Math.max(old - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="sr-only">Previous page</span>
          </button>
          <span className="text-sm font-medium">
            Page {currentPage} of {pageCount}
          </span>
          <button
            className="px-3 py-1 border rounded text-sm disabled:opacity-50"
            onClick={() =>
              setCurrentPage((old) => Math.min(old + 1, pageCount))
            }
            disabled={currentPage === pageCount}
          >
            <ChevronRight className="h-4 w-4" />
            <span className="sr-only">Next page</span>
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-medium text-gray-900 mb-4">
              Confirm Deletion
            </h2>
            <p className="text-gray-700 mb-6">
              Are you sure you want to delete this patient?
            </p>
            <div className="flex justify-end space-x-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                onClick={() => setIsDeleteModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                onClick={confirmDeletePatient}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
