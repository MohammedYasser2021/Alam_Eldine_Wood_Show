import React, { useState } from "react";
import emailjs from '@emailjs/browser';
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
} from "@mui/material";
import { FaPhoneAlt, FaTimes, FaEnvelope, FaStethoscope } from "react-icons/fa";
import { Stethoscope, Heart, Users } from "lucide-react";
import footer from "../assets/footer.svg";
import axios from "axios";

function BookingPage({language}) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSuccess, setAlertSuccess] = useState(true);

  const content = {
    AR: {
      title: "احجز موعدك الآن",
      subtitle: "نقدم خدمات طبية متخصصة بأحدث التقنيات العالمية",
      name: "الاسم الكامل",
      phone: "رقم الجوال",
      email: "البريد الإلكتروني",
      submit: "احجز الآن",
      hospitalName: "مستشفى أستر سند التخصصي",
      qualityText: "رعاية طبية متميزة بأعلى معايير الجودة"
    },
    EN: {
      title: "Book Your Appointment Now",
      subtitle: "We offer specialized medical services with the latest technologies",
      name: "Full Name",
      phone: "Phone Number",
      email: "Email Address",
      submit: "Book Now",
      hospitalName: "Aster Sanad Specialized Hospital",
      qualityText: "Excellence in Healthcare with International Quality Standards"
    }
  };

  const currentContent = content[language];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (name && phone && email) {
      const data = {
        Name: name,
        Phone: phone,
        Email: email,
        Date: new Date().toLocaleString('en-US')
      }


      const sheetResponse =  axios.post(
        "https://sheetdb.io/api/v1/noi1dx1gomu6o",
        data,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      const templateParams = {
        from_name: name,
        message: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nDate: ${new Date().toLocaleString()}`
      };

      emailjs.send(
        'service_17dbf7k',
        'template_4wvknlu',
        templateParams,
        'sInLUMT_X6Pf4NYkb'
      )
      .then(() => {
        setAlertSuccess(true);
        setAlertMessage(language === "AR" ? "تم إرسال بياناتك بنجاح!" : "Your information has been sent successfully!");
        setOpenAlert(true);
        setName("");
        setPhone("");
        setEmail("");
      })
      .catch((error) => {
        console.error("Error:", error);
        setAlertSuccess(false);
        setAlertMessage(language === "AR" ? "حدث خطأ في إرسال البيانات" : "Error submitting data");
        setOpenAlert(true);
      });
    } else {
      setAlertSuccess(false);
      setAlertMessage(language === "AR" ? "يرجى إدخال جميع البيانات." : "Please enter all information.");
      setOpenAlert(true);
    }
  };

  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0a0e1a 0%, #111923 100%)',
      direction: language === "AR" ? 'rtl' : 'ltr',
      color: '#ffffff'
    }}>
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
        {/* Header Section */}
        <Box sx={{
          display: 'flex',
          justifyContent: { xs: 'center', sm: 'space-between' },
          alignItems: 'center',
          mb: 6,
          flexWrap: 'wrap',
          gap: 2
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2}}>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              p: 2,
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(100, 181, 246, 0.1) 0%, rgba(66, 165, 245, 0.1) 100%)',
              border: '1px solid rgba(100, 181, 246, 0.2)'
            }}>
              <Stethoscope size={32} color="#64b5f6" />
              <Typography variant="h6" sx={{ 
                color: '#64b5f6', 
                fontWeight: 600,
                fontSize: { xs: '1rem', sm: '1.2rem' }
              }}>
                {currentContent.hospitalName}
              </Typography>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2}}>
            <Box sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 1,
              p: 2,
              borderRadius: '12px',
              background: 'linear-gradient(135deg, rgba(100, 181, 246, 0.05) 0%, rgba(66, 165, 245, 0.05) 100%)',
              border: '1px solid rgba(100, 181, 246, 0.1)'
            }}>
              <Heart size={24} color="#42a5f5" />
              <Users size={24} color="#42a5f5" />
            </Box>
          </Box>
        </Box>

        {/* Main Content */}
        <Box sx={{
          display: "flex",
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: "center",
          gap: { xs: 4, md: 6 },
          mb: { xs: 8, md: 0 }
        }}>
          {/* Form Section */}
          <Box sx={{
            flex: 1,
            width: '100%',
            maxWidth: '600px',
            mx: 'auto',
            p: 4,
            borderRadius: '20px',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
            background: 'linear-gradient(135deg, #111923 0%, #1a1f2e 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(100, 181, 246, 0.2)'
          }}>
            <Typography variant="h1" 
              sx={{
                fontWeight: 700,
                mb: 3,
                background: 'linear-gradient(45deg, #64b5f6 30%, #42a5f5 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' },
                textAlign: 'center',
                lineHeight: 1.2
              }}>
              {currentContent.title}
            </Typography>
            <Typography variant="h5" 
              sx={{ 
                color: '#b3e5fc', 
                mb: 4,
                textAlign: 'center',
                fontSize: { xs: '1rem', sm: '1.1rem' },
                lineHeight: 1.5
              }}>
              {currentContent.subtitle}
            </Typography>

            <Box component="form" onSubmit={handleFormSubmit}>
              <TextField
                label={currentContent.name}
                variant="outlined"
                fullWidth
                sx={{ 
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    color: '#ffffff',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    '& fieldset': { borderColor: 'rgba(100, 181, 246, 0.3)' },
                    '&:hover fieldset': { borderColor: 'rgba(100, 181, 246, 0.5)' },
                    '&.Mui-focused fieldset': { borderColor: '#64b5f6' },
                  },
                  '& .MuiInputLabel-root': { color: '#b3e5fc' },
                }}
                value={name}
                onChange={(e) => setName(e.target.value)}
                dir={language === "AR" ? "rtl" : "ltr"}
              />
<TextField
  label={currentContent.phone}
  variant="outlined"
  fullWidth
  type="tel"
  inputMode="numeric"
  pattern="[0-9]*"
  sx={{ 
    mb: 3,
    '& .MuiOutlinedInput-root': {
      color: '#ffffff',
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      '& fieldset': { borderColor: 'rgba(100, 181, 246, 0.3)' },
      '&:hover fieldset': { borderColor: 'rgba(100, 181, 246, 0.5)' },
      '&.Mui-focused fieldset': { borderColor: '#64b5f6' },
    },
    '& .MuiInputLabel-root': { color: '#b3e5fc' },
  }}
  value={phone}
  onChange={(e) => {
    const value = e.target.value.replace(/[^0-9]/g, '');
    setPhone(value);
  }}
  dir={language === "AR" ? "rtl" : "ltr"}
/>

              <TextField
                label={currentContent.email}
                variant="outlined"
                fullWidth
                type="email"
                sx={{ 
                  mb: 3,
                  '& .MuiOutlinedInput-root': {
                    color: '#ffffff',
                    backgroundColor: 'rgba(255, 255, 255, 0.05)',
                    '& fieldset': { borderColor: 'rgba(100, 181, 246, 0.3)' },
                    '&:hover fieldset': { borderColor: 'rgba(100, 181, 246, 0.5)' },
                    '&.Mui-focused fieldset': { borderColor: '#64b5f6' },
                  },
                  '& .MuiInputLabel-root': { color: '#b3e5fc' },
                }}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                dir={language === "AR" ? "rtl" : "ltr"}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  py: 2,
                  borderRadius: '12px',
                  background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                  fontSize: { xs: '1rem', md: '1.1rem' },
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 25px rgba(25, 118, 210, 0.3)',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 12px 35px rgba(25, 118, 210, 0.4)',
                  }
                }}
              >
                <FaEnvelope style={{ 
                  marginRight: language === "AR" ? '0' : '8px', 
                  marginLeft: language === "AR" ? '8px' : '0',
                  fontSize: '0.9rem'
                }} />
                {currentContent.submit}
              </Button>
            </Box>
          </Box>

          {/* Image Section */}
          <Box sx={{
            flex: 1,
            position: 'relative',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: -20,
              right: -20,
              width: '100%',
              height: '100%',
              borderRadius: '20px',
              background: 'linear-gradient(45deg, rgba(100, 181, 246, 0.1) 0%, rgba(66, 165, 245, 0.1) 100%)',
              zIndex: 0
            }
          }}>
            <Box sx={{
              width: '100%',
              height: { xs: '300px', sm: '350px', md: '400px' },
              borderRadius: '20px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)',
              position: 'relative',
              zIndex: 1,
              background: 'linear-gradient(135deg, rgba(100, 181, 246, 0.2) 0%, rgba(66, 165, 245, 0.2) 100%)',
              backgroundImage: `url('https://images.pexels.com/photos/356040/pexels-photo-356040.jpeg?auto=compress&cs=tinysrgb&w=800')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              border: '1px solid rgba(100, 181, 246, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              '&::after': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.2) 100%)',
                borderRadius: '20px'
              }
            }}>
              <Box sx={{
                position: 'relative',
                zIndex: 2,
                textAlign: 'center',
                p: 3
              }}>
                <FaStethoscope size={60} style={{ color: '#64b5f6', marginBottom: '16px' }} />
                <Typography variant="h6" sx={{
                  color: '#ffffff',
                  fontWeight: 600,
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                  fontSize: { xs: '1rem', sm: '1.1rem' }
                }}>
                  {currentContent.qualityText}
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Alert Dialog */}
      <Dialog
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        PaperProps={{
          sx: {
            borderRadius: '15px',
            background: 'linear-gradient(135deg, #111923 0%, #1a1f2e 100%)',
            border: `2px solid ${alertSuccess ? '#4CAF50' : '#f44336'}`,
            minWidth: '300px',
            maxWidth: '90%',
            boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
          }
        }}
      >
        <DialogTitle sx={{ 
          color: alertSuccess ? '#4CAF50' : '#f44336', 
          textAlign: 'center',
          pt: 3,
          pb: 2,
          fontSize: '1.3rem',
          fontWeight: 600
        }}>
          {alertSuccess ? 
            (language === "AR" ? "تم بنجاح!" : "Success!") : 
            (language === "AR" ? "تنبيه!" : "Alert!")}
          <IconButton
            onClick={() => setOpenAlert(false)}
            sx={{
              position: 'absolute',
              right: language === "AR" ? 'auto' : 8,
              left: language === "AR" ? 8 : 'auto',
              top: 8,
              color: alertSuccess ? '#4CAF50' : '#f44336'
            }}
          >
            <FaTimes />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ 
          color: '#e3f2fd',
          textAlign: 'center',
          pb: 3
        }}>
          <Typography sx={{ fontSize: '1rem', lineHeight: 1.5 }}>
            {alertMessage}
          </Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default BookingPage;