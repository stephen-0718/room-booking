const express = require("express");

const router = express.Router();

const {
  createHotel,
  getHotels,
} = require("../controllers/hotelController");

router.post("/", createHotel);

router.get("/", getHotels);

module.exports = router;