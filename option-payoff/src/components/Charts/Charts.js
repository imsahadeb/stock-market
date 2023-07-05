import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Charts = () => {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/api/profile');
        console.log(response.data['44000'][0]);
        setProfileData(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {profileData ? (
        
        <div>
          <h1>{profileData.name}</h1>
          <h1>{profileData.mobile_number}</h1>
          <h1>{profileData.email_id}</h1>
          <h1>{profileData.fy_id}</h1>
          
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Charts;

