import { useState, useEffect } from 'react';

function getUserId() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const userDataString = localStorage.getItem("holiday-tracker-user");
    const userData = JSON.parse(userDataString);
    const userId = userData ? userData.id : null;
    setUserId(userId);
  }, []);

  return userId;
}

export default getUserId;
