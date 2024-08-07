const mongoose = require('mongoose');

const connectDB = async () => {
  const MONGO_URI = process.env.MONGO_URI;
  try {
    // await mongoose.connect(MONGO_URI, { //not sure why this was throwing an error but updated the functionality on line 10 to remove the error
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    // });
    mongoose.connect(MONGO_URI);
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = connectDB;
