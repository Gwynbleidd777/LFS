// server.js
require("dotenv").config();
const express = require("express");
const app = express();
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");
const colors = require("colors");
const passwordResetRoutes = require("./routes/passwordReset");
const { User, validateUser } = require("./models/user"); // Import the User model
const Item = require("./models/item"); // Import your Item model
const contactRoute = require("./routes/contact");
const jwt = require("jsonwebtoken");
const sendEmail = require("./utils/sendEmail"); // Import the sendEmail function
const bcrypt = require("bcrypt");
const { Admin, validateAdmin } = require("./models/admin");

// database connection
connection();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Set the destination folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

const authenticateToken = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token)
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Store the decoded user information in the request object
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
  }
};

// Function to generate a verification token (example implementation)
const generateVerificationToken = () => {
  // Implement your token generation logic here
  const token = Math.random().toString(36).substring(7); // Example: Generate a random alphanumeric token
  return token;
};

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/password-reset", passwordResetRoutes);
app.use("/api/contact", contactRoute);

app.get("/api/userData", async (req, res) => {
  try {
    // Fetch user data from the database
    const user = await User.findOne({
      /* Add conditions if needed to find the user */
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send the user data as the response
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Example for saving/updating profile information
app.put("/api/updateProfile", authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id; // Extract user ID from authentication
    const profileData = req.body; // Profile information sent from the frontend

    // Check if the user has an associated profile, create one if not exist
    let userProfile = await ProfileInfo.findOne({ user: userId });

    if (!userProfile) {
      userProfile = await new ProfileInfo({ user: userId }).save();
    }

    // Update the profile information
    userProfile.address = profileData.address;
    userProfile.phoneNumber = profileData.phoneNumber;
    userProfile.dob = profileData.dob;
    userProfile.gender = profileData.gender;
    userProfile.department = profileData.department;

    await userProfile.save();

    res
      .status(200)
      .json({ message: "Profile information updated successfully" });
  } catch (error) {
    console.error("Error updating profile information:", error);
    res.status(500).json({ message: "Failed to update profile information" });
  }
});

// Example for fetching profile information
app.get("/api/profile", authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id; // Extract user ID from authentication

    // Find the profile information for the user
    const userProfile = await ProfileInfo.findOne({ user: userId });

    if (!userProfile) {
      return res.status(404).json({ message: "Profile not found" });
    }

    res.status(200).json(userProfile);
  } catch (error) {
    console.error("Error fetching profile information:", error);
    res.status(500).json({ message: "Failed to fetch profile information" });
  }
});

// Image upload endpoint
app.post("/api/upload", upload.single("image"), async (req, res) => {
  const imagePath = "uploads/" + req.file.filename;

  try {
    // Create a new item document with the image path
    const newItem = new Item({
      itemName: req.body.itemName,
      category: req.body.category,
      description: req.body.description,
      location: req.body.location,
      image: imagePath, // Save the image path in your item schema
      color: req.body.color,
      model: req.body.model,
      brand: req.body.brand,
      type: req.body.type,
      cardType: req.body.cardType,
      // Add other relevant fields here
      // ...
    });

    // Save the item to the database
    await newItem.save();

    res.json({ imagePath }); // Send a response with the image path
  } catch (error) {
    console.error("Error saving image path:", error); // Log the error details
    res
      .status(500)
      .json({ message: "Failed to save image path in the database" });
  }
});

// registration route
app.post("/api/register", async (req, res) => {
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
      return res
        .status(400)
        .json({ message: "User With This Email Already Exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds value

    // create a new user with the hashed password
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword, // Store the hashed password
    });

    // save the user to the database
    await newUser.save();

    // send verification email
    const verificationToken = generateVerificationToken(); // You need to implement this function to generate a unique token
    const verificationLink = `${process.env.BASE_URL}/verify-email?token=${verificationToken}&email=${email}`;
    await sendEmail(email, "Verify Email", verificationLink);

    // send a success response
    res.status(201).json({ message: "Verification Link Sent To Your Email !" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error !" });
  }
});

// Backend endpoint for email verification
app.get("/api/users/:id/verify/:token", async (req, res) => {
  try {
    const { id, token } = req.params;

    // Find the user by ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Find the token associated with the user
    const userToken = await Token.findOne({ userId: id, token });

    if (!userToken) {
      return res.status(400).json({ message: "Invalid verification token" });
    }

    // Check if the token has expired (assuming `createdAt` field in the token schema)
    if (userToken.createdAt < new Date(Date.now() - 3600 * 1000)) {
      // Token is expired, handle as needed (e.g., send a new verification email)
      return res.status(400).json({ message: "Verification token expired" });
    }

    // Update the user's verified field to true and remove the verification token
    user.verified = true;
    await user.save();

    // Remove the verification token from the database
    await userToken.remove();

    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// Add an endpoint for admin registration
app.post("/api/admin/register", async (req, res) => {
  try {
    const { firstName, email, password } = req.body;

    // Validate input
    const { error } = validateAdmin(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    // Check if the admin already exists
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res
        .status(400)
        .json({ message: "Admin With This Email Already Exists." });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10); // 10 is the saltRounds value

    // Create a new admin with the hashed password
    const newAdmin = new Admin({
      firstName,
      email,
      password: hashedPassword, // Store the hashed password
    });

    // Save the admin to the database
    await newAdmin.save();

    // Send a success response
    res.status(201).json({ message: "Admin registered successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error !" });
  }
});

app.post("/api/admin/auth", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the admin by email
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the hashed password stored in the database
    const isPasswordValid = await bcrypt.compare(password, admin.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT token for admin
    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, {
      expiresIn: "1h", // Set expiration time as desired
    });

    res.status(200).json({ token }); // Send the generated token
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.use((err, req, res, next) => {
  console.error("An error occurred:", err.stack); // Log the error stack trace
  res.status(500).json({ message: "Something went wrong!" });
});

app.get("/", (req, res) => {
  res.send("API Is Running Successfully.");
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening On Port ${port}...`.yellow.bold));
