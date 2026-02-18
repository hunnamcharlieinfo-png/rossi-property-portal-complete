const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const port = process.env.PORT || 5000;
const JWT_SECRET = 'your_jwt_secret_here'; // Replace with your own secret

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/real-estate', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware
app.use(bodyParser.json());

// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);

// Property Schema
const propertySchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  scheduledViewings: [{ date: Date, userId: String }] // Schedule property viewings
});

const Property = mongoose.model('Property', propertySchema);

// Register User
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username, password: hashedPassword });
  await newUser.save();
  res.status(201).send('User registered');
});

// Login User
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).send('Invalid credentials');
  }
  const token = jwt.sign({ id: user._id }, JWT_SECRET);
  res.json({ token });
});

// Property Management
app.post('/properties', async (req, res) => {
  const { title, description, price, location } = req.body;
  const property = new Property({ title, description, price, location });
  await property.save();
  res.status(201).send('Property created');
});

// Schedule Viewing
app.post('/viewings', async (req, res) => {
  const { propertyId, date, userId } = req.body;
  const property = await Property.findById(propertyId);
  property.scheduledViewings.push({ date, userId });
  await property.save();
  res.send('Viewing scheduled');
});

// Contact Form
app.post('/contact', (req, res) => {
  const { name, email, message } = req.body;
  // Handle contact form submission (e.g., sending email)
  res.send('Contact form submitted');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});