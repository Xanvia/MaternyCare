import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

interface Mother {
  age: number;
  appointments: { 
      feedback: string;
  };
}

const BASE_URL = 'http://localhost:3000/';
const storedToken = localStorage.getItem('token');
const token = storedToken ? JSON.parse(storedToken) : null;

const Feedback: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [mothers, setMothers] = useState<Mother[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMothers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}users/mother/all`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMothers(response.data);
      } catch (error) {
        console.error('Error fetching feedbacks:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMothers();
    }
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log("huhfhf",mothers);

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1>Feedback for PHM ID: {id}</h1>
      <div className="bg-white divide-y divide-gray-200">
            {mothers.map((mother) => (
              // <tr key={feedback.id} className="hover:bg-gray-100">
              //   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
              //     {feedback.appointment.mother.firstName} {feedback.appointment.mother.lastName}
              //   </td>
              //   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{feedback.content}</td>
              // </tr>
              <div>
                {mother.appointments.feedback}
                {/* {mother.age} */}
              </div>
            ))}
      </div>
    </div>
  );
};

export default Feedback;