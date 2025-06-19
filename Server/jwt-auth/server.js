// Import dependencies
const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const cors = require("cors");
const configureSession = require("./config/session");
const authRoutes = require("./routes/auth");
const configurePassport = require("./config/passport.js");

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// Enable CORS for frontend origin (e.g., React running on Vite at port 5173)
app.use(
  cors({
    origin: "http://localhost:5173", // Change this in production!
    credentials: true, // Allow cookies/session info to be sent
  })
);

// Parse incoming JSON payloads
app.use(express.json());

// Initialize and configure Passport strategies
const passportInstance = configurePassport();

// Set up session middleware (needed for persistent login via OAuth)
app.use(configureSession());

// Initialize Passport
app.use(passportInstance.initialize()); // For all auth strategies
app.use(passportInstance.session()); // Only needed for OAuth with sessions (e.g., Twitter)

// Define default port
const PORT = process.env.PORT || 5000;

// Health check / default route
app.get("/", (req, res) => {
  return res.send("Hello from server");
});

// Mount authentication routes
app.use("/api/auth", authRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
