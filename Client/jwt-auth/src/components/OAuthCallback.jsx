// src/components/OAuthCallback.jsx
import React, { useEffect, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const OAuthCallback = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useContext(AuthContext);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (token) {
      login(token);
      navigate("/profile");
    }
  }, [location, navigate]);

  return <p>Logging you in...</p>;
};

export default OAuthCallback;
