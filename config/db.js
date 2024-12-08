const mongoose = require('mongoose');

const connectBankDB = async (uri) => {
  try {
    const connection = await mongoose.createConnection(uri).asPromise();
    console.log(`Connected to database: ${uri}`);
    return connection;
  } catch (error) {
    console.error(`Error connecting to database: ${error.message}`);
    throw error;
  }
};

module.exports = connectBankDB;
