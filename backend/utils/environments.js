const dotenv = require("dotenv");

dotenv.config();

const environments = {
  PORT: process.env.PORT,
  MONGO_ATLAS_URI: process.env.MONGO_ATLAS_URI,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  BACKEND_URL: process.env.BACKEND_URL,
};

module.exports = environments;
