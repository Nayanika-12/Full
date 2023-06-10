import mongoose from "mongoose";

const Booking = mongoose.model(
  "bookings",
  mongoose.Schema({
    ClubID:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      required: [true, "Please add the club name"],
    },
    // bookingType: {  
    //   type: String,
    //   ref: "Booking",
    //   required: [true, "Please add the booking ID"],
    //  },
    UserID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    Mobile_number: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },

  },
  {
    timestamps: true,
  },

  ),
  "bookings"
);

Booking.createIndexes();

//For backend and express

const express = require('express');
const app = express();
// const cors = require("cors");
// console.log("App listen at port 3000");
// app.use(express.json());
// app.use(cors());
// app.get("/", (req, resp) => {
 
//     resp.send("App is Working");
// });
app.post("/test-pricing", async (req, resp) => {
  try {
      const booking = new Booking(req.body);
      let result = await booking.save();
      result = result.toObject();
      if (result) {
          delete result.password;
          resp.send(req.body);
          console.log(result);
      } else {
          console.log("User already registered");
      }

  } catch (e) {
      resp.send("Something Went Wrong");
  }
});
app.listen(3000);

export default Booking;
