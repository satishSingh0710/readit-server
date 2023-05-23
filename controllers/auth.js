import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
// REGISTER USER;

export const register = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    const user = await User.findOne({userName: userName}); 
    console.log(user); 
    if (user){return res.status(501).json({"message":"User is already present"})}
    const salt = await bcrypt.genSalt();
    const passwordHashed = await bcrypt.hash(password, salt);
    const newUser = new User({
      userName,
      email,
      password: passwordHashed,
    });
    const savedUser = await newUser.save();
    res.status(201).json({ savedUser, password });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// logging in functionality

export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    console.log(userName, password); 
    const user = await User.findOne({ userName: userName});
    console.log(user); 
    if (!user) return res.status(400).json({ message: "User does not exist." });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "password does not match" });
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    delete user.password;
    res.status(200).json({ token, user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
