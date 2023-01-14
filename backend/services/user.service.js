const passwordHash = require("password-hash");

const User = require("../models/user.model");

const getUsers = async () => {
  const users = await User.find({}).select("-password").lean();

  return users || [];
};

const getById = async (_id) => {
  const user = await User.findOne({ _id }).select("-password").lean();

  return user || {};
};

const deleteUser = async (_id) => {
  const user = await User.findOne({ _id });

  if (!user) throw new Error("User not found");

  await user.remove();
};

module.exports = {
  getUsers,
  getById,
  deleteUser,
};
