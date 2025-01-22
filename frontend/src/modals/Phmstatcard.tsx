import { useEffect, useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";

const BASE_URL = import.meta.env.VITE_API_URL;

export interface Mother {
  phone_number: string;
  phm_area: string;
  moh_division: string;
}

interface User {
  id: string | number;
}

export default function PhmStatCard() {
  const [mother, setMother] = useState<Mother | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userItem = localStorage.getItem("user");
  const user: User | null = userItem ? JSON.parse(userItem) : null;
  const token = localStorage.getItem("token");

  useEffect(() => {
    const getMother = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const response = await axios.get<Mother>(
          `${BASE_URL}statcard/${user?.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMother(response.data);
        console.log("Fetched mother data:", response.data);
      } catch (error) {
        const errorMessage = error instanceof Error 
          ? error.message 
          : "Failed to fetch mother data";
        setError(errorMessage);
        console.error("Error fetching mother data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user?.id) {
      getMother();
    } else {
      setIsLoading(false);
      setError("No user ID found");
    }
  }, [user?.id, token]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-full min-h-[200px]">
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex p-4 bg-red-50 text-red-600 rounded-lg items-center justify-center">
        Mother Not Verified Yet, <br />
        Please ask PHM to verify.
      </div>
    );
  }

  if (!mother) {
    return (
      <div className="p-4 bg-gray-50 text-gray-500 rounded-lg">
        No PHM data available
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">PHM Details</h2>
      <div className="space-y-3">
        <div className="flex items-center text-gray-700">
          <span className="font-medium w-32">Phone Number:</span>
          <a href={`tel:+94${mother.phone_number}`}>
          <span>{mother.phone_number}</span>
          </a>
        </div>
        <div className="flex items-center text-gray-700">
          <span className="font-medium w-32">PHM Area:</span>
          <span>{mother.phm_area}</span>
        </div>
        <div className="flex items-center text-gray-700">
          <span className="font-medium w-32">MOH Division:</span>
          <span>{mother.moh_division}</span>
        </div>
      </div>
    </div>
  );
}