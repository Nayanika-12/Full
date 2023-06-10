import ClubUser from "../models/ClubUser.js";
import expressAsyncHandler from "express-async-handler";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
dotenv.config();

//@desc Register a Club
//@route POST /api/users/register
//@access public
const registerUser = expressAsyncHandler(async (req, res) => {
  const { ClubName, Mobile_number, password } = req.body;
  if (!ClubName || !Mobile_number || !password) {
    return res.status(400).json({ error: "All fields are mandatory!" });
  }
  const userAvailable = await ClubUser.findOne({ Mobile_number});
  if (userAvailable) {
    return res.status(400).json({ error: "User already registered!" });
  }

  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password: ", hashedPassword);
  const existingUser = await ClubUser.create({
    ClubName,
    Mobile_number,
    password: hashedPassword,
  });

  console.log(`User created ${existingUser}`);
  if (existingUser) {
    return res.status(201).json({ _id: existingUser.id,Mobile_number: existingUser.MobileNumber });
  } else {
    return res.status(400).json({ error: "User data us not valid" });
  }
  // return res.json({ message: "Register the user" });
});

//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = expressAsyncHandler(async (req, res) => {
  const { ClubName,Mobile_number, password } = req.body;
  if (!ClubName || !password || !Mobile_number) {
    return res.status(400).json({ error: "All fields are mandatory!" });
  }
  const user = await ClubUser.findOne({ Mobile_number });
  //compare password with hashedpassword
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          ClubName: user.ClubName,
          Mobile_number: user.ClubName,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    return res.status(200).json({ accessToken });
  } else {
    return res.status(401).json({ error: "email or password is not valid" });
  }
});

//@desc Current user info
//@route POST /api/users/current
//@access private
const currentUser = expressAsyncHandler(async (req, res) => {
  return res.status(200).json(req.ClubUser);
});

export { registerUser, loginUser, currentUser };
