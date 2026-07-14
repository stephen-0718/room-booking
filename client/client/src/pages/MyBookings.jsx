import { useEffect, useState } from "react";
import axios from "axios";
import Receipt from "../components/Receipt";
import "../receipt.css";

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const token =
        localStorage.getItem("token");

      const res = await axios.get(
        "http://localhost:5000/api/bookings/my-bookings",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setBookings(res.data.bookings);
    } catch (error) {
      console.log(error);
    }
  };

  const cancelBooking = async (bookingId) => {
    try {
      const token =
        localStorage.getItem("token");

      await axios.patch(
        `http://localhost:5000/api/bookings/${bookingId}/cancel`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Booking Cancelled");

      fetchBookings();
    } catch (error) {
      alert("Cancel Failed");
    }
  };

  return (
    <div className="container fade-in">
      <div className="page-title">
        <h1>📋 My Bookings</h1>

        <p>
          Manage your hotel reservations
        </p>
      </div>

      {bookings.length === 0 ? (
        <div className="empty-booking">
          <h2>No Bookings Found</h2>
        </div>
      ) : (
        bookings.map((booking) => (
          <div
            key={booking._id}
            className="booking-card"
          >
            <div className="booking-header">
              <h2>
                Room {booking.room.roomNumber}
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
                <strong>
                  Room Type
                </strong>

                <p>
                  {booking.room.roomType}
                </p>
              </div>

              <div>
                <strong>
                  Total Amount
                </strong>

                <p>
                  ₹{booking.totalAmount}
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
            </div>

            <div className="booking-actions">
              <button
                className="receipt-btn"
                onClick={() =>
                  setSelectedBooking(booking)
                }
              >
                🧾 View Receipt
              </button>

              {booking.status !==
                "Cancelled" && (
                <button
                  className="cancel-btn"
                  onClick={() =>
                    cancelBooking(
                      booking._id
                    )
                  }
                >
                  Cancel Booking
                </button>
              )}
            </div>
          </div>
        ))
      )}

      <Receipt
        booking={selectedBooking}
        onClose={() => setSelectedBooking(null)}
      />
    </div>
  );
}

export default MyBookings;