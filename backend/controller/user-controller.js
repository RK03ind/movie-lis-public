const mongoose = require("mongoose");
var bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
let validator = require("validator");
const User = require("../models/user");

const login = async (req, res, next) => {
  const { email, password } = req.body;
  const searchedUser = await User.findOne({ email: email });

  if (!searchedUser)
    return res.status(422).json({ message: "Email doesn't exist" });

  if (bcrypt.compareSync(password, searchedUser.password))
    return res.json({
      token: jwt.sign({ id: searchedUser._id }, process.env.JWT_SALT),
    });

  res.status(401);
  return res.json({ message: "Incorrect password" });
};

const signup = async (req, res, next) => {
  const { uid, email, password } = req.body;

  const passwordHash = bcrypt.hashSync(password, 8);

  if (!validator.isEmail(email)) {
    return res.status(422).json({ message: "Invalid email" });
  }

  const searchedUser = await User.findOne({
    $or: [{ email: email }, { uid: uid }],
  });

  const createdUser = new User({
    uid: uid,
    email: email,
    password: passwordHash,
  });

  if (searchedUser) {
    return res
      .status(409)
      .json({ message: "User name or Email is already used" });
  }
  const result = await createdUser.save();
  const token = jwt.sign({ id: result._id }, process.env.JWT_SALT);
  res.json({
    id: result._id,
    token: token,
  });
};

module.exports = {
  login,
  signup,
};
