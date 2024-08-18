import jwt from "jsonwebtoken"
import { User } from "../models/Users.js";
import { createTokenAndSaveCookie } from "../jwt/generatetoken.js";


export const signup = async (req, res) => {
  const { fullname, email, password, confirmPassword } = req.body;

  // Validate passwords
  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    // Check if the user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create a new user
    user = new User({ fullname, email, password });
    await user.save();

    if(user){
      createTokenAndSaveCookie(user._id,res)
    }
    res.status(201).json({ 
      user,
      message: "User registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check if the password is correct
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token
    // const token = jwt.sign(
    //   { userId: user._id, username: user.username },
    //   process.env.JWT_SECRET,
    //   { expiresIn: '1h' } // Set token expiration as needed
    // );

    if(user){
      createTokenAndSaveCookie(user._id,res)
    }
    res.status(200).json({ message: "Login successful",user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwtChatApp")
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const allUsers = async (req, res)=>{
  try {
    const loggedInUser = req.user._id;
    const filteredUsers = await User.find({_id:{$ne:loggedInUser}}).select('-password');
    res.status(200).json({ 
      filteredUsers });
  } catch (error) {
    console.error("error getteing all users");
    res.status(500).json({ message: "Error getteing all users" });
  }
}

