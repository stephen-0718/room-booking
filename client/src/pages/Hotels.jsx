import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Hotels() {
  const [hotels, setHotels] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

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

  const filteredHotels = hotels.filter(
    (hotel) =>
      hotel.name
        .toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="container fade-in">
      <div className="page-title">
        <h1>
          Find Your Perfect Stay 🏨
        </h1>

        <p>
          Search and book hotels
          for your next trip
        </p>
      </div>

      <input
        className="search-box"
        type="text"
        placeholder="🔍 Search Hotel..."
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
      />

      <br />
      <br />

      {filteredHotels.length === 0 ? (
        <h3
          style={{
            textAlign: "center",
          }}
        >
          No Hotels Found
        </h3>
      ) : (
        filteredHotels.map((hotel) => (
          <div
            key={hotel._id}
            className="hotel-card"
          >
            {hotel.image && (
              <img
                src={hotel.image}
                alt={hotel.name}
              />
            )}

            <div className="hotel-content">
              <h2>
                {hotel.name}
              </h2>

              <p className="hotel-location">
                📍 {hotel.location}
              </p>

              <p>
                {hotel.description}
              </p>

              <h3 className="hotel-price">
                ₹{hotel.price}
                <span
                  style={{
                    fontSize:
                      "16px",
                    color:
                      "#64748b",
                  }}
                >
                  {" "}
                  / night
                </span>
              </h3>

              <button
                onClick={() =>
                  navigate("/rooms")
                }
              >
                View Rooms
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Hotels;