import React, { useState, useEffect } from "react";
import { fetchUserData } from "../../actions/auth";
import { useDispatch } from "react-redux";
import { Typography, CircularProgress } from "@mui/material"; // Import Material-UI components


function App() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await dispatch(fetchUserData());
        setUserData(userData); // Save the fetched user data to state
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  if (loading) {
    return <CircularProgress />; // Show loading indicator while data is being fetched
  }

  return (
    <div className="dashboard">
      {userData && (
        <div className="user-info">
          <Typography variant="h2">Welcome back, {userData.name}!</Typography>
        </div>
      )}
    </div>
  );
}

export default App;
