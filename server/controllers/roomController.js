const Room = require("../models/Room");

const createRoom = async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const room = await Room.create(req.body);

    res.status(201).json({
      success: true,
      room,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const getRooms = async (req, res) => {
  try {

    const rooms = await Room.find()
      .populate("hotel");

    res.status(200).json({
      success: true,
      rooms,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  createRoom,
  getRooms,
};