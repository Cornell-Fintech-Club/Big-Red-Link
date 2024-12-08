const mongoose = require('mongoose');

const uri = 'mongodb+srv://ebr66:Soccer13@mockbankaccount.zan4j.mongodb.net/mockbankaccount?retryWrites=true&w=majority'; // Replace this with your actual MongoDB URI

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected successfully!');
    mongoose.connection.close(); // Close the connection after success
  })
  .catch(err => {
    console.error('Connection failed:', err);
    mongoose.connection.close(); // Ensure connection closes even on failure
  });
