const passwordHash = require("password-hash");

const User = require("../models/user.model");
const { UserRoles } = require("../utils/constants");

const getUsers = async () => {
  const users = await User.find({}).select("-password").lean();

  return users || [];
};

const getById = async (_id) => {
  const user = await User.findOne({ _id }).select("-password").lean();

  return user || {};
};

const createUser = async (data) => {
  const { username, password, role } = data;

  if (!username.trim() || username.includes(" "))
    throw new Error("Username musn't be empty or blank");

  if (!password.trim() || password.includes(" "))
    throw new Error("Password musn't be empty or blank");

  if (username.length < 8 || password.length < 8)
    throw new Error("Username and password must have at least 8 characters");

  if (!Object.values(UserRoles).includes(role)) throw new Error("Invalid role");

  const existUser = await User.findOne({ username }).lean();
  if (existUser) throw new Error("User existed");

  const newUser = new User({
    username,
    password: passwordHash.generate(password),
    role,
    cart: [],
  });

  await newUser.save();
};

const updateUser = async (_id, data) => {
  const user = await User.findOne({ _id });
  if (!user) throw new Error("User not found");

  const { username, password, role, cart } = data;

  const userExist = await User.findOne({ username }).lean();
  if (userExist && userExist._id.toString() !== user._id.toString())
    throw new Error("Username already exists");

  if (username) {
    if (!username.trim() || username.includes(" "))
      throw new Error("Username musn't be empty or blank");
    if (username.length < 8)
      throw new Error("Username must have at least 8 characters");
  }

  if (password) {
    if (!password.trim() || password.includes(" "))
      throw new Error("Password musn't be empty or blank");

    if (username.length < 8 || password.length < 8)
      throw new Error("Password must have at least 8 characters");
  }

  if (role)
    if (!Object.values(UserRoles).includes(role))
      throw new Error("Invalid role");

  user.username = username || user.username;
  user.password = password ? passwordHash.generate(password) : user.password;
  user.role = role || user.role;
  user.cart = cart || user.cart;

  await user.save();
};

const deleteUser = async (_id) => {
  const user = await User.findOne({ _id });

  if (!user) throw new Error("User not found");

  await user.remove();
};

module.exports = {
  getUsers,
  getById,
  createUser,
  updateUser,
  deleteUser,
};
