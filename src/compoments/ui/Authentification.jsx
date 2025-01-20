/* eslint-disable react/prop-types */
import React from "react";
import {
  Button,
  Container,
  CssBaseline,
  Box,
  Paper,
  Typography,
} from "@mui/material";

function Authentification({ login }) {
  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography component="h2" variant="h3">
            Welcome to Jammming
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={login}
            sx={{ mt: 2 }}
          >
            Connect with Spotify
          </Button>
        </Paper>
      </Box>
    </Container>
  );
}

export default React.memo(Authentification);
