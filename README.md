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


## 🌐 OAuth Setup Instructions

To enable third-party logins, you must create applications on each platform and configure redirect URIs.

---

### 🔑 Google OAuth

1. Visit: [Google Developer Console](https://console.developers.google.com/)
2. Create a new project.
3. Go to **OAuth consent screen** → Fill in app details.
4. Under **Credentials**, create **OAuth 2.0 Client ID**:
   - **Application type**: Web application
   - **Authorized redirect URI**:  
     `http://localhost:3000/api/auth/google/callback`
5. Copy the **Client ID** and **Client Secret** into your `.env` file:

```env
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

### 🐱 GitHub OAuth

1. Visit: [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **"New OAuth App"**.
3. Fill in the following:
   - **Homepage URL**: `http://localhost:5173`
   - **Authorization callback URL**:  
     `http://localhost:3000/api/auth/github/callback`
4. Copy the **Client ID** and **Client Secret** into your `.env` file.

---

### 🐦 Twitter OAuth

1. Visit: [Twitter Developer Portal](https://developer.twitter.com/)
2. Create a new project and app.
3. Under **App Settings**, enable **3-legged OAuth (OAuth 1.0a)**.
4. Set **Callback URL**:  
   `http://localhost:3000/api/auth/twitter/callback`
5. Add `http://localhost:5173` to the **Website URL** field.
6. Copy **Consumer API Key** and **API Secret Key** into your `.env` file.

---

⚠️ Make sure your redirect/callback URLs in each platform match those in your .env.

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
```
## 🛠️ Installation & Setup
### 1. Clone the repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```
### 2. Install server and client dependencies

```bash
cd server
npm install
cd client
npm install
```
### 4. Run MongoDB (if not running)
Make sure MongoDB is running locally or you provide a cloud MongoDB URI (e.g. MongoDB Atlas) in your .env file.

### 5. Run both server and client

```bash
# Start backend
cd server
npm run dev

# Start frontend
cd client\jwt-auth
npm run dev
```



## 🔐 Auth Flow Summary
Register/Login (JWT) via /api/auth/register and /api/auth/login

OAuth login via /api/auth/google, /github, or /twitter

On success, users are redirected to the frontend (REDIRECT_URI) with a JWT token

Protected routes are secured using passport-jwt middleware
