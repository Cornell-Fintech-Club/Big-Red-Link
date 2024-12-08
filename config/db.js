const mongoose = require('mongoose');

// Create connections to multiple MongoDB databases
const connectDB = async () => {
  try {
    const dbA = await mongoose.createConnection(process.env.MONGO_URI_BANK_A, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to Bank A');

    const dbB = await mongoose.createConnection(process.env.MONGO_URI_BANK_B, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to Bank B');

    const dbC = await mongoose.createConnection(process.env.MONGO_URI_BANK_C, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to Bank C');

    // Return or store these connections globally if needed
    return { dbA, dbB, dbC };
  } catch (error) {
    console.error('Error connecting to databases:', error);
    process.exit(1);
  }
};

module.exports = connectDB;
