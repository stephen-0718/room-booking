import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [data, setData] = useState({});

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/dashboard"
      );

      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container fade-in">
      <div className="page-title">
        <h1>📊 Dashboard</h1>
        <p>
          Overview of your Hotel Booking System
        </p>
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card hotels-card">
          <h1>🏨</h1>

          <h2>
            {data.totalHotels || 0}
          </h2>

          <p>Total Hotels</p>
        </div>

        <div className="dashboard-card rooms-card">
          <h1>🛏️</h1>

          <h2>
            {data.totalRooms || 0}
          </h2>

          <p>Total Rooms</p>
        </div>

        <div className="dashboard-card bookings-card">
          <h1>📋</h1>

          <h2>
            {data.totalBookings || 0}
          </h2>

          <p>Total Bookings</p>
        </div>

        <div className="dashboard-card cancelled-card">
          <h1>❌</h1>

          <h2>
            {data.cancelledBookings || 0}
          </h2>

          <p>Cancelled Bookings</p>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;