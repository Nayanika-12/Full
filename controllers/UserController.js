import USER from "../models/user.js";
import expressAsyncHandler from "express-async-handler";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


dotenv.config();

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = expressAsyncHandler(async (req, res) => {
  const { username, Mobile_number, password } = req.body;
  if (!username || !Mobile_number || !password) {
    return res.status(400).json({ error: "All fields are mandatory!" });
  }
  const userAvailable = await USER.findOne({Mobile_number });
  if (userAvailable) {
    return res.status(400).json({ error: "User already registered!" });
  }

  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password: ", hashedPassword);
  const user = await USER.create({
    username,
    Mobile_number,
    password: hashedPassword,
  });

  console.log(`User created ${user}`);
  if (user) {
    return res.status(201).json({ _id: user.id,Mobile_number: user.Mobile_number });
  } else {
    return res.status(400).json({ error: "User data us not valid" });
  }
  // return res.json({ message: "Register the user" });
});

//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = expressAsyncHandler(async (req, res) => {
  const { Mobile_number, password } = req.body;
  if (!Mobile_number|| !password) {
    return res.status(400).json({ error: "All fields are mandatory!" });
  }
  const user = await USER.findOne({ Mobile_number });
  //compare password with hashedpassword
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          Mobile_number: user.Mobile_number,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

        // Set the access token as an HTTP-only cookie
        res.cookie('access_token', accessToken, {
          httpOnly: true, // Makes the cookie inaccessible to JavaScript
          secure: true, // Ensures the cookie is only sent over HTTPS (requires HTTPS setup)
          sameSite: 'strict', // Restricts the cookie to same-site requests
          // Other optional settings: maxAge, domain, path
        });
    
    return res.status(200).json({ accessToken });
  } else {
    return res.status(401).json({ error: "email or password is not valid" });
  }
});

//@desc Current user info
//@route POST /api/users/current
//@access private
const currentUser = expressAsyncHandler(async (req, res) => {
  return res.status(200).json(req.user);
});

export { registerUser, loginUser, currentUser };
