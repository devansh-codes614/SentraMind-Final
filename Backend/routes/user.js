// Backend/routes/user.js

const express = require("express");
const passport = require("passport");
const User = require("../models/user"); // ✅ model import

const router = express.Router();

// =====================
// SIGNUP ROUTE
// =====================
router.post("/signup", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    console.log("SIGNUP BODY:", req.body);

    // Basic validation
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already taken" });
    }

    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // Register user (passport-local-mongoose)
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);

    console.log("REGISTERED USER:", registeredUser);

    // Auto-login after signup
    req.login(registeredUser, (err) => {
      if (err) {
        console.error("LOGIN AFTER SIGNUP ERROR:", err);
        return res
          .status(500)
          .json({ message: "Error logging in user after signup" });
      }

      return res.status(201).json({
        message: "User created and logged in successfully!",
        user: {
          _id: registeredUser._id,
          username: registeredUser.username,
          email: registeredUser.email,
        },
      });
    });
  } catch (err) {
    console.error("SIGNUP BACKEND ERROR:", err);
    return res
      .status(500)
      .json({ message: "Error creating user", error: err.message });
  }
});

// =====================
// LOGIN ROUTE
// =====================
router.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) return next(err);

    if (!user) {
      return res
        .status(401)
        .json({ message: info?.message || "Invalid username or password" });
    }

    req.logIn(user, (err2) => {
      if (err2) return next(err2);

      console.log("LOGGED IN USER:", user);

      return res.status(200).json({
        message: "User login successful!",
        user: {
          _id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    });
  })(req, res, next);
});

// =====================
// LOGOUT ROUTE
// =====================
router.get("/logout", (req, res, next) => {
  req.logOut((err) => {
    if (err) return next(err);

    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.status(200).json({ message: "Logged out successfully" });
    });
  });
});

module.exports = router;
