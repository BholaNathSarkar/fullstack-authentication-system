const passport = require("passport");
const dotenv = require("dotenv");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const GithubStrategy = require("passport-github2").Strategy;
const TwitterStrategy = require("passport-twitter").Strategy;
const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt");

const User = require("../models/User");
const UserMediaProfile = require("../models/UserMediaProfile");

dotenv.config();

module.exports = function configurePassport() {
  /**
   * JWT Strategy
   * Authenticates users based on a JWT token in the Authorization header.
   */
  passport.use(
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET,
      },
      async (payload, done) => {
        try {
          let user;

          // Decide which model to query based on whether mediaName exists in the JWT payload
          if (payload.mediaName) {
            user = await UserMediaProfile.findById(payload.id);
          } else {
            user = await User.findById(payload.id);
          }

          if (!user) return done(null, false); // User not found
          return done(null, user); // Successfully found user
        } catch (err) {
          return done(err, false); // Error occurred during lookup
        }
      }
    )
  );

  /**
   * Google OAuth2 Strategy
   */
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      (accessToken, refreshToken, profile, done) => {
        // Extract necessary profile info
        const user = {
          email: profile.emails?.[0]?.value,
          name: profile.displayName,
          photo: profile.photos?.[0]?.value,
        };
        return done(null, user);
      }
    )
  );

  /**
   * GitHub OAuth Strategy
   */
  passport.use(
    new GithubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.GITHUB_CALLBACK_URL,
      },
      async (accessToken, refreshToken, profile, done) => {
        let email = null;

        // Attempt to get primary verified email from profile
        if (profile.emails && profile.emails.length > 0) {
          email =
            profile.emails.find((e) => e.primary && e.verified)?.value ||
            profile.emails[0]?.value;
        }

        // If email still not found, fetch directly from GitHub API
        if (!email) {
          try {
            const response = await fetch("https://api.github.com/user/emails", {
              headers: {
                Authorization: `token ${accessToken}`,
                "User-Agent": "node.js",
                Accept: "application/vnd.github.v3+json",
              },
            });
            const emails = await response.json();
            email =
              emails.find((e) => e.primary && e.verified)?.email ||
              emails[0]?.email;
          } catch (err) {
            console.error("Failed to fetch GitHub emails:", err);
          }
        }

        // Construct user object
        const user = {
          email,
          name: profile.displayName || profile.username,
          photo: profile.photos?.[0]?.value,
        };

        return done(null, user);
      }
    )
  );

  /**
   * Twitter Strategy (now X)
   */
  passport.use(
    new TwitterStrategy(
      {
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: "http://localhost:3000/api/auth/twitter/callback",
        includeEmail: true, // Request email explicitly
      },
      (token, tokenSecret, profile, done) => {
        // Extract profile information
        const user = {
          name: profile.displayName,
          email: profile.emails?.[0]?.value,
          photo: profile.photos?.[0]?.value,
        };
        return done(null, user);
      }
    )
  );

  /**
   * Passport session management
   */
  passport.serializeUser((user, done) => done(null, user)); // Store entire user in session
  passport.deserializeUser((user, done) => done(null, user)); // Retrieve user from session

  return passport;
};
