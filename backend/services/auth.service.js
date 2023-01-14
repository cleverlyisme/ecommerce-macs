const jsonwebtoken = require("jsonwebtoken");
const passwordHash = require("password-hash");

const User = require("../models/user.model");

const { JWT_SECRET_KEY } = require("../utils/environments");

const login = async (email, phone, password) => {
  const userEmail = await User.findOne({ email }).lean();
  const userPhone = await User.findOne({ phone }).lean();
  if (!userEmail && !userPhone) throw new Error("Unauthorized");

  const isPassed = passwordHash.verify(
    password,
    userEmail ? userEmail.password : userPhone.password
  );
  if (!isPassed) throw new Error("Invalid password");

  const { _id, role } = userEmail || userPhone;

  return jsonwebtoken.sign({ _id, role }, JWT_SECRET_KEY, {
    expiresIn: "2d",
  });
};

const register = async (email, phone, password) => {
  if (!password.trim() || password.includes(" "))
    throw new Error("Password musn't be empty or blank");

  if (password.length < 8)
    throw new Error("Password must have at least 8 characters");

  const user = new User({
    email,
    phone,
    password: passwordHash.generate(password),
    role: "User",
    history: [],
  });

  await user.save();
};

module.exports = {
  login,
  register,
};
