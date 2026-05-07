// server.js

require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require("passport-local");

const chatRoutes = require("./routes/chat.js");
const listingRoutes = require("./routes/listing.js");
const userRoutes = require("./routes/user.js");
const dashboardRoutes = require("./routes/dashboard");
const moodRoutes = require("./routes/mood");
const sleepRoutes = require("./routes/sleep");
const newsRoute = require("./routes/news");

const { isLoggedIn } = require("./middlewares/middleware.js");
const User = require("./models/user.js");
const ExpressError = require("./utils/expressError.js");

// =====================
// Basic Middleware
// =====================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =====================
// CORS
// =====================
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://sentra-mind-final.vercel.app"
  ],
  credentials: true
}));

app.options("*", cors({
  origin: [
    "http://localhost:5173",
    "https://sentra-mind-final.vercel.app"
  ],
  credentials: true
}));

// =====================
// Logger
// =====================
app.use((req, res, next) => {
  console.log("REQ:", req.method, req.url);
  next();
});

// =====================
// Session
// =====================
const sessionOptions = {
  secret: process.env.JWT_SECRET || "mySuperSecretCode",
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 7 * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    secure: process.env.NODE_ENV === "production",
  },
};

app.use(session(sessionOptions));

// =====================
// Passport Setup
// =====================
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// =====================
// Routes
// =====================

app.get("/", (req, res) => {
  res.send("✅ SentraMind Backend Running");
});

app.get("/new", isLoggedIn, (req, res) => {
  res.json({ user: req.user });
});

app.get("/demouser", async (req, res) => {
  try {
    const fakeUser = new User({
      email: "gaurav@gmail.com",
      username: "gaurav",
    });

    const registeredUser = await User.register(fakeUser, "hello123");

    res.json(registeredUser);
  } catch (err) {
    console.log(err);

    res.status(500).json({
      error: "Failed to create demo user",
    });
  }
});

// =====================
// API Routes
// =====================
app.use("/api", chatRoutes);

app.use("/sentra", listingRoutes);

app.use("/", userRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/mood", moodRoutes);

app.use("/api/sleep", sleepRoutes);

app.use("/api/news", newsRoute);

// =====================
// 404 Handler
// =====================
app.all("*", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found"));
});

// =====================
// Error Handler
// =====================
app.use((err, req, res, next) => {
  console.error("ERROR:", err);

  res.status(err.statusCode || 500).json({
    error: err.message || "Something went wrong!",
  });
});

// =====================
// MongoDB Connection
// =====================
const dbUrl = process.env.MONGODB_URI;

async function connectDB() {
  try {
    await mongoose.connect(dbUrl);

    console.log("✅ Connected to MongoDB");
  } catch (err) {
    console.log("❌ MongoDB Error:", err);
  }
}

connectDB();

// =====================
// Start Server
// =====================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});