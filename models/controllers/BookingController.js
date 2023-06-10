import expressAsyncHandler from "express-async-handler";
import BOOKING from "../models/booking.js";
import CLUB from "../models/club.js";
import ClubUser from "../models/ClubUser.js";

//@desc Get all bookings
//@route GET /api/contacts
//@access private

// sends bookings of particular user to the webapp


const getbookings = expressAsyncHandler(async (req, res) => {
  const userBookings = await BOOKING.find({ UserID: req.params.id }).exec();
  return res.status(200).json(userBookings);
});


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


const getPrice = expressAsyncHandler(async (req, res) => {
  const clubprice = await CLUB.find({ ClubID: req.params.id }).exec();
  return res.status(200).json(clubprice);
});




// get bookings is filtered by clubID and username - only these two are able to accesd that bookinh

//@desc Create New contact
//@route POST /api/contacts
//@access private

// this creates a booking against a club and a customer , to be used in the webapp
const createbooking = expressAsyncHandler(async (req, res) => {
  console.log("The request body is :", req.body);

  const { ClubID, UserID, username, Mobile_number, price } = req.body;
  if (!ClubID || !UserID|| !username || !Mobile_number || !price) {
    return res.status(400).json({ error: "All fields are mandatory !" });
  }
  const contact = await BOOKING.create({
    ClubID,
    UserID,
    username,
    Mobile_number,
    price,
    user_id: req.user.id,
  });

  return res.status(201).json(contact);
});

//@desc Get contact
//@route GET /api/contacts/:id
//@access private
const getBooking = expressAsyncHandler(async (req, res) => {
  const booking = await BOOKING.findById(req.params.id);
  if (!booking) {
    return res.status(404).json({ error: "booking not found" });
  }
  return res.status(200).json(booking);
});

//@desc Update contact
//@route PUT /api/contacts/:id
//@access private
const updatePricing = expressAsyncHandler(async (req, res) => {
  const pricing = await CLUB.findOne({ ClubID: req.params.id });

  if (!pricing) {
    // Create new pricing if not found
    const newPricing = new CLUB({
      ClubID: req.params.id,
      StagPrice: req.body.StagPrice,
      CouplePrice: req.body.CouplePrice,
      LadyPrice: req.body.LadyPrice,
    });

    const createdPricing = await newPricing.save();
    return res.status(201).json(createdPricing);
  }

  if (!pricing.ClubID || pricing.ClubID.toString() !== req.user.id.toString()) {
    return res.status(403).json({
      error: "User doesn't have permission to update other user's pricing",
    });
  }

  // Update existing pricing
  pricing.StagPrice = req.body.StagPrice;
  pricing.CouplePrice = req.body.CouplePrice;
  pricing.LadyPrice = req.body.LadyPrice;
  
  const updatedPrice = await pricing.save();
  return res.status(200).json(updatedPrice);
});




//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access private
const deleteBooking = expressAsyncHandler(async (req, res) => {
  const booking = await BOOKING.findById(req.params.id);
  if (!booking) {
    return res.status(404).json({ error: "booking not found" });
  }
  if (booking.user_id.toString() !== req.user.id) {
    return res
      .status(403)
      .json({
        error: "User don't have permission to update other user bookings",
      });
  }
  await booking.deleteOne({ _id: req.params.id });
  return res.status(200).json(booking);
});



export { getbookings,getbookingsClub, getPrice, createbooking, getBooking, updatePricing, deleteBooking };
