const mongoose = require("mongoose");

mongoose.connect("mongodb://0.0.0.0:27017/LoginSignUpTutorial", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB:", error);
  });

// Define schemas
const LogInSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const AppointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  doctor: {
    type: String,
    required: true,
  },
});


// Create models
const collection = mongoose.model("LogInCollection", LogInSchema);
const appointmentCollection = mongoose.model("AppointmentCollection", AppointmentSchema);

module.exports = { collection, appointmentCollection };
