import React, { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";
import {
  Stack,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
  Divider,
} from "@mui/material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import LoginLogo from "./LoginLogo";

export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    userName: "",
    email: "",
    password: "",
  });
  const { register } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:3000/api/auth/register",
        form
      );
      alert("User registered successfully!");
      register(res.data.token);
      navigate("/profile");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #f5f7fa, #c3cfe2)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          maxWidth: 420,
          width: "100%",
          borderRadius: 4,
          backgroundColor: "white",
        }}
      >
        <Stack spacing={3}>
          <Typography variant="h4" fontWeight={600} align="center">
            Create an Account
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary">
            Join us to unlock amazing features.
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Full Name"
                name="userName"
                value={form.userName}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
              />
              <TextField
                label="Email Address"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                variant="outlined"
                required
                fullWidth
              />
              <Button type="submit" variant="contained" size="large">
                Register
              </Button>
            </Stack>
          </form>

          <Divider sx={{ my: 2 }}>or register with</Divider>
          <LoginLogo />

          <Typography variant="body2" align="center">
            Already have an account?{" "}
            <Link component={RouterLink} to="/login" underline="hover">
              Login here
            </Link>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}
