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
import { FaTimes, FaCalendarAlt, FaMapMarkerAlt, FaClock, FaExternalLinkAlt } from "react-icons/fa";

import logo_1 from "../assets/logo_1.jpg";
import logo_show from "../assets/logo_show.png";

const backgroundImage = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=85";

function InvitationPage({ language = "AR" }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSuccess, setAlertSuccess] = useState(true);

  const isArabic = language === "AR";
  const primaryColor = "#e0393a";
  const textGold = "#d4af37";

  const t = {
    AR: {
      title: "تتشرف شركة علم الدين جروب بدعوتكم لحضور",
      event: "معرض القاهرة الدولي للأخشاب والماكينات",
      date: "من 27 إلى 30 نوفمبر 2025",
      location: "مركز القاهرة الدولي للمؤتمرات والمعارض - مدينة نصر",
      hours: "من 11:00 صباحاً حتى 8:00 مساءً يومياً",
      cta: "تأكيد الحضور",
      registerLink: "للتسجيل في المعرض",
      formTitle: "تسجيل الحضور",
      name: "الاسم بالكامل",
      phone: "رقم الهاتف",
      email: "البريد الإلكتروني",
      notes: "ملاحظات إضافية (اختياري)",
      submit: "تسجيل",
      success: "تم تسجيل حضورك بنجاح، نتطلع لرؤيتك في المعرض!",
      error: "برجاء ملء جميع الحقول المطلوبة",
    },
    EN: {
      title: "Alaa Eldin Group Cordially Invites You to Attend",
      event: "Cairo International Wood & Woodworking Machinery Show",
      date: "27 – 30 November 2025",
      location: "Cairo International Convention & Exhibition Center",
      hours: "11:00 AM – 8:00 PM Daily",
      cta: "Confirm Attendance",
      registerLink: "Register for the Exhibition",
      formTitle: "Register Your Attendance",
      name: "Full Name",
      phone: "Phone Number",
      email: "Email Address",
      notes: "Additional Notes (Optional)",
      submit: "Register",
      success: "Registration successful! We look forward to seeing you.",
      error: "Please fill in all required fields",
    },
  };

  const text = isArabic ? t.AR : t.EN;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone || !email) {
      setAlertSuccess(false);
      setAlertMessage(text.error);
      setOpenAlert(true);
      return;
    }

    const data = {
      Name: name,
      Phone: phone,
      Email: email,
      Notes: notes || "لا توجد ملاحظات",
      Event: "WoodShow 2025",
      Date: new Date().toLocaleString("en-GB"),
    };

    axios.post("https://sheetdb.io/api/v1/78qosbgjp9bbe", data).catch(console.error);

    emailjs.send("service_17dbf7k", "template_4wvknlu", {
      from_name: name,
      message: `تسجيل جديد - WoodShow 2025\nالاسم: ${name}\nالهاتف: ${phone}\nالبريد: ${email}\nالملاحظات: ${notes || "لا توجد"}`,
    }, "sInLUMT_X6Pf4NYkb")
    .then(() => {
      setAlertSuccess(true);
      setAlertMessage(text.success);
      setOpenAlert(true);
      setOpenDialog(false);
      setName(""); setPhone(""); setEmail(""); setNotes("");
    })
    .catch(() => {
      setAlertSuccess(false);
      setAlertMessage("حدث خطأ، حاول مرة أخرى");
      setOpenAlert(true);
    });
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
      direction: isArabic ? "rtl" : "ltr",
      fontFamily: "'Tajawal', 'Cairo', sans-serif",
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0, left: 0, right: 0, bottom: 0,
        background: "linear-gradient(135deg, rgba(20,20,30,0.95) 0%, rgba(10,10,20,0.90) 100%)",
        zIndex: 1,
      }
    }}>

      <style jsx global>{`
      ::-webkit-scrollbar { width: 12px; }
      ::-webkit-scrollbar-track { 
        background: #e0393a; 
        border-left: 2px solid #e0393a;
      }
      ::-webkit-scrollbar-thumb { 
        background: #111; 
        border-radius: 10px; 
        border: 2px solid #e0393a;
        box-shadow: inset 0 0 8px rgba(0,0,0,0.9);
      }
      ::-webkit-scrollbar-thumb:hover { background: #222; }
      ::-webkit-scrollbar-thumb:active { background: #000; }
      * { scrollbar-color: #111 #e0393a; scrollbar-width: thin; }
      html, body { background: #0a0a0a !important; }
    `}</style>
      <Container maxWidth="md" sx={{ position: "relative", zIndex: 2 }}>
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }} style={{ textAlign: "center" }}>
          {/* لوجو الشركة */}
          <Box sx={{ mb: 4 }}>
            <img
              src={logo_1}
              alt="Alaa Eldin Group"
              style={{
                height: 150,
                border: "3px solid #e0393a",
                borderRadius: "15px",
                boxShadow: "0 4px 20px rgba(0,0,0,0.6)",
                margin: "auto"
              }}
            />
          </Box>

          <Typography variant="h5" sx={{ color: "#eee", mb: 3, fontWeight: 500, letterSpacing: 1.5 }}>
            {text.title}
          </Typography>

          <Divider sx={{ width: 120, mx: "auto", my: 2, borderColor: primaryColor, borderBottomWidth: 4 }} />

          {/* لوجو المعرض في النص تمامًا */}
          <Box sx={{ my: 3, display: "flex", justifyContent: "center" }}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <img
                src={logo_show}
                alt="WoodShow 2025"
                className="sm:w-[400px] w-auto"
                style={{
                  maxHeight: { xs: 100, sm: 130 },
                  
                  filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.7))",
                  borderRadius: "12px"
                }}
              />
            </motion.div>
          </Box>

          <Typography
            variant="h3"
            sx={{
              fontWeight: 800,
              background: `linear-gradient(90deg, ${primaryColor}, ${textGold}, ${primaryColor})`,
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              mb: 3,
              fontSize: { xs: "1.1rem", md: "2.2rem" },
              lineHeight: 1.4,
            }}
          >
            {text.event}
          </Typography>

          {/* تفاصيل الحدث */}
          <Box sx={{ maxWidth: 700, mx: "auto", mb: 6 }}>
            <Typography sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, color: "#ddd", fontSize: "1.15rem", mb: 2 }}>
              <FaCalendarAlt color={primaryColor} size={28} />
              <span style={{ color: textGold }}>{text.date}</span>
            </Typography>
            <Typography sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, color: "#ddd", fontSize: "1.15rem", mb: 2 }}>
              <FaMapMarkerAlt color={primaryColor} size={28} />
              {text.location}
            </Typography>
            <Typography sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 2, color: "#ddd", fontSize: "1.15rem" }}>
              <FaClock color={primaryColor} size={28} />
              {text.hours}
            </Typography>
          </Box>

          {/* الأزرار */}
          <Box sx={{ 
            display: "flex", 
            flexDirection: { xs: "column", sm: "row" }, 
            gap: { xs: 3, sm: 4 }, 
            justifyContent: "center", 
            alignItems: "center", 
            mt: 5 
          }}>
            {/* تأكيد الحضور */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                onClick={() => setOpenDialog(true)}
                variant="contained"
                size="large"
                sx={{
                  bgcolor: primaryColor,
                  color: "#fff",
                  px: { xs: 8, sm: 9 },
                  py: 3,
                  borderRadius: "50px",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  boxShadow: `0 10px 30px rgba(224, 57, 58, 0.5)`,
                  textTransform: "none",
                  "&:hover": {
                    bgcolor: "#c02026",
                    transform: "translateY(-4px)",
                    boxShadow: "0 15px 40px rgba(224, 57, 58, 0.6)",
                  },
                }}
              >
                {text.cta}
              </Button>
            </motion.div>

            {/* للتسجيل في المعرض - الأيقونة تتغير مكانها حسب اللغة */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                variant="outlined"
                size="large"
                href="https://register.strategic.ae/registration/access-package/97E2CBA5-2552-400D-BF86-48F83A9B8E60"
                target="_blank"
                rel="noopener noreferrer"
                {...(isArabic ? { endIcon: <FaExternalLinkAlt /> } : { startIcon: <FaExternalLinkAlt /> })}
                sx={{
                  borderColor: textGold,
                  color: textGold,
                  px: { xs: 5, sm: 6 },
                  py: 3,
                  borderRadius: "50px",
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  textTransform: "none",
                  minWidth: { xs: "280px", sm: "auto" },
                  display: "flex",
                  alignItems: "center",
                  gap: 1.5, // المسافة بين الأيقونة والنص ثابتة في كل اللغات
                  "&:hover": {
                    borderColor: "#fff",
                    color: "#fff",
                    bgcolor: "rgba(212, 175, 55, 0.15)",
                  },
                }}
              >
                {text.registerLink}
              </Button>
            </motion.div>
          </Box>
        </motion.div>
      </Container>

      {/* باقي الـ Dialogs بدون تغيير */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: "16px", overflow: "hidden" } }}>
        <DialogTitle sx={{ bgcolor: primaryColor, color: "#fff", textAlign: "center", fontWeight: 700, py: 3 }}>
          {text.formTitle}
          <IconButton onClick={() => setOpenDialog(false)} sx={{ position: "absolute", left: isArabic ? "auto" : 12, right: isArabic ? 12 : "auto", top: 12, color: "#fff" }}>
            <FaTimes />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ bgcolor: "#111", p: 4 }}>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField label={text.name} fullWidth required margin="normal" value={name} onChange={(e) => setName(e.target.value)}
              InputLabelProps={{ style: { color: '#aaa' } }} InputProps={{ style: { color: '#fff' } }}
              sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#444' }, '&:hover fieldset': { borderColor: primaryColor } } }} />

            <TextField label={text.phone} fullWidth required margin="normal" value={phone} onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
              InputLabelProps={{ style: { color: '#aaa' } }} InputProps={{ style: { color: '#fff' } }}
              sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#444' }, '&:hover fieldset': { borderColor: primaryColor } } }} />

            <TextField label={text.email} type="email" fullWidth required margin="normal" value={email} onChange={(e) => setEmail(e.target.value)}
              InputLabelProps={{ style: { color: '#aaa' } }} InputProps={{ style: { color: '#fff' } }}
              sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#444' }, '&:hover fieldset': { borderColor: primaryColor } } }} />

            <TextField
              label={text.notes}
              multiline
              rows={4}
              fullWidth
              margin="normal"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              InputLabelProps={{ style: { color: '#aaa' } }}
              InputProps={{ style: { color: '#fff' } }}
              sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#444' }, '&:hover fieldset': { borderColor: primaryColor } } }}
            />

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 4, py: 2.5, bgcolor: primaryColor, fontSize: "1.3rem", fontWeight: 700, borderRadius: "50px" }}>
              {text.submit}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      <Dialog open={openAlert} onClose={() => setOpenAlert(false)}>
        <DialogContent sx={{ bgcolor: "#111", textAlign: "center", p: 6, border: `3px solid ${alertSuccess ? primaryColor : '#d32f2f'}`, borderRadius: "16px" }}>
          <Typography variant="h5" sx={{ color: alertSuccess ? primaryColor : "#d32f2f", mb: 3, fontWeight: 700 }}>
            {alertSuccess ? "تم بنجاح" : "حدث خطأ"}
          </Typography>
          <Typography sx={{ color: "#ccc", mb: 4, fontSize: "1.2rem" }}>{alertMessage}</Typography>
          <Button onClick={() => setOpenAlert(false)} variant="outlined" sx={{ borderColor: primaryColor, color: primaryColor, px: 6, py: 1.5 }}>
            موافق
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default InvitationPage;