const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const hotelRoutes = require("./routes/hotelRoutes");
const roomRoutes = require("./routes/roomRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();

const bookingRoutes =
  require("./routes/bookingRoutes");

const dashboardRoutes =
  require("./routes/dashboardRoutes");
  
// Middleware FIRST
app.use(cors());
app.use(express.json());

// Routes AFTER middleware
app.use("/api/auth", authRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/rooms", roomRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hotel Booking API Running");
});

app.get("/api/profile", authMiddleware, (req, res) => {
  res.json({
    success: true,
    user: req.user,
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});


app.use("/api/bookings", bookingRoutes);


app.use(
  "/api/dashboard",
  dashboardRoutes
);