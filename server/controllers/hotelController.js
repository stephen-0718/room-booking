const Hotel = require("../models/Hotel");

const createHotel = async (req, res) => {
  try {
    const hotel = await Hotel.create(req.body);

    res.status(201).json({
      success: true,
      hotel,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getHotels = async (req, res) => {
  try {
    const hotels = await Hotel.find();

    res.status(200).json({
      success: true,
      hotels,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createHotel,
  getHotels,
};