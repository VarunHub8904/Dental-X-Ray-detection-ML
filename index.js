const express = require("express");
const app = express();
const path = require("path");
const hbs = require("hbs");
const { collection, appointmentCollection } = require("./mongodb");

// Paths
const templatePath = path.join(__dirname, "../templates");
const publicPath = path.join(__dirname, "../public");

// Middleware
app.use(express.static(publicPath));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Set View Engine and Views Path
app.set("view engine", "hbs");
app.set("views", templatePath);

// Routes
app.get("/", (req, res) => {
  res.render("home");
});
app.get("/signup", (req, res) => {
  res.render("signup");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.get("/oppointment", (req, res) => {
  res.render("oppointment");
});
app.get("/home1", (req, res) => {
  res.render("home1");
});
app.get("/upload", (req, res) => {
  res.render("upload");
});
app.get("/service", (req, res) => {
  res.render("service");
});
app.get("/home", (req, res) => {
  res.render("home");
});

// Signup
app.post("/signup", async (req, res) => {
  const data = {
    name: req.body.name,
    password: req.body.password,
  };
  await collection.insertMany([data]);
  res.render("home1");
});

// Login
app.post("/login", async (req, res) => {
  try {
    const check = await collection.findOne({ name: req.body.name });
    if (check.password === req.body.password) {
      res.render("home1");
    } else {
      res.send("Wrong password");
    }
  } catch {
    res.send("Wrong details");
  }
});

// Appointment Booking
app.post("/oppointment", async (req, res) => {
  try {
    const appointmentData = {
      name: req.body.name,
      email: req.body.email,
      date: req.body.date,
      time: req.body.time,
      doctor: req.body.doctor,
    };
    await appointmentCollection.insertMany([appointmentData]);
    res.status(200).send({ success: true, message: "Appointment booked successfully!" });
  } catch (error) {
    res.status(500).send({ success: false, message: "Failed to book appointment." });
  }
});

// Dynamic Subcategory Rendering
app.get("/:subcategory", (req, res) => {
  const subcategory = req.params.subcategory;
  const validSubcategories = [
    "Arithmetic", "Algebra", "Time and Distance", "Number System", "Ratio and Proportion",
    "Data Sufficiency", "Syllogisms", "Critical Thinking", "Decision Making",
    "Vocabulary", "Grammar", "Reading Comprehension", "Synonyms & Antonyms",
    "Artificial intelligence", "Mechanical", "Civil", "Computer Science", "Electronics",
    "Problems on Ages", "Percentage Problems", "Profit and loss", "Permutation and Combination",
    "Alligation and Mixture",
  ];

  if (validSubcategories.includes(subcategory)) {
    res.render(subcategory); // Dynamically render the subcategory page
  } else {
    res.status(404).send("Page not found");
  }
});

// Start the Server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
