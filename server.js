import express from "express";
import connectDb from "./config/default.js";
import errorHandler from "./middleware/errorhandle.js";
import dotenv from "dotenv";
import cors from "cors";
dotenv.config();

import BookingRoutes from "./routes/BookingRoutes.js";
import UserRoutes from "./routes/UserRoutes.js";
import ClubUserRoutes from "./routes/ClubUserRoutes.js";
import pricing from "./routes/pricing.js";

connectDb();
const app = express();

app.use(express.json());
app.use(errorHandler);
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

app.use("/api/bookings", BookingRoutes);
app.use("/api/users", UserRoutes);
app.use("/api/Clubusers", ClubUserRoutes);
app.use("/api/pricing", pricing);

app.get("/xyz", (_, res) => res.status(200).send("hi"));


const port = process.env.PORT || 5001;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});


// swagger
