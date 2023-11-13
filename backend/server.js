// server.js
require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connection = require('./db');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
const colors = require('colors');
const passwordResetRoutes = require('./routes/passwordReset');
const { User, validateUser } = require('./models/user'); // Import the User model
const itemRoutes = require('./routes/items');


// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/password-reset', passwordResetRoutes);
app.use('/api/items', itemRoutes);

// registration route
app.post('/api/register', async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // validate input
    const { error } = validateUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }

    // create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
    });

    // save the user to the database
    await newUser.save();

    // send a success response
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/', (req, res) => {
  res.send('API Is Running Successfully.');
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening On Port ${port}...`.yellow.bold));
