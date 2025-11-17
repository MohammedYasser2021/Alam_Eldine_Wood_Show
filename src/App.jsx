import React, { useEffect, useState } from "react";
import Home from "./pages/Home";
import logo from "./assets/logo.png";
import { MdGTranslate } from "react-icons/md";
import { IconButton, Box, AppBar, Toolbar, Container } from "@mui/material";
import "./App.css";

const App = () => {
  const [language, setLanguage] = useState(() => {
    const stored = localStorage.getItem("language");
    return stored || "AR";
  });

  useEffect(() => {
    localStorage.setItem("language", language);
    document.documentElement.dir = language === "AR" ? "rtl" : "ltr";
    document.documentElement.lang = language === "AR" ? "ar" : "en";
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === "AR" ? "EN" : "AR"));
  };

  // اللون الأحمر الفاخر (نفس لون علم الدين جروب)
  const primaryRed = "#e0393a";

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#0a0e1a" }}>
      {/* Navbar أحمر فاخر */}
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          bgcolor: "rgba(17, 25, 35, 0.95)", // خلفية شبه شفافة
          borderBottom: `1px solid ${primaryRed}30`,
          backdropFilter: "blur(20px)",
          zIndex: 1300,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              minHeight: { xs: 70, sm: 80 },
              px: { xs: 2, sm: 3 },
              justifyContent: "space-between",
            }}
          >
            {/* Logo */}
            <Box
              component="a"
              href="/"
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                transition: "0.3s",
                "&:hover": { transform: "scale(1.05)" },
              }}
            >
              <img
                src={logo}
                alt="Aster Sanad"
                style={{
                  height: "100px",
                  filter: "brightness(1.2)",
                }}
              />
            </Box>

            {/* Language Toggle - أحمر دلوقتي */}
            <IconButton
              onClick={toggleLanguage}
              sx={{
                color: primaryRed,
                bgcolor: `${primaryRed}22`,           // خلفية شفافة حمراء
                width: 48,
                height: 48,
                borderRadius: "14px",
                border: `1.5px solid ${primaryRed}50`,
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                "&:hover": {
                  bgcolor: `${primaryRed}35`,
                  transform: "scale(1.02)",
                  boxShadow: `0 10px 30px ${primaryRed}60`,
                  borderColor: primaryRed,
                },
                "&:active": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <MdGTranslate size={24} />
            </IconButton>
          </Toolbar>
        </Container>
      </AppBar>

      {/* المحتوى الرئيسي */}
      <Box sx={{ pt: { xs: "80px", sm: "90px" } }}>
        <Home language={language} />
      </Box>
    </Box>
  );
};

export default App;