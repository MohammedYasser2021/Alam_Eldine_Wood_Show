import React, { useState } from 'react';
import { Box, Typography, Button, TextField, Container, Grid, Link, Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { FaPhoneAlt, FaEnvelope, FaGlobe, FaMapMarkerAlt, FaTimes } from "react-icons/fa";
import logo from "../assets/nagran.png";
import testimonialImage from "../assets/image1.png";
import heroImage from "../assets/hospital.jpg";
import emailjs from '@emailjs/browser';
import axios from "axios";

function Contact({ language }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSuccess, setAlertSuccess] = useState(true);
    const [openDialog, setOpenDialog] = useState(false);

  const content = {
    AR: {
      title: "تواصل معنا",
      subtitle: "نحن هنا لمساعدتك",
      description: "مستشفى تخصصي نجران هو مركز طبي رائد يقدم خدمات صحية متكاملة بأحدث التقنيات العالمية وفريق طبي متميز. نسعى دائماً لتقديم أفضل رعاية طبية لمرضانا في بيئة مريحة وآمنة.",
      name: "الاسم",
      phone: "رقم الجوال",
      message: "رسالتك",
      submit: "إرسال",
      contactInfo: "معلومات التواصل",
      address: "نجران، المملكة العربية السعودية",
      websiteLabel: "الموقع الإلكتروني"
    },
    EN: {
      title: "Contact Us",
      subtitle: "We're Here to Help",
      description: "Najran Specialist Hospital is a leading medical center providing comprehensive healthcare services with the latest global technologies and distinguished medical team. We always strive to provide the best medical care for our patients in a comfortable and safe environment.",
      name: "Name",
      phone: "Phone Number",
      message: "Message",
      submit: "Send",
      contactInfo: "Contact Information",
      address: "Najran, Saudi Arabia",
      websiteLabel: "Website"
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name && phone && message) {
      const data = {
        Name: name,
        Phone: phone,
        Date: new Date().toLocaleString('en-US')
      }

      const sheetResponse =  axios.post(
        "https://sheetdb.io/api/v1/r8fxi8hlllcta",
        data,
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      const templateParams = {
        from_name: name,
        message: `
          Name: ${name}
          Phone: ${phone}
          Message: ${message}
          Request Date: ${new Date().toLocaleString('en-US')}
        `
      };
  
      emailjs.send(
        'service_ohi49va',
        'template_unnyzap',
        templateParams,
        'OW5cLPqmyZR4ZC-Cb'
      )
      .then(() => {
        setAlertSuccess(true);
        setAlertMessage(language === "AR" ? "تم إرسال بياناتك بنجاح!" : "Your information has been sent successfully!");
        setOpenAlert(true);
        setOpenDialog(false);
        setName("");
        setPhone("");
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
      py: 4,
      px: { xs: 0, sm: 4 },
      direction: language === "AR" ? 'rtl' : 'ltr',
      overflowX: 'hidden'
     
    }}>
      <Box sx={{
        display: 'flex',
        justifyContent: { xs: 'center', sm: 'space-between' },
        alignItems: 'center',
        mb: 6,
        flexWrap: 'wrap',
        gap: 2,
        '@media (max-width: 530px)': {
          justifyContent: 'center'
        }
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2}}>
          <img src={logo} alt="Logo" style={{ maxWidth: "200px", height: "auto" }} />
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2}}>
          <img src={testimonialImage} alt="testimonialImage" style={{ maxWidth: "200px", height: "auto" }} />
        </Box>
      </Box>

      <Container maxWidth="lg" sx={{ px: { xs: 0, sm: 2 } }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography variant="h2" sx={{
            color: '#1a237e',
            fontWeight: 700,
            mb: 3,
            fontSize: { xs: '2rem', md: '2rem' }
          }}>
            {content[language].title}
          </Typography>
          <Typography variant="h6" sx={{ color: '#666', mb: 3 }}>
            {content[language].subtitle}
          </Typography>
          <Typography sx={{ color: '#666', mb: 6, maxWidth: '800px', mx: 'auto' }}>
            {content[language].description}
          </Typography>
          <Box sx={{
            maxWidth: '800px',
            mx: 'auto',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 20px 40px rgba(0,0,0,0.1)'
          }}>
            <img src={heroImage} alt="Hospital" style={{ width: '100%', height: 'auto', maxWidth: '100%' }} />
          </Box>
        </Box>

        <Grid container spacing={{ 
  xs: 2, // Reduce spacing on mobile
  sm: 4,
  md: 6 
}}>
          <Grid item xs={12} md={6}>
            <Box component="form" onSubmit={handleSubmit}>
              <TextField
                fullWidth
                label={content[language].name}
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ mb: 3 }}
              />
              <TextField
                fullWidth
                label={content[language].phone}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                sx={{ mb: 3 }}
              />
              <TextField
                fullWidth
                label={content[language].message}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                multiline
                rows={4}
                sx={{ mb: 3 }}
              />
              <Button
                type="submit"
                variant="contained"
                fullWidth
                sx={{
                  py: 2,
                  background: 'linear-gradient(45deg, #1a237e, #0277bd)',
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'scale(1.02)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
                    transition: 'all 0.3s ease-in-out'
                  }
                }}
              >
                {content[language].submit}
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <Box sx={{
              p: 4,
              borderRadius: '20px',
              background: 'linear-gradient(45deg, #1a237e08, #0277bd08)',
              height: '100%'
            }}>
              <Typography variant="h5" sx={{ mb: 4, color: '#1a237e', fontWeight: 700 }}>
                {content[language].contactInfo}
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <FaEnvelope />
                  <Box>
                    <Link href="mailto:muhammadaljamal@gmail.com" sx={{ display: 'block', color: '#666', textDecoration: 'none' }}>
                      muhammadaljamal@gmail.com
                    </Link>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <FaEnvelope />
                  <Box>
                    <Link href="mailto:moh.aljamal@najransh.sa" sx={{ display: 'block', color: '#666', textDecoration: 'none' }}>
                      moh.aljamal@najransh.sa
                    </Link>
                  </Box>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <FaGlobe />
                  <Link href="http://www.najransh.sa" target="_blank" sx={{ color: '#666', textDecoration: 'none' }}>
                    www.najransh.sa
                  </Link>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <FaMapMarkerAlt />
                  <Typography sx={{ color: '#666' }}>
                    {content[language].address}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Custom Alert Dialog */}
      <Dialog
  open={openAlert}
  onClose={() => setOpenAlert(false)}
  PaperProps={{
    sx: {
      borderRadius: '20px',
      background: 'white',
      minWidth: '300px',
      maxWidth: '90%',
      boxShadow: '0 8px 32px rgba(0,0,0,0.08)',
      border: `2px solid ${alertSuccess ? '#4CAF50' : '#f44336'}`
    }
  }}
>
  <DialogTitle sx={{ 
    color: alertSuccess ? '#4CAF50' : '#f44336', 
    textAlign: 'center',
    pt: 3,
    pb: 2,
    fontSize: '1.5rem',
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
    color: '#666',
    textAlign: 'center',
    pb: 3
  }}>
    <Typography sx={{ fontSize: '1.1rem' }}>
      {alertMessage}
    </Typography>
  </DialogContent>
</Dialog>

    </Box>
  );
}

export default Contact;
