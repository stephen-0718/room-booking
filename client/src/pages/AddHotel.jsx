import { useState } from "react";
import api from "../services/api";

function AddHotel() {
  const [name, setName] = useState("");
  const [location, setLocation] =
    useState("");
  const [description, setDescription] =
    useState("");
  const [price, setPrice] = useState("");  

  const [image, setImage] =
  useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post(
        "/api/hotels",
        {
        name,
        location,
        description,
        image,
        price,
        }
      );

      alert("Hotel Added Successfully");

      console.log(res.data);

      setName("");
      setLocation("");
      setDescription("");
    } catch (error) {
      console.log(error);

      alert("Failed to Add Hotel");
    }
  };

  return (
    <div>
      <h1>Add Hotel</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Hotel Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

        <br /><br />

        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(e) =>
            setLocation(e.target.value)
          }
        />

        <br /><br />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) =>
            setDescription(e.target.value)
          }
        />

        <br /><br />

        <input
          type="text"
          placeholder="Image URL"
          value={image}
          onChange={(e) =>
            setImage(e.target.value)
          }
        />

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
          Add Hotel
        </button>
      </form>
    </div>
  );
}

export default AddHotel;