import mongoose from "mongoose";

const USER = mongoose.model(
  "User",
  mongoose.Schema(
    {
      username: {
        type: String,
        required: [true, "Please add the user name"],
      },
      Mobile_number: {
        type: String,
        required: [true, "Please add the user Mobile_number"],
        unique: [true, "Number already taken"],
      },
      password: {
        type: String,
        required: [true, "Please add the user password"],
      },
    },
    
  ),
  "User"
);

export default USER;
