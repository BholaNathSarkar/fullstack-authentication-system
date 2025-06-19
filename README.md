# 🛡️ Fullstack Authentication System

A complete fullstack authentication system built with **React**, **Node.js**, **Passport.js**, and **MongoDB**. This project supports four authentication strategies:

1. 🔑 Traditional Registration/Login using JWT
2. 🌐 Google OAuth Login
3. 🐱 GitHub OAuth Login
4. 🐦 Twitter OAuth Login

All user data is securely stored in **MongoDB**.

---

## 🚀 Features

- JWT authentication using `passport-jwt`
- OAuth strategies via Google, GitHub, and Twitter
- MongoDB integration for persistent user data
- Protected routes with JWT middleware
- React frontend with MUI components
- Session and token handling with Passport
- Clear folder structure for scalability

---

## 🧰 Tech Stack

- **Frontend**: React, React Router, Material UI (MUI)
- **Backend**: Node.js, Express.js
- **Authentication**: Passport.js (JWT + OAuth Strategies)
- **Database**: MongoDB with Mongoose
- **Session Management**: Express-session

---

## 📦 Prerequisites

Before running the app locally, make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)
- A Google/GitHub/Twitter developer account (for OAuth keys)

---

## 🔧 Environment Variables

Create a `.env` file in the root of the project and add the following:

```env
# Server
PORT=3000
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1d

# MongoDB
MONGO_URI=your_mongo_connection_string

# Google OAuth
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_CALLBACK_URL=http://localhost:3000/api/auth/google/callback

# GitHub OAuth
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_CALLBACK_URL=http://localhost:3000/api/auth/github/callback

# Twitter OAuth
TWITTER_CONSUMER_KEY=your_twitter_consumer_key
TWITTER_CONSUMER_SECRET=your_twitter_consumer_secret

# Redirect URI for frontend after OAuth login
REDIRECT_URI=http://localhost:5173/profile

