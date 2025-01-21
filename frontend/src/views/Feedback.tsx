import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AddRatingModal from '../modals/AddRating';

interface Mother {
  age: number;
  appointments: {
    filter: any;
    length: number; 
    feedback: string;
  };
}

const BASE_URL = `${import.meta.env.VITE_API_URL}`;
const storedToken = localStorage.getItem('token');
const token = storedToken ? JSON.parse(storedToken) : null;

const Feedback: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [mothers, setMothers] = useState<Mother[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMothers = async () => {
      try {
        const response = await axios.get(`${BASE_URL}phm/mothers/${id}`, {
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
  }, [id]); // Add id as a dependency to ensure it only runs when id changes

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-3xl font-bold text-center mb-6">Feedbacks for PHM ID: {id}</h1>
      {mothers.length === 0 ? (
        <p className="text-gray-500 text-center">No mothers found for this ID.</p>
      ) : (
        <div className="bg-white divide-y divide-gray-200 rounded-lg shadow-lg">
          {mothers.map((mother, index) => (
            <div key={index} className="p-6">
              <h2 className="text-xl font-semibold mb-2">Mother {index + 1}</h2>
              {mother.appointments && mother.appointments.length > 0 ? (
                mother.appointments
                  .filter((appointment: { feedback: any; }) => appointment.feedback) // Filter appointments with feedback
                  .map((appointment: { feedback: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: number) => (
                    <div key={index} className="mb-4">
                      <p className="text-gray-700">
                        <span className="font-semibold">Feedback {index + 1}:</span> {appointment.feedback}
                      </p>
                    </div>
                  ))
              ) : (
                <p className="text-gray-500">No feedback available</p>
              )}
            </div>
          ))}
        </div>
      )}
      <div className="flex justify-center mt-6">
        <AddRatingModal phmId={parseInt(id!)} />
      </div>
    </div>
  );
};

export default Feedback;