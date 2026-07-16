import { useEffect, useState } from "react";
import axios from "axios";

function AddRoom() {
  const [hotels, setHotels] = useState([]);

  const [hotel, setHotel] = useState("");
  const [roomNumber, setRoomNumber] =
    useState("");
  const [roomType, setRoomType] =
    useState("Single");
  const [price, setPrice] =
    useState("");

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/hotels"
      );

      setHotels(res.data.hotels);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/rooms",
        {
          hotel,
          roomNumber,
          roomType,
          price,
        }
      );

      alert(
        "Room Added Successfully"
      );

      console.log(res.data);

      setRoomNumber("");
      setPrice("");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to Add Room"
      );
    }
  };

  return (
    <div>
      <h1>Add Room</h1>

<div className="auth-container">
  <div className="auth-card">

      <form onSubmit={handleSubmit}>
        <select
          value={hotel}
          onChange={(e) =>
            setHotel(e.target.value)
          }
        >
          <option value="">
            Select Hotel
          </option>

          {hotels.map((hotel) => (
            <option
              key={hotel._id}
              value={hotel._id}
            >
              {hotel.name}
            </option>
          ))}
        </select>

        <br /><br />

        <input
          type="text"
          placeholder="Room Number"
          value={roomNumber}
          onChange={(e) =>
            setRoomNumber(
              e.target.value
            )
          }
        />

        <br /><br />

        <select
          value={roomType}
          onChange={(e) =>
            setRoomType(
              e.target.value
            )
          }
        >
          <option value="Single">
            Single
          </option>

          <option value="Double">
            Double
          </option>

          <option value="Deluxe">
            Deluxe
          </option>
           
          <option value="Suite">
            A/C Room
          </option>
        </select>

        <br /><br />

        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) =>
            setPrice(e.target.value)
          }
        />

        <br /><br />

        <button type="submit">
          Add Room
        </button>
      </form>
    </div>
    </div>
    </div>
  );
}

export default AddRoom;