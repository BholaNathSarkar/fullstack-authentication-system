import React from "react";
import { GoogleLogo, GithubLogo, XLogo } from "@phosphor-icons/react";
import {
  Stack,
  IconButton,
  Tooltip,
  useTheme,
  Box,
  Typography,
} from "@mui/material";

// Define reusable providers list
const providers = [
  {
    name: "Google",
    id: "google",
    icon: <GoogleLogo size={24} weight="fill" />,
    color: "#EA4335",
  },
  {
    name: "GitHub",
    id: "github",
    icon: <GithubLogo size={24} weight="fill" />,
    color: "#000000",
  },
  {
    name: "X (Twitter)",
    id: "twitter",
    icon: <XLogo size={24} weight="fill" />,
    color: "#000000",
  },
];

const handleOAuthRedirect = (provider) => {
  window.location.href = `http://localhost:3000/api/auth/${provider}`;
};

const LoginLogo = () => {
  const theme = useTheme();

  return (
    <Box>
      <Stack direction="row" spacing={2} justifyContent="center">
        {providers.map((provider) => (
          <Tooltip title={provider.name} key={provider.id}>
            <IconButton
              onClick={() => handleOAuthRedirect(provider.id)}
              sx={{
                backgroundColor: theme.palette.grey[200],
                borderRadius: 2,
                p: 1.2,
                transition: "all 0.3s",
                "&:hover": {
                  backgroundColor: provider.color,
                  color: "#fff",
                },
              }}
            >
              {provider.icon}
            </IconButton>
          </Tooltip>
        ))}
      </Stack>
    </Box>
  );
};

export default LoginLogo;
