import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import {
  Stack,
  Box,
  Typography,
  Button,
  Avatar,
  CircularProgress,
} from "@mui/material";

export default function Profile() {
  const [user, setUser] = useState(null);
  const { token, logout } = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch(() => {
        logout();
      });
  }, [token, logout]);

  if (!user) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(to right, #e0eafc, #cfdef3)",
      }}
    >
      <Box
        sx={{
          width: "90%",
          maxWidth: 500,
          bgcolor: "white",
          boxShadow: 4,
          borderRadius: 4,
          p: 4,
          textAlign: "center",
        }}
      >
        <Stack spacing={3} alignItems="center">
          {user.photo ? (
            <Avatar
              src={user.photo}
              alt="User Avatar"
              sx={{ width: 120, height: 120 }}
            />
          ) : (
            <Avatar sx={{ width: 120, height: 120, bgcolor: "gray" }}>
              N/A
            </Avatar>
          )}

          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            Hi, {user.userName}
          </Typography>

          <Typography variant="h6">Email: {user.email}</Typography>

          <Typography variant="h6">
            Logged in via: {user.mediaName || "Registration"}
          </Typography>

          <Button
            onClick={logout}
            variant="contained"
            color="warning"
            sx={{ mt: 2, px: 4 }}
          >
            Logout
          </Button>
        </Stack>
      </Box>
    </Box>
  );
}
