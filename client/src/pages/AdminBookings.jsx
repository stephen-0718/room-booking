import { useEffect, useState } from "react";
import api from "../services/api";

function AdminBookings() {
  const [bookings, setBookings] =
    useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await api.get(
        "/api/bookings"
      );

      setBookings(
        res.data.bookings
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container fade-in">
      <div className="page-title">
        <h1>📋 All Bookings</h1>
      </div>

      {bookings.map((booking) => (
        <div
          key={booking._id}
          className="booking-card"
        >
          <div className="booking-header">
            <h2>
              Room {
                booking.room?.roomNumber
              }
            </h2>

            <span
              className={
                booking.status ===
                "Cancelled"
                  ? "status-cancelled"
                  : "status-booked"
              }
            >
              {booking.status}
            </span>
          </div>

          <div className="booking-grid">
            <div>
              <strong>User</strong>
              <p>
                {
                  booking.user?.name
                }
              </p>
            </div>

            <div>
              <strong>
                Check In
              </strong>
              <p>
                {new Date(
                  booking.checkIn
                ).toLocaleDateString()}
              </p>
            </div>

            <div>
              <strong>
                Check Out
              </strong>
              <p>
                {new Date(
                  booking.checkOut
                ).toLocaleDateString()}
              </p>
            </div>

            <div>
              <strong>
                Amount
              </strong>
              <p>
                ₹
                {
                  booking.totalAmount
                }
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AdminBookings;