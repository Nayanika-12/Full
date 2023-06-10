import expressAsyncHandler from "express-async-handler";
import BOOKING from "../models/booking.js";
import CLUB from "../models/club.js";
import ClubUser from "../models/ClubUser.js";


// function to get all the bookings via clubID parsed in the url and via authentication token

const getbookingsClub = expressAsyncHandler(async (req, res) => {
    const clubID = req.params.clubID; // Assuming clubID is passed as a route parameter
    const accessToken = req.headers.authorization; // Assuming access token is included in the request headers
  
    // Add additional check to ensure the access token is valid for the club
    if (!isValidClubAccessToken(accessToken, clubID)) {
      return res.status(401).json({ message: "Unauthorized: Invalid club access token" });
    }
  
    // Include the clubID as a filter condition
    const bookings = await BOOKING.find({ ClubID: clubID }).exec();
  
    return res.status(200).json(bookings);


});
  
export { getbookingsClub };
