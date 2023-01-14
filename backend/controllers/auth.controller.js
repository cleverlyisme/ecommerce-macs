const service = require("../services/auth.service");

const login = async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    const token = await service.login(email, phone, password);

    res.status(200).send({ token });
  } catch (err) {
    res.status(401).send(err.message);
  }
};

const register = async (req, res) => {
  try {
    const { email, phone, password } = req.body;

    await service.register(email, phone, password);

    res.status(201).send("Registered successfully");
  } catch (err) {
    res.status(400).send(err.message);
  }
};

const checkAuth = (req, res) => res.sendStatus(200);

module.exports = {
  login,
  register,
  checkAuth,
};
