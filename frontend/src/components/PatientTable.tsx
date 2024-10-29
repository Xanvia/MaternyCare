import React, { useState } from 'react'
import { Search, Plus, Trash, ChevronLeft, ChevronRight } from 'lucide-react'
import AddMotherModal from '../modals/AddMotherModal'

type PatientStatus = 'Completed' | 'Incompleted'

interface Patient {
  id: number
  patient: string
  address: string
  appointment: string
  status?: PatientStatus
}

type PatientList = 'motherList' | 'phmList' | 'pendingList'

const mockData: Record<PatientList, Patient[]> = {
  motherList: Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    patient: `Mother ${i + 1}`,
    address: `${i + 1} Main St`,
    appointment: `2023-10-${(i % 30) + 1}`,
    status: i % 2 === 0 ? 'Completed' : 'Incompleted'
  })),
  phmList: Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    patient: `PHM ${i + 1}`,
    address: `${i + 1} Oak St`,
    appointment: `2023-11-${(i % 30) + 1}`,
    status: i % 2 === 0 ? 'Completed' : 'Incompleted'
  })),
  pendingList: Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    patient: `Pending ${i + 1}`,
    address: `${i + 1} Elm St`,
    appointment: `2023-12-${(i % 30) + 1}`
  })),
}

export default function PatientTable() {
  const [activeTab, setActiveTab] = useState<PatientList>('motherList')
  const [motherSubList, setMotherSubList] = useState<'patientList' | 'redPatientList'>('patientList')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  // New states for delete and accept confirmation modals
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [isAcceptModalOpen, setIsAcceptModalOpen] = useState(false)
  const [patientToDelete, setPatientToDelete] = useState<Patient | null>(null)
  const [patientToAccept, setPatientToAccept] = useState<Patient | null>(null)

  const [patientListData, setPatientListData] = useState<Patient[]>(mockData['motherList'].filter((_, i) => i % 2 === 0))
  const [redPatientListData, setRedPatientListData] = useState<Patient[]>(mockData['motherList'].filter((_, i) => i % 2 !== 0))

  // Handle delete button click to open the confirmation modal
  const handleDeleteClick = (patient: Patient) => {
    setPatientToDelete(patient)
    setIsDeleteModalOpen(true)
  }

  // Confirm and delete the selected patient
  const confirmDeletePatient = () => {
    if (patientToDelete) {
      if (activeTab === 'motherList') {
        if (motherSubList === 'patientList') {
          setPatientListData(patientListData.filter((p) => p.id !== patientToDelete.id))
        } else if (motherSubList === 'redPatientList') {
          setRedPatientListData(redPatientListData.filter((p) => p.id !== patientToDelete.id))
        }
      } else {
        mockData[activeTab] = mockData[activeTab].filter((p) => p.id !== patientToDelete.id)
      }
      setPatientToDelete(null)
      setIsDeleteModalOpen(false)
      setCurrentPage(1)
    }
  }

  // Handle accept button click to open the confirmation modal
  const handleAcceptClick = (patient: Patient) => {
    setPatientToAccept(patient)
    setIsAcceptModalOpen(true)
  }

  // Confirm the accept action
  const confirmAcceptPatient = () => {
    if (patientToAccept) {
      setPatientListData((prev) => [...prev, { ...patientToAccept, status: 'Incompleted' }])
      mockData.pendingList = mockData.pendingList.filter((p) => p.id !== patientToAccept.id)
      setPatientToAccept(null)
      setIsAcceptModalOpen(false)
      setCurrentPage(1)
    }
  }

  const filteredData = (
    activeTab === 'motherList' 
      ? motherSubList === 'patientList'
        ? patientListData
        : redPatientListData
      : mockData[activeTab]
  ).filter((item) =>
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
        {(['motherList', 'phmList', 'pendingList'] as const).map((tab) => (
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
        <div className="flex justify-between items-center">
          {activeTab === 'motherList' && (
            <div className="flex gap-2">
              <button
                className={`px-4 py-2 text-sm border ${motherSubList === 'patientList' ? 'border-blue-800' : 'border-gray-300'} rounded-2xl hover:bg-gray-100`}
                onClick={() => setMotherSubList('patientList')}
              >
                Patient List
              </button>
              <button
                className={`px-4 py-2 text-sm border ${motherSubList === 'redPatientList' ? 'border-red-800' : 'border-gray-300'} rounded-2xl hover:bg-gray-100`}
                onClick={() => setMotherSubList('redPatientList')}
              >
                Red Patient List
              </button>
            </div>
          )}
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="pl-8 w-full border rounded py-2 px-3"
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value)
                  setCurrentPage(1)
                }}
              />
            </div>
            <AddMotherModal />
          </div>
        </div>
        <div className="overflow-x-auto border rounded">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-purple_secondary">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Address</th>
                {activeTab !== 'phmList' && (
                  <>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Appointment</th>
                    {activeTab !== 'pendingList' && (
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    )}
                  </>
                )}
                <th
                  className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                  colSpan={activeTab === 'pendingList' ? 2 : 1}  // Adjust colSpan based on activeTab
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {currentData.map((row) => (
                <tr key={row.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{row.patient}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.address}</td>
                  {activeTab !== 'phmList' && (
                    <>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{row.appointment}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                      {activeTab === 'pendingList' ? (
                        <button
                        onClick={() => handleAcceptClick(row)}
                        className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium"
                      >
                          Accept
                        </button>
                      ) : (
                        <span className={`px-2 py-1 text-xs font-semibold rounded-full ${statusColor(row.status!)}`}>
                          {row.status}
                        </span>
                      )}
                      </td>
                    </>
                  )}
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button className="text-red-600 hover:text-red-900" aria-label="Remove patient" onClick={() => handleDeleteClick(row)}>
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

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Confirm Deletion</h2>
            <p className="text-gray-700 mb-6">Are you sure you want to delete this patient?</p>
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

      {/* Accept Confirmation Modal */}
      {isAcceptModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Confirm Acceptance</h2>
            <p className="text-gray-700 mb-6">Are you sure you want to accept this patient?</p>
            <div className="flex justify-end space-x-2">
              <button className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300" onClick={() => setIsAcceptModalOpen(false)}>
                Cancel
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700" onClick={confirmAcceptPatient}>
                Accept
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
