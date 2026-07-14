import { useEffect, useState } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Converts a JS Date object to "yyyy-mm-dd" so the backend/DB
// always stores dates in a proper, sortable ISO format.
// (dd/mm/yyyy is only used for what the user SEES on screen.)
const toISODate = (date) => {
  if (!date) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [checkIn, setCheckIn] = useState(null);
  const [checkOut, setCheckOut] = useState(null);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/rooms"
      );

      setRooms(res.data.rooms);
    } catch (error) {
      console.log(error);
    }
  };

  const calculateNights = () => {
    if (!checkIn || !checkOut) return 0;

    const diffTime = checkOut - checkIn;

    return diffTime / (
      1000 * 60 * 60 * 24
    );
  };

  const bookRoom = async (roomId) => {
    try {
      if (!checkIn || !checkOut) {
        alert(
          "Please select check-in and check-out dates"
        );
        return;
      }

      const token =
        localStorage.getItem("token");

      await axios.post(
        "http://localhost:5000/api/bookings",
        {
          room: roomId,
          checkIn: toISODate(checkIn),
          checkOut: toISODate(checkOut),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        "Room Booked Successfully"
      );

      fetchRooms();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Booking Failed"
      );
    }
  };

  return (
    <div className="container fade-in">
      <div className="page-title">
        <h1>
          Available Rooms 🛏️
        </h1>

        <p>
          Choose your perfect room
          and enjoy your stay
        </p>
      </div>

      <div className="date-card">
        <h3>Select Stay Dates</h3>

        <div className="date-grid">
          <div>
            <label>
              Check In
            </label>

            <DatePicker
              selected={checkIn}
              onChange={(date) =>
                setCheckIn(date)
              }
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/mm/yyyy"
              minDate={new Date()}
              className="date-input"
            />
          </div>

          <div>
            <label>
              Check Out
            </label>

            <DatePicker
              selected={checkOut}
              onChange={(date) =>
                setCheckOut(date)
              }
              dateFormat="dd/MM/yyyy"
              placeholderText="dd/mm/yyyy"
              minDate={checkIn || new Date()}
              className="date-input"
            />
          </div>
        </div>
      </div>

      {rooms.map((room) => (
        <div
          key={room._id}
          className="room-card"
        >
          <div className="room-info">
            <h2>
              Room {
                room.roomNumber
              }
            </h2>

            <p>
              🏨 Hotel:
              {" "}
              {room.hotel?.name}
            </p>

            <p>
              🛏️ Type:
              {" "}
              {room.roomType}
            </p>

            <p>
              💰 Price:
              {" "}
              ₹{room.price}
              / night
            </p>

            {calculateNights() >
              0 && (
              <>
                <p>
                  🌙 Nights:
                  {" "}
                  {calculateNights()}
                </p>

                <h3 className="total-price">
                  Total: ₹
                  {calculateNights() *
                    room.price}
                </h3>
              </>
            )}

            <button
              onClick={() =>
                bookRoom(
                  room._id
                )
              }
            >
              Book Now
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Rooms;