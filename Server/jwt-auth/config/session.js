const session = require("express-session");

module.exports = function configureSession() {
  return session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  });
};
