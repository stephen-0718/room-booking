const Room = require("../models/Room");
const Booking = require("../models/Booking");

const createBooking = async (req, res) => {
  try {
    const { room, checkIn, checkOut } = req.body;
    console.log("Room:", room);
    console.log("CheckIn:", checkIn);
    console.log("CheckOut:", checkOut);
    const existingBooking = await Booking.findOne({
      room,
      status: "Booked",
      checkIn: { $lt: checkOut },
      checkOut: { $gt: checkIn },
    });
    console.log("Existing Booking:", existingBooking);

    if (existingBooking) {
      return res.status(400).json({
        success: false,
        message: "Room already booked for these dates",
      });
    }

    const roomData = await Room.findById(room);

    if (!roomData) {
    return res.status(404).json({
        success: false,
        message: "Room not found",
    });
    }

    const days =
    (new Date(checkOut) - new Date(checkIn))
    / (1000 * 60 * 60 * 24);

    const totalAmount =
    days * roomData.price;

    const booking = await Booking.create({
      user: req.user.id,
      room,
      checkIn,
      checkOut,
      totalAmount,
    });

    res.status(201).json({
      success: true,
      booking,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user")
      .populate({
        path: "room",
        populate: { path: "hotel" },
      });

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getMyBookings = async (req, res) => {
  try {

    console.log("Logged User:", req.user);

    const bookings = await Booking.find({
      user: req.user.id,
    }).populate({
      path: "room",
      populate: { path: "hotel" },
    });

    console.log("Bookings Found:", bookings);

    res.status(200).json({
      success: true,
      bookings,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const cancelBooking = async (req, res) => {
  try {
    const booking =
      await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    booking.status = "Cancelled";

    await booking.save();

    res.status(200).json({
      success: true,
      message: "Booking Cancelled",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createBooking,
  getBookings,
  getMyBookings,
  cancelBooking,
};