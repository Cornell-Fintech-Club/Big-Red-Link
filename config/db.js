const mongoose = require('mongoose');

let dbConnections = {}; // Object to hold database connections

const connectDB = async () => {
  try {
    dbConnections.dbA = await mongoose.createConnection(process.env.MONGO_URI_BANK_A, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to Bank A');

    dbConnections.dbB = await mongoose.createConnection(process.env.MONGO_URI_BANK_B, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to Bank B');

    dbConnections.dbC = await mongoose.createConnection(process.env.MONGO_URI_BANK_C, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to Bank C');
  } catch (error) {
    console.error('Error connecting to databases:', error);
    process.exit(1);
  }
};

module.exports = { connectDB, dbConnections };
