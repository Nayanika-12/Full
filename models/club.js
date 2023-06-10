import mongoose from "mongoose";

const CLUB = mongoose.model(
  "Club",
  mongoose.Schema({

    ClubID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Club",
      required: true,
    },
    StagPrice: {
      type: String,
      required: true,
    },
    CouplePrice: {
      type: String,
      required: true,
    },
    LadyPrice: {
      type: String,
      required: true,
    },
  }),
  "Club"
);

export default CLUB;
