const express = require("express");
const router = express.Router();

const User = require("../models/User");
const UserMediaProfile = require("../models/UserMediaProfile");
const jwt = require("jsonwebtoken");
const auth = require("../middlewares/authMiddleware");
const passport = require("../config/passport")(); // Initialize configured Passport instance

// ========== User Registration ==========
router.post("/register", async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    // Create new user
    user = new User({ userName, email, password });
    await user.save();

    // Sign JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return res.json({ token });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// ========== User Login ==========
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    // Sign JWT
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    return res.json({ token });
  } catch (err) {
    return res.status(500).json({ error: "Server error" });
  }
});

// ========== Get Current Authenticated User ==========
router.get(
  "/me",
  passport.authenticate("jwt", { session: false }), // Use JWT strategy to verify token
  async (req, res) => {
    try {
      let user;

      // Determine model based on token payload
      if (req.user.mediaName) {
        user = await UserMediaProfile.findById(req.user.id);
      } else {
        user = await User.findById(req.user.id).select("-password");
      }

      res.json(user);
    } catch {
      res.status(500).json({ error: "Server error" });
    }
  }
);

// ==========  OAuth Routes ==========

// --- Google OAuth ---
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  async (req, res) => {
    try {
      const { name, email, photo } = req.user;

      // Check if user exists in social profile collection
      let user = await UserMediaProfile.findOne({ email, mediaName: "Google" });
      if (!user) {
        user = new UserMediaProfile({
          userName: name,
          email,
          photo,
          mediaName: "Google",
        });
        await user.save();
      }

      // Issue token
      const token = jwt.sign(
        { id: user._id, mediaName: "Google" },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      // Redirect to frontend with token
      res.redirect(`${process.env.REDIRECT_URI}${token}`);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

// --- GitHub OAuth ---
router.get(
  "/github",
  passport.authenticate("github", { scope: ["user:email"] })
);
router.get(
  "/github/callback",
  passport.authenticate("github", { failureRedirect: "/login" }),
  async (req, res) => {
    try {
      const { name, email, photo } = req.user;

      let user = await UserMediaProfile.findOne({ email, mediaName: "Github" });
      if (!user) {
        user = new UserMediaProfile({
          userName: name,
          email,
          photo,
          mediaName: "Github",
        });
        await user.save();
      }

      const token = jwt.sign(
        { id: user._id, mediaName: "Github" },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      res.redirect(`${process.env.REDIRECT_URI}${token}`);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

// --- Twitter (X) OAuth ---
router.get("/twitter", passport.authenticate("twitter"));
router.get(
  "/twitter/callback",
  passport.authenticate("twitter", { failureRedirect: "/login" }),
  async (req, res) => {
    try {
      const { name, email, photo } = req.user;

      let user = await UserMediaProfile.findOne({
        email,
        mediaName: "Twitter",
      });

      if (!user) {
        user = new UserMediaProfile({
          userName: name,
          email,
          photo,
          mediaName: "Twitter",
        });
        await user.save();
      }

      const token = jwt.sign(
        { id: user._id, mediaName: "Twitter" },
        process.env.JWT_SECRET,
        { expiresIn: process.env.JWT_EXPIRES_IN }
      );

      res.redirect(`${process.env.REDIRECT_URI}${token}`);
    } catch (error) {
      return res.status(500).json(error);
    }
  }
);

// ========== Logout ==========
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(() => res.redirect("/"));
  });
});

module.exports = router;
