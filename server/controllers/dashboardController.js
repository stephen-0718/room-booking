const Hotel = require("../models/Hotel");
const Room = require("../models/Room");
const Booking = require("../models/Booking");

const getDashboard = async (req, res) => {
  try {
    const totalHotels =
      await Hotel.countDocuments();

    const totalRooms =
      await Room.countDocuments();

    const totalBookings =
      await Booking.countDocuments();

    const cancelledBookings =
      await Booking.countDocuments({
        status: "Cancelled",
      });

    res.json({
      totalHotels,
      totalRooms,
      totalBookings,
      cancelledBookings,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getDashboard,
};