const express = require("express");

const router = express.Router();

const {
  createBooking,
  getBookings,
  getMyBookings,
  cancelBooking,
} = require("../controllers/bookingController");

const authMiddleware =
  require("../middleware/authMiddleware");

router.get(
  "/my-bookings",
  authMiddleware,
  getMyBookings
);

router.post(
  "/",
  authMiddleware,
  createBooking
);

router.get("/", getBookings);

router.patch(
  "/:id/cancel",
  authMiddleware,
  cancelBooking
);

module.exports = router;