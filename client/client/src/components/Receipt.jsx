function Receipt({ booking, onClose }) {
  if (!booking) return null;

  const nights =
    (new Date(booking.checkOut) - new Date(booking.checkIn)) /
    (1000 * 60 * 60 * 24);

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-GB");

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="receipt-overlay" onClick={onClose}>
      <div
        className="receipt-box"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="receipt-content" id="receipt-print-area">
          <div className="receipt-header">
            <h2>🏨 Hotel Booking Receipt</h2>
            <p className="receipt-subtitle">
              Thank you for your booking!
            </p>
          </div>

          <div className="receipt-divider" />

          <div className="receipt-row">
            <span>Booking ID</span>
            <span>#{booking._id?.slice(-8).toUpperCase()}</span>
          </div>

          <div className="receipt-row">
            <span>Booked On</span>
            <span>{formatDate(booking.createdAt)}</span>
          </div>

          <div className="receipt-row">
            <span>Status</span>
            <span
              className={
                booking.status === "Cancelled"
                  ? "status-cancelled"
                  : "status-booked"
              }
            >
              {booking.status}
            </span>
          </div>

          <div className="receipt-divider" />

          <div className="receipt-row">
            <span>Hotel</span>
            <span>{booking.room?.hotel?.name || "-"}</span>
          </div>

          <div className="receipt-row">
            <span>Room</span>
            <span>
              Room {booking.room?.roomNumber} (
              {booking.room?.roomType})
            </span>
          </div>

          <div className="receipt-row">
            <span>Check In</span>
            <span>{formatDate(booking.checkIn)}</span>
          </div>

          <div className="receipt-row">
            <span>Check Out</span>
            <span>{formatDate(booking.checkOut)}</span>
          </div>

          <div className="receipt-row">
            <span>Nights</span>
            <span>{nights}</span>
          </div>

          <div className="receipt-row">
            <span>Price / Night</span>
            <span>₹{booking.room?.price}</span>
          </div>

          <div className="receipt-divider" />

          <div className="receipt-row receipt-total">
            <span>Total Amount</span>
            <span>₹{booking.totalAmount}</span>
          </div>
        </div>

        <div className="receipt-actions">
          <button className="receipt-print-btn" onClick={handlePrint}>
            🖨️ Print / Save as PDF
          </button>
          <button className="receipt-close-btn" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default Receipt;
