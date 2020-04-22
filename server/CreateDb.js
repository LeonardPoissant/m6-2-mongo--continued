const { MongoClient } = require("mongodb");

const dbFunction = async (dbName) => {
  const client = new MongoClient("mongodb://localhost:27017", {
    useUnifiedTopology: true,
  });

  const seats = [];
  const row = ["A", "B", "C", "D", "E", "F", "G", "H"];
  for (let r = 0; r < row.length; r++) {
    for (let s = 1; s < 13; s++) {
      const seat = {
        _id: `${row[r]}-${s}`,
        price: 225,
        isBooked: false,
      };
      seats.push(seat);
    }
  }
  try {
    await client.connect();
    const db = client.db(dbName);

    await db.collection("Seats").insertMany(seats);
  } catch (err) {
    console.log(err.message);
  }

  client.close();
};

dbFunction("Seat-Data");
