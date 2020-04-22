const router = require("express").Router();

const { getSeats, handleBookSeat } = require("./handlers");

// Code that is generating the seats.
// ----------------------------------

// ----------------------------------

router.get("/api/seat-availability", getSeats);

router.post("/api/book-seat", handleBookSeat);

module.exports = router;
