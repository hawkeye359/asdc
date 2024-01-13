"use client";
import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Footer({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={defaultTheme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <CssBaseline />
        {children}
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: "auto",
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[200]
                : theme.palette.grey[800],
          }}
        >
          <Container maxWidth="sm">
            <Typography variant="h6">Contact us</Typography>
            <Typography variant="body1">101/42 Colonel ganj</Typography>
            <Typography variant="body1">Kanpur, Uttar Pradesh</Typography>
            <Typography variant="body1">+91 91150 42219</Typography>
            <Link
              target="_blank"
              href="https://www.termsandconditionsgenerator.com/live.php?token=F0HQ4NkzmT8i6gBqC4UcKlUFxztVclMg"
              variant="body2"
            >
              Terms & conditions
            </Link>
            <Typography variant="body1">
              My sticky footer can be found here.
            </Typography>

            <Copyright />
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
