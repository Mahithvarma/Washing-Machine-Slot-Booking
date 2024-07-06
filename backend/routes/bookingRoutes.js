const { getBookings, addBooking, deleteBooking, updateBooking } = require("../controllers/bookingControllers.js");

const router = require("express").Router();
router.post("/bookings/add", addBooking);
router.get("/bookings", getBookings);
router.delete("/bookings/cancel", deleteBooking);
router.put("/bookings/change", updateBooking)

module.exports = router;