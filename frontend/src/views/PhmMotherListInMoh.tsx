import React from 'react';
import { useParams } from 'react-router-dom';

const PhmMotherListInMoh = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div>
      <h1>Mother List for PHM</h1>
      <p>PHM ID: {id}</p>
      {/* Add your logic to fetch and display the mother list for the given PHM ID */}
    </div>
  );
};

export default PhmMotherListInMoh;