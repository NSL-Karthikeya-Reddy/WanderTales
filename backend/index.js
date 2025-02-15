require("dotenv").config();

const config = require("./config.json");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const upload = require("./multer");
const fs = require("fs");
const path = require("path");
const BASE_URL = process.env.VITE_BASE_URL;
const MONGO_URI = process.env.MONGO_URI;

const { authenticateToken } = require("./utilities");
const User = require("./models/user.model");
const TravelStory = require("./models/travelStory.model");

// MongoDB Connection with error handling
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('MongoDB connection error:', err));

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS Configuration
const allowedOrigins = [
  'https://wander-tales-seven.vercel.app',
  'http://localhost:5173',
  'http://localhost:3000'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Additional headers middleware
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Credentials', true);
  
  // Handle OPTIONS method
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Create Account
app.post("/create-account", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res
        .status(400)
        .json({ error: true, message: "All fields are required" });
    }

    const isUser = await User.findOne({ email });
    if (isUser) {
      return res
        .status(400)
        .json({ error: true, message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    await user.save();

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "72h",
      }
    );

    return res.status(201).json({
      error: false,
      user: { fullName: user.fullName, email: user.email },
      accessToken,
      message: "Registration Successful",
    });
  } catch (error) {
    console.error('Registration error:', error);
    return res.status(500).json({ error: true, message: "Server error during registration" });
  }
});

// Login
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: true, message: "Email and Password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: true, message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ error: true, message: "Invalid Credentials" });
    }

    const accessToken = jwt.sign(
      { userId: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "72h",
      }
    );

    return res.json({
      error: false,
      message: "Login Successful",
      user: { fullName: user.fullName, email: user.email },
      accessToken,
    });
  } catch (error) {
    console.error('Login error:', error);
    return res.status(500).json({ error: true, message: "Server error during login" });
  }
});

// Get User
app.get("/get-user", authenticateToken, async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(401).json({ error: true, message: "User not found" });
    }

    return res.json({
      user: { fullName: user.fullName, email: user.email },
      message: "User retrieved successfully",
    });
  } catch (error) {
    console.error('Get user error:', error);
    return res.status(500).json({ error: true, message: "Server error while fetching user" });
  }
});

// Image Upload
app.post("/image-upload", upload.single("image"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: true, message: "No image uploaded" });
    }

    const imageUrl = `${BASE_URL}/uploads/${req.file.filename}`;
    res.status(200).json({ imageUrl });
  } catch (error) {
    console.error('Image upload error:', error);
    res.status(500).json({ error: true, message: "Server error during image upload" });
  }
});

// Delete Image
app.delete("/delete-image", async (req, res) => {
  try {
    const { imageUrl } = req.query;

    if (!imageUrl) {
      return res.status(400).json({ error: true, message: "imageUrl parameter is required" });
    }

    const filename = path.basename(imageUrl);
    const filePath = path.join(__dirname, "uploads", filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      res.status(200).json({ message: "Image deleted successfully" });
    } else {
      res.status(404).json({ error: true, message: "Image not found" });
    }
  } catch (error) {
    console.error('Delete image error:', error);
    res.status(500).json({ error: true, message: "Server error while deleting image" });
  }
});

// Static Files
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/assets", express.static(path.join(__dirname, "assets")));

// Add Travel Story
app.post("/add-travel-story", authenticateToken, async (req, res) => {
  try {
    const { title, story, visitedLocation, imageUrl, visitedDate } = req.body;
    const { userId } = req.user;

    if (!title || !story || !visitedLocation || !imageUrl || !visitedDate) {
      return res.status(400).json({ error: true, message: "All fields are required" });
    }

    const parsedVisitedDate = new Date(parseInt(visitedDate));
    
    const travelStory = new TravelStory({
      title,
      story,
      visitedLocation,
      userId,
      imageUrl,
      visitedDate: parsedVisitedDate,
    });

    await travelStory.save();
    res.status(201).json({ story: travelStory, message: "Added Successfully" });
  } catch (error) {
    console.error('Add story error:', error);
    res.status(500).json({ error: true, message: "Server error while adding story" });
  }
});

// Get All Travel Stories
app.get("/get-all-stories", authenticateToken, async (req, res) => {
  try {
    const { userId } = req.user;
    const travelStories = await TravelStory.find({ userId }).sort({ isFavourite: -1 });
    res.status(200).json({ stories: travelStories });
  } catch (error) {
    console.error('Get stories error:', error);
    res.status(500).json({ error: true, message: "Server error while fetching stories" });
  }
});

// Edit Travel Story
app.put("/edit-story/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, story, visitedLocation, imageUrl, visitedDate } = req.body;
    const { userId } = req.user;

    if (!title || !story || !visitedLocation || !visitedDate) {
      return res.status(400).json({ error: true, message: "All fields are required" });
    }

    const parsedVisitedDate = new Date(parseInt(visitedDate));
    const travelStory = await TravelStory.findOne({ _id: id, userId });

    if (!travelStory) {
      return res.status(404).json({ error: true, message: "Travel story not found" });
    }

    const placeholderImgUrl = `${BASE_URL}/assets/placeholder.png`;

    travelStory.title = title;
    travelStory.story = story;
    travelStory.visitedLocation = visitedLocation;
    travelStory.imageUrl = imageUrl || placeholderImgUrl;
    travelStory.visitedDate = parsedVisitedDate;

    await travelStory.save();
    res.status(200).json({ story: travelStory, message: "Update Successful" });
  } catch (error) {
    console.error('Edit story error:', error);
    res.status(500).json({ error: true, message: "Server error while editing story" });
  }
});

// Delete Travel Story
app.delete("/delete-story/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.user;

    const travelStory = await TravelStory.findOne({ _id: id, userId });

    if (!travelStory) {
      return res.status(404).json({ error: true, message: "Travel story not found" });
    }

    await TravelStory.deleteOne({ _id: id, userId });

    const imageUrl = travelStory.imageUrl;
    const filename = path.basename(imageUrl);
    const filePath = path.join(__dirname, "uploads", filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    res.status(200).json({ message: "Travel story deleted successfully" });
  } catch (error) {
    console.error('Delete story error:', error);
    res.status(500).json({ error: true, message: "Server error while deleting story" });
  }
});

// Update Favorite Status
app.put("/update-is-favourite/:id", authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { isFavourite } = req.body;
    const { userId } = req.user;

    const travelStory = await TravelStory.findOne({ _id: id, userId });

    if (!travelStory) {
      return res.status(404).json({ error: true, message: "Travel story not found" });
    }

    travelStory.isFavourite = isFavourite;
    await travelStory.save();
    
    res.status(200).json({ story: travelStory, message: "Update Successful" });
  } catch (error) {
    console.error('Update favorite error:', error);
    res.status(500).json({ error: true, message: "Server error while updating favorite status" });
  }
});

// Search Travel Stories
app.get("/search", authenticateToken, async (req, res) => {
  try {
    const { query } = req.query;
    const { userId } = req.user;

    if (!query) {
      return res.status(400).json({ error: true, message: "Query parameter is required" });
    }

    const searchResults = await TravelStory.find({
      userId,
      $or: [
        { title: { $regex: query, $options: "i" } },
        { story: { $regex: query, $options: "i" } },
        { visitedLocation: { $regex: query, $options: "i" } },
      ],
    }).sort({ isFavourite: -1 });

    res.status(200).json({ stories: searchResults });
  } catch (error) {
    console.error('Search error:', error);
    res.status(500).json({ error: true, message: "Server error while searching stories" });
  }
});

// Filter Travel Stories by Date
app.get("/travel-stories/filter", authenticateToken, async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const { userId } = req.user;

    const start = new Date(parseInt(startDate));
    const end = new Date(parseInt(endDate));

    const filteredStories = await TravelStory.find({
      userId,
      visitedDate: { $gte: start, $lte: end },
    }).sort({ isFavourite: -1 });

    res.status(200).json({ stories: filteredStories });
  } catch (error) {
    console.error('Filter error:', error);
    res.status(500).json({ error: true, message: "Server error while filtering stories" });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: true, message: 'Something broke!' });
});

// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({ error: true, message: 'Route not found' });
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;