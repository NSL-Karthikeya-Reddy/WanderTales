require('dotenv').config();

const config = {
  connectionString: process.env.MONGO_URI,
};

module.exports = config;
