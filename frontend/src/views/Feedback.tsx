import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import CustomizedRating from '../modals/AddRating';

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
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
      <h1 className="text-2xl font-bold">Feedbacks for PHM ID: {id}</h1>
      {mothers.length === 0 ? (
        <p className="text-gray-500">No mothers found for this ID.</p>
      ) : (
        <div className="bg-white divide-y divide-gray-200 rounded-lg shadow">
          {mothers.map((mother, index) => (
            <div key={index} className="p-4">
              <p>
                <span className="font-semibold">Feedback:</span>{" "}
                {mother.appointments && mother.appointments.length > 0 ? (
                mother.appointments
                  .filter((appointment: { feedback: any; }) => appointment.feedback) // Filter appointments with feedback
                  .map((appointment: { feedback: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | null | undefined; }, index: number) => (
                    <p key={index}>
                      <span className="font-semibold">Feedback {index + 1}:</span>{" "}
                      {appointment.feedback}
                    </p>
                  ))
              ) : (
                <p>No feedback available</p>
              )}
              </p>
            </div>
          ))}
        </div>
      )}
      <CustomizedRating phmId={parseInt(id!)} />
    </div>
  );
};

export default Feedback;