import mongoose from "mongoose";

const ClubUser = mongoose.model(
  "ClubUser",
  mongoose.Schema(
    {
      ClubName:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Club",
        required: [true, "Please add the club name"],
      },
      Username:{
        type: String,
        required: [true, "Please add the user name"],
        ref: "User",
      },
      Mobile_number:{
        type: String,
        required: [true, "Please add the user Mobile_number"],
        unique: [true, "Number already taken"],
      },
      password: {
        type: String,
        required: [true, "Please add the user password"],
      },
      bookingType: {  
        type: String,
        ref: "Booking",
        required: [true, "Please add the booking ID"],
       },
  },
    {
      timestamps: true,
    },
    
   
  ),
  "ClubUser"
);

export default ClubUser;
