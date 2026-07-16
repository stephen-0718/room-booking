import { Link } from "react-router-dom";

function Admin() {
  return (
    <div className="container fade-in">
      <div className="page-title">
        <h1>👨‍💼 Admin Dashboard</h1>
        <p>
          Manage hotels, rooms and bookings
        </p>
      </div>

      <div className="admin-grid">
        <Link
          to="/admin/add-hotel"
          className="admin-card hotel-admin"
        >
          <h1>🏨</h1>
          <h2>Add Hotel</h2>
          <p>
            Create new hotels
          </p>
        </Link>

        <Link
          to="/admin/add-room"
          className="admin-card room-admin"
        >
          <h1>🛏️</h1>
          <h2>Add Room</h2>
          <p>
            Create hotel rooms
          </p>
        </Link>

        <Link
          to="/admin/bookings"
          className="admin-card booking-admin"
        >
          <h1>📋</h1>
          <h2>Bookings</h2>
          <p>
            View all bookings
          </p>
        </Link>

        <Link
          to="/dashboard"
          className="admin-card stats-admin"
        >
          <h1>📊</h1>
          <h2>Statistics</h2>
          <p>
            View analytics
          </p>
        </Link>
      </div>
    </div>
  );
}

export default Admin;