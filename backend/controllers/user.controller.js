const service = require("../services/user.service");

const getUsers = async (req, res) => {
  try {
    const users = await service.getUsers();

    res.status(200).send(users);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const getById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await service.getById(userId);

    res.status(200).send(user);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const getUserHistory = async (req, res) => {
  try {
    const userId = req.params.id;

    const userHistory = await service.getUserHistory(userId);

    res.status(200).send(userHistory);
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    await service.deleteUser(userId);

    res.status(200).send("Deleted successfully");
  } catch (err) {
    res.status(404).send(err.message);
  }
};

module.exports = {
  getUsers,
  getById,
  getUserHistory,
  deleteUser,
};
