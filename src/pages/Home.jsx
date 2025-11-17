import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import axios from "axios";
import {
  Box,
  Button,
  TextField,
  Typography,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Divider,
} from "@mui/material";
import { FaTimes, FaCalendarAlt, FaMapMarkerAlt, FaClock } from "react-icons/fa";

import logo_1 from "../assets/logo_1.jpg";
import logo_show from "../assets/logo_show.png";

// خلفية دارك فاخرة (خشب + معدن + كلادينج)
const backgroundImage = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=85";

function InvitationPage({ language = "AR" }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSuccess, setAlertSuccess] = useState(true);

  const primaryColor = "#e0393a";
  const textGold = "#d4af37"; // لمسة ذهبية فاخرة

  const t = {
    AR: {
      title: "تتشرف شركة علم الدين جروب بدعوتكم لحضور",
      event: "معرض القاهرة الدولي للأخشاب والماكينات",
      date: "من 27 إلى 30 نوفمبر 2025",
      location: "مركز القاهرة الدولي للمؤتمرات والمعارض - مدينة نصر",
      hours: "من 11:00 صباحاً حتى 8:00 مساءً يومياً",
      cta: "تأكيد الحضور",
      formTitle: "تسجيل الحضور",
      name: "الاسم بالكامل",
      phone: "رقم الهاتف",
      email: "البريد الإلكتروني",
      submit: "تسجيل",
      success: "تم تسجيل حضورك بنجاح، نتطلع لرؤيتك في المعرض!",
      error: "برجاء ملء جميع الحقول",
    },
    EN: {
      title: "Alaa Eldin Group Cordially Invites You to Attend",
      event: "Cairo International Wood & Woodworking Machinery Show",
      date: "27 – 30 November 2025",
      location: "Cairo International Convention & Exhibition Center",
      hours: "11:00 AM – 8:00 PM Daily",
      cta: "Confirm Attendance",
      formTitle: "Register Your Attendance",
      name: "Full Name",
      phone: "Phone Number",
      email: "Email Address",
      submit: "Register",
      success: "Registration successful! We look forward to seeing you.",
      error: "Please fill in all fields",
    },
  };

  const text = language === "AR" ? t.AR : t.EN;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && phone && email) {
      const data = { Name: name, Phone: phone, Email: email, Event: "WoodShow 2025", Date: new Date().toLocaleString() };
      axios.post("https://sheetdb.io/api/v1/bqmf96vtebnks", data).catch(console.error);

      emailjs.send("service_17dbf7k", "template_4wvknlu", {
        from_name: name,
        message: `WoodShow 2025 Registration\nName: ${name}\nPhone: ${phone}\nEmail: ${email}`,
      }, "sInLUMT_X6Pf4NYkb").then(() => {
        setAlertSuccess(true);
        setAlertMessage(text.success);
        setOpenAlert(true);
        setOpenDialog(false);
        setName(""); setPhone(""); setEmail("");
      }).catch(() => {
        setAlertSuccess(false);
        setAlertMessage("حدث خطأ، حاول مرة أخرى");
        setOpenAlert(true);
      });
    } else {
      setAlertSuccess(false);
      setAlertMessage(text.error);
      setOpenAlert(true);
    }
  };

  return (
    <Box sx={{
      minHeight: "100vh",
      backgroundImage: `url(${backgroundImage})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundAttachment: "fixed",
      position: "relative",
      display: "flex",
      alignItems: "center",
      py: { xs: 4, md: 8 },
      direction: language === "AR" ? "rtl" : "ltr",
      fontFamily: "'Tajawal', 'Cairo', sans-serif",
      // Overlay غامق وأنيق
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        background: "linear-gradient(135deg, rgba(20,20,30,0.95) 0%, rgba(10,10,20,0.90) 100%)",
        zIndex: 1,
      }
    }}>
      {/* كل المحتوى فوق الـ overlay */}
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ textAlign: "center" }}
        >
          {/* لوجوهات علم الدين في الأعلى */}
          <Box sx={{ mb: 3, display: "flex", justifyContent: "center", alignItems: "center", gap: 4, flexWrap: "wrap" }}>
            <img src={logo_1} alt="Alaa Eldin Group" style={{ height: 150, border: "2px solid #e0393a", borderRadius: "15px", filter: "drop-shadow(0 4px 10px rgba(0,0,0,0.5))" }} />
           
          </Box>

          <Typography variant="h5" sx={{ 
            color: "#eee", 
            mb: 3, 
            fontWeight: 500, 
            letterSpacing: 1.5,
            textShadow: "0 2px 10px rgba(0,0,0,0.6)"
          }}>
            {text.title}
          </Typography>

          <Divider sx={{ width: 120, mx: "auto", my: 1, borderColor: primaryColor, borderBottomWidth: 4, opacity: 0.9 }} />

          {/* لوجو المعرض في المنتصف تمامًا */}
          <Box sx={{ 
            my: 3, 
            display: "flex", 
            justifyContent: "center",
            alignItems: "center"
          }}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <img 
                src={logo_show} 
                alt="WoodShow 2025" 
                style={{ 
                  maxHeight: 120, 
                  filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.7))",
                  borderRadius: "12px"
                }} 
              />
            </motion.div>
          </Box>

          <Typography variant="h3" sx={{ 
            fontWeight: 800, 
            background: `linear-gradient(90deg, ${primaryColor}, ${textGold}, ${primaryColor})`,
            backgroundClip: "text",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 6, 
            fontSize: { xs: "1.1rem", md: "2rem" },
            textShadow: "0 4px 20px rgba(0,0,0,0.5)"
          }}>
            {text.event}
          </Typography>

          {/* تفاصيل المعرض */}
          <Box sx={{ maxWidth: 700, mx: "auto", mb: 3, lineHeight: 4 }}>
            <Typography sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, color: "#ddd", fontSize: "1.35rem", textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}>
              <FaCalendarAlt color={primaryColor} size={26} /> <span style={{ color: textGold }}>{text.date}</span>
            </Typography>
            <Typography sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, color: "#ddd", fontSize: "1.35rem", textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}>
              <FaMapMarkerAlt color={primaryColor} size={26} /> {text.location}
            </Typography>
            <Typography sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, color: "#ddd", fontSize: "1.35rem", textShadow: "0 2px 8px rgba(0,0,0,0.6)" }}>
              <FaClock color={primaryColor} size={26} /> {text.hours}
            </Typography>
          </Box>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              onClick={() => setOpenDialog(true)}
              variant="contained"
              size="large"
              sx={{
                bgcolor: primaryColor,
                color: "#fff",
                px: 8,
                py: 2.5,
                borderRadius: "50px",
                fontSize: "1.4rem",
                fontWeight: 700,
                boxShadow: `0 10px 30px rgba(224, 57, 58, 0.5)`,
                textTransform: "none",
                "&:hover": { 
                  bgcolor: "#c02026", 
                  transform: "translateY(-4px)", 
                  boxShadow: "0 15px 40px rgba(224, 57, 58, 0.6)" 
                },
              }}
            >
              {text.cta}
            </Button>
          </motion.div>
        </motion.div>
      </Container>

      {/* باقي الـ Dialogs بدون تغيير كبير (نفس اللي فات) */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: "16px", overflow: "hidden" } }}>
        <DialogTitle sx={{ bgcolor: primaryColor, color: "#fff", textAlign: "center", fontWeight: 600, py: 3 }}>
          {text.formTitle}
          <IconButton onClick={() => setOpenDialog(false)} sx={{ position: "absolute", right: 12, top: 12, color: "#fff" }}>
            <FaTimes />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ bgcolor: "#111", p: 4 }}>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField label={text.name} fullWidth margin="normal" value={name} onChange={(e) => setName(e.target.value)} required 
              InputLabelProps={{ style: { color: '#aaa' } }}
              InputProps={{ style: { color: '#fff' } }}
              sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#444' }, '&:hover fieldset': { borderColor: primaryColor } } }} />
            <TextField label={text.phone} fullWidth margin="normal" value={phone} onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))} required 
              InputLabelProps={{ style: { color: '#aaa' } }}
              InputProps={{ style: { color: '#fff' } }}
              sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#444' }, '&:hover fieldset': { borderColor: primaryColor } } }} />
            <TextField label={text.email} type="email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} required 
              InputLabelProps={{ style: { color: '#aaa' } }}
              InputProps={{ style: { color: '#fff' } }}
              sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#444' }, '&:hover fieldset': { borderColor: primaryColor } } }} />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 4, py: 2, bgcolor: primaryColor, fontSize: "1.2rem", fontWeight: 700, borderRadius: "50px" }}>
              {text.submit}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog open={openAlert} onClose={() => setOpenAlert(false)} PaperProps={{ sx: { bgcolor: "#111", border: `2px solid ${alertSuccess ? primaryColor : '#d32f2f'}`, borderRadius: "16px" } }}>
        <DialogContent sx={{ textAlign: "center", p: 6 }}>
          <Typography variant="h5" sx={{ color: alertSuccess ? primaryColor : "#d32f2f", mb: 2, fontWeight: 700 }}>
            {alertSuccess ? "✓ تم بنجاح" : "خطأ"}
          </Typography>
          <Typography sx={{ mb: 4, color: "#ccc", fontSize: "1.1rem" }}>{alertMessage}</Typography>
          <Button onClick={() => setOpenAlert(false)} variant="outlined" sx={{ borderColor: primaryColor, color: primaryColor, px: 4 }}>
            موافق
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default InvitationPage;