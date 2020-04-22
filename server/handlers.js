"use strict";

const { MongoClient } = require("mongodb");
const assert = require("assert");

const getSeats = async (req, res) => {
  const client = new MongoClient("mongodb://localhost:27017", {
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const db = client.db("Seat-Data");
    const array = await db.collection("Seats").find().toArray();
    console.log(array);

    let seats = {};
    array.forEach((seat) => {
      seats = { ...seats, [seat._id]: seat };
    });

    return res.json({
      seats: seats,
      numOfRows: 8,
      seatsPerRow: 12,
    });
  } catch (err) {
    res.status(404).json({ status: 404, _id, data: "Not Found!" });
  } finally {
    client.close();
  }
};

const handleBookSeat = async (req, res) => {
  const { seatId, creditCard, expiration, fullName, email } = req.body;

  console.log({ seatId });
  const client = new MongoClient("mongodb://localhost:27017", {
    useUnifiedTopology: true,
  });

  if (!creditCard || !expiration) {
    return res.status(400).json({
      status: 400,
      message: "Please provide credit card information!",
    });
  }

  try {
    await client.connect();
    const db = client.db("Seat-Data");

    //const query = { seatId };
    const newValues = {
      $set: { isBooked: true, name: fullName, email: email },
    };

    let r = await db.collection("Seats").updateOne({ _id: seatId }, newValues);
    assert.equal(1, r.matchedCount);

    assert.equal(1, r.modifiedCount);

    res.status(200).json({ status: 200, success: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ status: 500, message: err.message });
  }
  client.close();
};

module.exports = { getSeats, handleBookSeat };
