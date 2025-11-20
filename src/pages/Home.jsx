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
  const [governorate, setGovernorate] = useState("");
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
      email: "البريد الإلكتروني (اختياري)",
      governorate: "المحافظة",
      notes: "ملاحظات إضافية (اختياري)",
      submit: "تسجيل الحضور",
      success: "تم تسجيل حضورك بنجاح! نتطلع لرؤيتك في المعرض واستلام خصمك الخاص 10%",
      error: "برجاء إدخال الاسم ورقم الهاتف على الأقل",
      incentive: "احجز حضورك الآن واستفد بخصم 10% على جميع مشترياتك أثناء المعرض\nوالخصم ممتد لمدة 15 يوم بعد انتهاء المعرض!",
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
      email: "Email Address (Optional)",
      governorate: "Governorate",
      notes: "Additional Notes (Optional)",
      submit: "Register",
      success: "Registration successful! We look forward to seeing you and your 10% discount",
      error: "Please enter your name and phone number",
      incentive: "Confirm your attendance now and enjoy 10% discount on all purchases during the exhibition\nand the discount extends for 15 days after the event!",
    },
  };

  const text = isArabic ? t.AR : t.EN;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!name || !phone) {
      setAlertSuccess(false);
      setAlertMessage(text.error);
      setOpenAlert(true);
      return;
    }

    const data = {
      Name: name,
      Phone: phone,
      Email: email || "غير محدد",
      Governorate: governorate || "غير محدد",
      Notes: notes || "لا توجد ملاحظات",
      Event: "WoodShow 2025",
      Date: new Date().toLocaleString("en-GB"),
    };

    // إرسال البيانات إلى Google Sheets
    axios.post("https://sheetdb.io/api/v1/78qosbgjp9bbe", data).catch(console.error);

    // إرسال الإيميل عبر EmailJS
    emailjs
      .send(
        "service_17dbf7k",
        "template_4wvknlu",
        {
          from_name: name,
          message: `تسجيل حضور جديد - WoodShow 2025\n\nالاسم: ${name}\nالهاتف: ${phone}\nالمحافظة: ${governorate || "غير محدد"}\nالبريد: ${email || "غير محدد"}\nالملاحظات: ${notes || "لا توجد"}`,
        },
        "sInLUMT_X6Pf4NYkb"
      )
      .then(() => {
        setAlertSuccess(true);
        setAlertMessage(text.success);
        setOpenAlert(true);
        setOpenDialog(false);
        setName("");
        setPhone("");
        setEmail("");
        setGovernorate("");
        setNotes("");
      })
      .catch((err) => {
        console.error("EmailJS Error:", err);
        setAlertSuccess(false);
        setAlertMessage("حدث خطأ أثناء الإرسال، حاول مرة أخرى");
        setOpenAlert(true);
      });
  };

  return (
    <Box
      sx={{
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
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: "linear-gradient(135deg, rgba(20,20,30,0.95) 0%, rgba(10,10,20,0.90) 100%)",
          zIndex: 1,
        },
      }}
    >
      <style jsx global>{`
        ::-webkit-scrollbar { width: 12px; }
        ::-webkit-scrollbar-track { background: #e0393a; border-left: 2px solid #e0393a; }
        ::-webkit-scrollbar-thumb { background: #111; border-radius: 10px; border: 2px solid #e0393a; box-shadow: inset 0 0 8px rgba(0,0,0,0.9); }
        ::-webkit-scrollbar-thumb:hover { background: #222; }
        ::-webkit-scrollbar-thumb:active { background: #000; }
        * { scrollbar-color: #111 #e0393a; scrollbar-width: thin; }
        html, body { background: #0a0a0a !important; }
      `}</style>

      <Container maxWidth="md" sx={{ position: "relative", zIndex: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{ textAlign: "center" }}
        >
          {/* لوجو الشركة */}
          <Box sx={{ mb: 4 }}>
            <img
              src={logo_1}
              alt="Alaa Eldin Group"
              style={{
                height: 150,
                borderRadius: "15px",
                margin: "auto",
                boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
              }}
            />
          </Box>

          <Typography variant="h5" sx={{ color: "#eee", mb: 3, fontWeight: 500, letterSpacing: 1.5 }}>
            {text.title}
          </Typography>

          <Divider sx={{ width: 120, mx: "auto", my: 2, borderColor: primaryColor, borderBottomWidth: 4 }} />

          {/* لوجو المعرض */}
          <Box sx={{ my: 3, display: "flex", justifyContent: "center" }}>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <img
                src={logo_show}
                alt="WoodShow 2025"
                style={{
                  maxHeight: { xs: 100, sm: 140 },
                  filter: "drop-shadow(0 10px 30px rgba(0,0,0,0.7))",
                  borderRadius: "12px",
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
              fontSize: { xs: "1.8rem", md: "2.8rem" },
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
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              gap: { xs: 3, sm: 4 },
              justifyContent: "center",
              alignItems: "center",
              mt: 5,
            }}
          >
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

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
  <Button
    component="a"
    href="https://register.strategic.ae/registration/access-package/04201e6f-201a-4f03-bafb-1ce1907228b1?_gl=1*w0gbmx*_gcl_au*Nzk4MjcxMDg1LjE3NjM2MzgxNTg.*_ga*MjA1NDEyNDU0NC4xNzYzNjM4MTU4*_ga_9712H9C33Y*czE3NjM2MzgxNTgkbzEkZzAkdDE3NjM2MzgxNTgkajYwJGwwJGgxNjY5NjQ3NzQ4"
    target="_blank"
    rel="noopener noreferrer"
    variant="outlined"
    size="large"
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
      justifyContent: "center",
      gap: 2, // المسافة المثالية بين النص والأيقونة في الاتجاهين
      "&:hover": {
        borderColor: "#fff",
        color: "#fff",
        bgcolor: "rgba(212, 175, 55, 0.15)",
      },
    }}
  >
    {/* النص دايمًا في البداية */}
    {text.registerLink}

    {/* الأيقونة تظهر يمين في الإنجليزي، ويسار في العربي */}
    <FaExternalLinkAlt style={{ 
      marginLeft: language == "AR" ? -8 : 0,   // نزود مسافة شوية في العربي لو لسه ضيق
      marginRight: language == "AR" ? 0 : -8,
      fontSize: "1.4rem"
    }} />
  </Button>
</motion.div>
            </motion.div>
          </Box>

          {/* الرسالة التحفيزية بخصم 10% */}
          <Box sx={{ mt: 7, maxWidth: 800, mx: "auto", px: 3 }}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <Typography
                sx={{
                  background: "linear-gradient(90deg, #e0393a, #d4af37, #e0393a)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontSize: { xs: "1.5rem", md: "2rem" },
                  fontWeight: 900,
                  lineHeight: 1.7,
                  textAlign: "center",
                  textShadow: "0 0 30px rgba(224,57,58,0.5)",
                  p: 3,
                  border: "2px solid rgba(224,57,58,0.3)",
                  borderRadius: "20px",
                  bgcolor: "rgba(0,0,0,0.4)",
                }}
              >
                {text.incentive.split("\n").map((line, i) => (
                  <span key={i}>
                    {line}
                    <br />
                  </span>
                ))}
              </Typography>
            </motion.div>
          </Box>
        </motion.div>
      </Container>

      {/* نافذة تسجيل الحضور */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: "16px", overflow: "hidden" } }}
      >
        <DialogTitle sx={{ bgcolor: primaryColor, color: "#fff", textAlign: "center", fontWeight: 700, py: 3 }}>
          {text.formTitle}
          <IconButton
            onClick={() => setOpenDialog(false)}
            sx={{ position: "absolute", left: isArabic ? "auto" : 12, right: isArabic ? 12 : "auto", top: 12, color: "#fff" }}
          >
            <FaTimes />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ bgcolor: "#111", p: 4 }}>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
              label={text.name}
              fullWidth
              required
              margin="normal"
              value={name}
              onChange={(e) => setName(e.target.value)}
              InputLabelProps={{ style: { color: "#aaa" } }}
              InputProps={{ style: { color: "#fff" } }}
              sx={{ "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "#444" }, "&:hover fieldset": { borderColor: primaryColor } } }}
            />

            <TextField
              label={text.phone}
              fullWidth
              required
              margin="normal"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
              InputLabelProps={{ style: { color: "#aaa" } }}
              InputProps={{ style: { color: "#fff" } }}
              sx={{ "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "#444" }, "&:hover fieldset": { borderColor: primaryColor } } }}
            />

            <TextField
              label={text.governorate}
              fullWidth
              margin="normal"
              value={governorate}
              onChange={(e) => setGovernorate(e.target.value)}
              InputLabelProps={{ style: { color: "#aaa" } }}
              InputProps={{ style: { color: "#fff" } }}
              sx={{ "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "#444" }, "&:hover fieldset": { borderColor: primaryColor } } }}
            />

            <TextField
              label={text.email}
              type="email"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              InputLabelProps={{ style: { color: "#aaa" } }}
              InputProps={{ style: { color: "#fff" } }}
              sx={{ "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "#444" }, "&:hover fieldset": { borderColor: primaryColor } } }}
            />

            <TextField
              label={text.notes}
              multiline
              rows={4}
              fullWidth
              margin="normal"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              InputLabelProps={{ style: { color: "#aaa" } }}
              InputProps={{ style: { color: "#fff" } }}
              sx={{ "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "#444" }, "&:hover fieldset": { borderColor: primaryColor } } }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 4, py: 2.5, bgcolor: primaryColor, fontSize: "1.3rem", fontWeight: 700, borderRadius: "50px" }}
            >
              {text.submit}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* نافذة التنبيه */}
      <Dialog open={openAlert} onClose={() => setOpenAlert(false)}>
        <DialogContent
          sx={{
            bgcolor: "#111",
            textAlign: "center",
            p: 6,
            border: `4px solid ${alertSuccess ? primaryColor : "#d32f2f"}`,
            borderRadius: "16px",
          }}
        >
          <Typography variant="h5" sx={{ color: alertSuccess ? primaryColor : "#d32f2f", mb: 3, fontWeight: 700 }}>
            {alertSuccess ? "تم بنجاح" : "حدث خطأ"}
          </Typography>
          <Typography sx={{ color: "#ccc", mb: 4, fontSize: "1.2rem" }}>{alertMessage}</Typography>
          <Button
            onClick={() => setOpenAlert(false)}
            variant="outlined"
            sx={{ borderColor: primaryColor, color: primaryColor, px: 6, py: 1.5, borderRadius: "50px" }}
          >
            موافق
          </Button>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default InvitationPage;