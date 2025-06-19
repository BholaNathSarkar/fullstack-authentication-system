import React from "react";
import {
  BrowserRouter,
  Route,
  Routes,
  Outlet,
  Navigate,
} from "react-router-dom";
import Register from "./components/Register";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Login from "./components/Login";
import Profile from "./components/Profile";
import OAuthCallback from "./components/OAuthCallback";

const Router = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Default route redirects based on login status */}
          <Route path="/" element={<RedirectBasedOnAuth />} />

          {/* Public routes */}
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/oauth-callback" element={<OAuthCallback />} />
          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

// Redirect based on auth status on first load
const RedirectBasedOnAuth = () => {
  const { token } = React.useContext(AuthContext);
  return token ? (
    <Navigate to="/profile" replace />
  ) : (
    <Navigate to="/login" replace />
  );
};

// Protect private routes
const ProtectedRoute = () => {
  const { token } = React.useContext(AuthContext);
  return token ? <Outlet /> : <Navigate to="/login" replace />;
};

export default Router;
