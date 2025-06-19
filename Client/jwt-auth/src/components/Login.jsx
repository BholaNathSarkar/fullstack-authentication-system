import React, { useState, useContext } from "react";
import axios from "axios";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Link,
  Stack,
  TextField,
  Typography,
  Divider,
  Paper,
} from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import LoginLogo from "./LoginLogo";

const apiUrl = "http://localhost:3000/api";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${apiUrl}/auth/login`, form);
      console.log(res.data.token);
      login(res.data.token);
      navigate("/profile");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to right, #f0f4ff, #d9e4ff)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
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
            Welcome Back 👋
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary">
            Please sign in to your account
          </Typography>

          <form onSubmit={handleSubmit}>
            <Stack spacing={2}>
              <TextField
                variant="outlined"
                label="Email"
                type="email"
                name="email"
                fullWidth
                required
                value={form.email}
                onChange={handleChange}
              />
              <TextField
                variant="outlined"
                label="Password"
                type="password"
                name="password"
                fullWidth
                required
                value={form.password}
                onChange={handleChange}
              />
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ mt: 1 }}
              >
                Login
              </Button>
            </Stack>
          </form>

          <Divider sx={{ my: 2 }}>or continue with</Divider>

          <LoginLogo />

          <Typography variant="body2" align="center">
            Don't have an account?{" "}
            <Link component={RouterLink} to="/register" underline="hover">
              Register here
            </Link>
          </Typography>
        </Stack>
      </Paper>
    </Box>
  );
}
