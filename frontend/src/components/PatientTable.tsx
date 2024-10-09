import React, { useState } from 'react'
import { Search, Plus, Trash, ChevronLeft, ChevronRight } from 'lucide-react'
import AddMotherModal from '../modals/AddMotherModal'

type PatientStatus = 'Completed' | 'Incompleted'

interface Patient {
  id: number
  patient: string
  address: string
  appointment: string
  status: PatientStatus
}

type PatientList = 'motherList' | 'phmList' | 'pendingList'

const mockData: Record<PatientList, Patient[]> = {
  motherList: Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    patient: `Mother ${i + 1}`,
    address: `${i + 1} Main St`,
    appointment: `2023-10-${(i % 30) + 1}`,
    status: i % 2 === 0 ? 'Completed' : 'Incompleted' // Alternating between Completed and Incompleted
  })),
  phmList: Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    patient: `PHM Patient ${i + 1}`,
    address: `${i + 1} Oak St`,
    appointment: `2023-11-${(i % 30) + 1}`,
    status: i % 2 === 0 ? 'Completed' : 'Incompleted' // Alternating between Completed and Incompleted
  })),
  pendingList: Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    patient: `Pending ${i + 1}`,
    address: `${i + 1} Elm St`,
    appointment: `2023-12-${(i % 30) + 1}`,
    status: 'Incompleted' // Set to Incompleted
  })),
}

export default function PatientTable() {
  const [activeTab, setActiveTab] = useState<PatientList>('motherList')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const filteredData = mockData[activeTab].filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  const pageCount = Math.ceil(filteredData.length / itemsPerPage)
  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const statusColor = (status: PatientStatus) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-800'
      case 'Incompleted':
        return 'bg-red-100 text-red-800'
    }
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex rounded-t-lg overflow-hidden" style={{ backgroundColor: "#F5F5F5" }}>
        {(['motherList', 'phmList', 'pendingList'] as const).map((tab, index) => (
          <button
          key={tab}
          className={`flex-1 py-2 px-4 text-sm font-medium transition-colors duration-200
            ${activeTab === tab ? 'bg-purple_primary text-gray-800 border border-purple-600' : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-100'}
            rounded-full mx-1
          `}
          onClick={() => setActiveTab(tab)}
        >
          {tab.toUpperCase().replace('LIST', ' LIST')}
        </button>
        
        
        ))}
      </div>
      <div className="space-y-4">
        <div className="flex flex-col space-y-4 sm:flex-row sm:justify-between sm:space-y-0">
          <div className="flex flex-wrap gap-2">
            <button className="px-4 py-2 text-sm border border-gray-400 rounded-2xl hover:bg-gray-100">Patient List</button>
            <button className="px-4 py-2 text-sm border border-gray-400 rounded-2xl hover:bg-gray-100">Red Patient List</button>
            <button className="px-4 py-2 text-sm border border-red-600 rounded-2xl hover:bg-gray-100">Remove</button>
          </div>
          <div className="flex flex-wrap gap-2">
            <div className="relative flex-grow sm:flex-grow-0">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search patients..."
                className="pl-8 w-full border rounded py-2 px-3"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
              />
            </div>
            {/* <button className="px-4 py-2 text-sm bg-blue-500 text-white rounded hover:bg-blue-600">
              <Plus className="inline-block mr-2 h-4 w-4" /> Add
            </button> */}
            <AddMotherModal />
          </div>
        </div>
        <div className="overflow-x-auto border rounded">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appointment</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentData.map((row) => (
                <tr key={row.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.patient}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.address}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.appointment}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColor(row.status)}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-red-600 hover:text-red-900" aria-label="Remove patient">
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
            Showing {(currentPage - 1) * itemsPerPage + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} entries
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
              onClick={() => setCurrentPage((old) => Math.min(old + 1, pageCount))}
              disabled={currentPage === pageCount}
            >
              <ChevronRight className="h-4 w-4" />
              <span className="sr-only">Next page</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
