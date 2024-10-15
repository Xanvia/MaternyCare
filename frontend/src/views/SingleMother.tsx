import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const SingleMother = () => {
  const { id } = useParams<{ id: string }>();
  const [mother, setMother] = useState<any>(null);
  const BASE_URL = "http://localhost:3000/";

  useEffect(() => {
    const fetchMother = async () => {
      try {
        const storedToken = localStorage.getItem("token");
        const token = storedToken ? JSON.parse(storedToken) : null;

        const response = await axios.get(`${BASE_URL}users/mother/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMother(response.data);
      } catch (error) {
        console.error("Error fetching mother data:", error);
      }
    };

    fetchMother();
  }, [id]);

  if (!mother) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Mother Details</h1>
      <p>
        Name: {mother.user.firstName} {mother.user.lastName}
      </p>
      <p>NIC: {mother.nic}</p>
      <p>Phone Number: {mother.phone_number}</p>
      {/* Add more fields as necessary */}
    </div>
  );
};

export default SingleMother;
