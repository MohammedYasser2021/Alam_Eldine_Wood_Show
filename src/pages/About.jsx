import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import emailjs from '@emailjs/browser';
import {
  Box,
  Button,
  TextField,
  Typography,
  Grid,
  Container,
  Card,
  CardContent,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import { 
  FaPhoneAlt, 
  FaTimes, 
  FaHeart, 
  FaUserMd, 
  FaStethoscope,
  FaBaby,
  FaUser,
  FaCut,
  FaWheelchair,
  FaAppleAlt,
  FaRunning,
  FaPills,
  FaHeartbeat,
  FaEye,
  FaBrain,
  FaTooth,
  FaMicroscope,
  FaChevronLeft,
  FaChevronRight,
  FaEnvelope,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaYoutube,
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope as FaEmail,
  FaExpand
} from "react-icons/fa";
import { MdLocalHospital } from "react-icons/md";
import axios from "axios";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import images


function HomePage({ language }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [qrCodeOpen, setQrCodeOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState(""); // Added email state
  const [openAlert, setOpenAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [alertSuccess, setAlertSuccess] = useState(true);
  const [swiperKey, setSwiperKey] = useState(0);
  const swiperRef = useRef(null);

  // Re-initialize Swiper when language changes
  useEffect(() => {
    setSwiperKey(prev => prev + 1);
    // Small delay to ensure proper re-initialization
    const timer = setTimeout(() => {
      if (swiperRef.current && swiperRef.current.swiper) {
        swiperRef.current.swiper.update();
      }
    }, 100);
    return () => clearTimeout(timer);
  }, [language]);

  const content = {
    AR: {
      heroTitle: "مستشفى أستر سند التخصصي",
      heroSubtitle: "رعاية طبية متميزة بأعلى معايير الجودة العالمية",
      bookNow: "احجز موعدك الآن",
      promiseTitle: "وعدنا لك",
      promiseText: "هذا هو وعدنا بكل بساطة، مما يجعل الحياة سهلة لمرضانا وعائلاتهم، حتى عندما تكون الأمراض والعلاجات معقدة. يعمل جميع المتخصصين وموظفي الدعم لدينا بطريقة منسقة ورحيمة، ويقومون بتقديم أفضل وأحدث رعاية لجميع الحالات الطبية.",
      specialtiesTitle: "تخصصاتنا الطبية",
      facilitiesTitle: "منشآتنا المتميزة",
      leadershipTitle: "رؤيتنا وقيادتنا",
      leadershipText: "نحن نؤمن إيماناً راسخاً بأن التركيز على النتائج السريرية المتميزة ورعاية البيئة المناسبة للشفاء هي العوامل الرئيسية المطلوبة للشفاء المتمركز حول المريض. سيكون هذان العاملان هما المحركان للنمو المتسارع.",
      doctorName: "دكتور آزاد موبين - بكالوريوس طب وجراحة، زميل الكلية الملكية للأطباء",
      doctorTitle: "رئيس مجلس الإدارة المؤسس والعضو المنتدب",
      hospitalName: "أستر للرعاية الصحية",
      contactForm: "احجز استشارتك المجانية",
      name: "الاسم الكامل",
      phone: "رقم الجوال",
      email: "البريد الإلكتروني", // Added email label in Arabic
      submit: "احجز الآن",
      copyright: "جميع الحقوق محفوظة - مجموعة أستر سند",
      // Footer content
      medicalSpecialties: "التخصصات الطبية",
      patientServices: "خدمات المرضى",
      facilities: "التسهيلات",
      appPromotion: "حمل تطبيق أستر",
      appDescription: "احجز مواعيدك واستشاراتك الطبية بسهولة من خلال تطبيق أستر المتطور",
      downloadApp: "حمل التطبيق الآن",
      contactInfo: "معلومات الاتصال",
      address: "الرياض، المملكة العربية السعودية",
      phoneNumber: "920004417",
      emailAddress: "info@asterhospital.com",
      followUs: "تابعنا على",
      specialties: [
        { name: "أمراض النساء والتوليد", icon: <FaBaby />, color: "#FF6B9D" },
        { name: "الجلدية", icon: <FaUser />, color: "#4ECDC4" },
        { name: "الجراحة العامة", icon: <FaCut />, color: "#45B7D1" },
        { name: "العظام", icon: <FaWheelchair />, color: "#96CEB4" },
        { name: "الحمية والتغذية", icon: <FaAppleAlt />, color: "#FFEAA7" },
        { name: "العلاج الطبيعي", icon: <FaRunning />, color: "#DDA0DD" },
        { name: "الجهاز الهضمي", icon: <FaPills />, color: "#98D8C8" },
        { name: "أمراض القلب", icon: <FaHeartbeat />, color: "#F7DC6F" },
        { name: "جراحة المناظير", icon: <FaEye />, color: "#BB8FCE" },
        { name: "جراحة الأعصاب", icon: <FaBrain />, color: "#85C1E9" },
        { name: "طب الأسنان", icon: <FaTooth />, color: "#F8C471" },
        { name: "علم الأمراض", icon: <FaMicroscope />, color: "#82E0AA" }
      ],
      patientServicesList: [
        "حجز المواعيد",
        "الاستشارات الطبية",
        "الفحوصات المخبرية",
        "الأشعة التشخيصية",
        "العمليات الجراحية",
        "الرعاية المنزلية"
      ],
      facilitiesList: [
        "غرف العمليات المتطورة",
        "وحدة العناية المركزة",
        "قسم الطوارئ",
        "المختبرات الطبية",
        "قسم الأشعة",
        "الصيدلية"
      ]
    },
    EN: {
      heroTitle: "Aster Sanad Specialized Hospital",
      heroSubtitle: "Excellence in Healthcare with the Highest International Quality Standards",
      bookNow: "Book Your Appointment",
      promiseTitle: "Our Promise to You",
      promiseText: "This is our promise in all simplicity, making life easy for our patients and their families, even when diseases and treatments are complex. All our specialists and support staff work in a coordinated and compassionate manner, providing the best and latest care for all medical conditions.",
      specialtiesTitle: "Our Medical Specialties",
      facilitiesTitle: "Our Distinguished Facilities",
      leadershipTitle: "Our Vision and Leadership",
      leadershipText: "We firmly believe that focusing on outstanding clinical outcomes and caring for the appropriate healing environment are the key factors required for patient-centered healing. These two factors will be the drivers for accelerated growth.",
      doctorName: "Dr. Azad Mobin - MBBS, FRCP",
      doctorTitle: "Founder Chairman & Managing Director",
      hospitalName: "Aster Healthcare",
      contactForm: "Book Your Free Consultation",
      name: "Full Name",
      phone: "Phone Number",
      email: "Email Address", // Added email label in English
      submit: "Book Now",
      copyright: "All Rights Reserved - Aster Sanad Group",
      // Footer content
      medicalSpecialties: "Medical Specialties",
      patientServices: "Patient Services",
      facilities: "Facilities",
      appPromotion: "Download Aster App",
      appDescription: "Book your appointments and medical consultations easily through the advanced Aster app",
      downloadApp: "Download App Now",
      contactInfo: "Contact Information",
      address: "Riyadh, Saudi Arabia",
      phoneNumber: "920004417",
      emailAddress: "info@asterhospital.com",
      followUs: "Follow Us",
      specialties: [
        { name: "Obstetrics & Gynecology", icon: <FaBaby />, color: "#FF6B9D" },
        { name: "Dermatology", icon: <FaUser />, color: "#4ECDC4" },
        { name: "General Surgery", icon: <FaCut />, color: "#45B7D1" },
        { name: "Orthopedics", icon: <FaWheelchair />, color: "#96CEB4" },
        { name: "Diet & Nutrition", icon: <FaAppleAlt />, color: "#FFEAA7" },
        { name: "Physical Therapy", icon: <FaRunning />, color: "#DDA0DD" },
        { name: "Gastroenterology", icon: <FaPills />, color: "#98D8C8" },
        { name: "Cardiology", icon: <FaHeartbeat />, color: "#F7DC6F" },
        { name: "Laparoscopic Surgery", icon: <FaEye />, color: "#BB8FCE" },
        { name: "Neurosurgery", icon: <FaBrain />, color: "#85C1E9" },
        { name: "Dentistry", icon: <FaTooth />, color: "#F8C471" },
        { name: "Pathology", icon: <FaMicroscope />, color: "#82E0AA" }
      ],
      patientServicesList: [
        "Appointment Booking",
        "Medical Consultations",
        "Laboratory Tests",
        "Diagnostic Imaging",
        "Surgical Procedures",
        "Home Care Services"
      ],
      facilitiesList: [
        "Advanced Operating Rooms",
        "Intensive Care Unit",
        "Emergency Department",
        "Medical Laboratories",
        "Radiology Department",
        "Pharmacy"
      ]
    }
  };

  const currentContent = content[language];
  const facilities = [p1, p2, p3, p4, p5];

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (name && phone && email) { // Added email validation
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
        message: `Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nDate: ${new Date().toLocaleString()}` // Added email to message
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
        setOpenDialog(false);
        setName("");
        setPhone("");
        setEmail(""); // Reset email field
      })
      .catch((error) => {
        console.error("Error:", error);
        setAlertSuccess(false);
        setAlertMessage(language === "AR" ? "حدث خطأ في إرسال البيانات" : "Error submitting data");
        setOpenAlert(true);
      });
    }
  };

  // أضف هذه الدالة بعد دالة handleFormSubmit
const handlePhoneChange = (e) => {
  // إزالة أي حروف أو رموز والاحتفاظ بالأرقام فقط
  const numericValue = e.target.value.replace(/[^0-9]/g, '');
  setPhone(numericValue);
};


  return (
    <Box sx={{ 
      minHeight: '100vh',
      background: '#0a0e1a',
      direction: language === "AR" ? 'rtl' : 'ltr',
      // أضف هذا:
      overflowY: 'hidden',
      color: '#ffffff',
      width: '100%',
      overflowX: 'hidden'
    }}>
      {/* Hero Section with Aster Home Image */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <Box sx={{
          minHeight: { xs: '100vh', sm: '100vh', md: '100vh' },
          backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.5)), url(${asterhome})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          backgroundAttachment: { xs: 'scroll', md: 'fixed' },
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          width: '100%',
          px: { xs: 2, sm: 3, md: 0 }
        }}>
          <Container maxWidth="lg" sx={{ width: '100%' }}>
            <motion.div variants={fadeInUp}>
              <Typography
                variant="h1"
                sx={{
                  fontSize: { 
                    xs: '1.5rem', 
                    sm: '2rem', 
                    md: '2.5rem', 
                    lg: '3rem',
                    xl: '3.2rem'
                  },
                  fontWeight: 700,
                  background: 'linear-gradient(45deg, #64b5f6 30%, #42a5f5 90%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  color: 'transparent',
                  mb: { xs: 2, sm: 2, md: 3 },
                  textAlign: 'center',
                  lineHeight: { xs: 1.2, sm: 1.3, md: 1.4 },
                  px: { xs: 1, sm: 2 }
                }}
              >
                {currentContent.heroTitle}
              </Typography>
            </motion.div>
            
            <motion.div variants={fadeInUp}>
              <Typography
                variant="h4"
                sx={{
                  fontSize: { 
                    xs: '0.9rem', 
                    sm: '1.1rem', 
                    md: '1.3rem', 
                    lg: '1.4rem' 
                  },
                  fontWeight: 500,
                  color: '#ffffff',
                  mb: { xs: 3, sm: 4, md: 4 },
                  textAlign: 'center',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
                  lineHeight: { xs: 1.4, sm: 1.5, md: 1.6 },
                  px: { xs: 1, sm: 2, md: 0 }
                }}
              >
                {currentContent.heroSubtitle}
              </Typography>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              style={{ display: 'flex', justifyContent: 'center' }}
            >
              <Button
                variant="contained"
                size="medium"
                onClick={() => setOpenDialog(true)}
                sx={{
                  borderRadius: '25px',
                  px: { xs: 3, sm: 4, md: 4 },
                  py: { xs: 1.5, sm: 2, md: 2 },
                  background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                  fontSize: { xs: '0.8rem', sm: '0.9rem', md: '0.9rem' },
                  fontWeight: 500,
                  boxShadow: '0 8px 25px rgba(25, 118, 210, 0.3)',
                  transition: 'all 0.3s ease',
                  minWidth: { xs: '140px', sm: '160px' },
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 35px rgba(25, 118, 210, 0.4)',
                  }
                }}
              >
                <FaStethoscope style={{ 
                  marginRight: language === "AR" ? '0' : '8px',
                  marginLeft: language === "AR" ? '8px' : '0', 
                  fontSize: '0.9rem' 
                }} />
                {currentContent.bookNow}
              </Button>
            </motion.div>
          </Container>
        </Box>
      </motion.div>

      {/* Promise Section */}
      <Container maxWidth="lg" sx={{ 
        py: { xs: 4, sm: 5, md: 6 },
        px: { xs: 2, sm: 3, md: 3 }
      }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <Grid container spacing={{ xs: 3, sm: 4, md: 4 }} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div variants={fadeInUp}>
                <Typography
                  variant="h2"
                  sx={{
                    fontSize: { 
                      xs: '1.3rem', 
                      sm: '1.6rem', 
                      md: '2rem', 
                      lg: '2.2rem' 
                    },
                    fontWeight: 600,
                    mb: { xs: 2, sm: 3, md: 3 },
                    background: 'linear-gradient(45deg, #64b5f6 30%, #42a5f5 90%)',
                    backgroundClip: 'text',
                    WebkitBackgroundClip: 'text',
                    color: 'transparent',
                    textAlign: language === "AR" ? 'right' : 'left',
                    lineHeight: { xs: 1.2, sm: 1.3 }
                  }}
                >
                  {currentContent.promiseTitle}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1rem' },
                    color: '#b3e5fc',
                    lineHeight: { xs: 1.5, sm: 1.6, md: 1.6 },
                    fontWeight: 400,
                    textAlign: language === "AR" ? 'right' : 'left',
                    px: { xs: 1, sm: 0 }
                  }}
                >
                  {currentContent.promiseText}
                </Typography>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <motion.div variants={fadeInUp}>
                <Box sx={{
                  width: '100%',
                  height: { xs: '250px', sm: '280px', md: '300px' },
                  borderRadius: '15px',
                  overflow: 'hidden',
                  boxShadow: '0 10px 30px rgba(100, 181, 246, 0.2)',
                  background: `linear-gradient(rgba(100, 181, 246, 0.1), rgba(100, 181, 246, 0.1)), url(${promise})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  mx: { xs: 1, sm: 0 }
                }} />
              </motion.div>
            </Grid>
          </Grid>
        </motion.div>
      </Container>

      {/* Specialties Section - Fixed with key prop */}
      <Box sx={{ 
        background: '#111923', 
        py: { xs: 4, sm: 5, md: 6 },
        width: '100%'
      }}>
        <Container maxWidth="lg" sx={{ 
          px: { xs: 2, sm: 3, md: 3 }
        }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Typography
              variant="h2"
              align="center"
              sx={{
                fontSize: { 
                  xs: '1.3rem', 
                  sm: '1.6rem', 
                  md: '2rem', 
                  lg: '2.2rem' 
                },
                fontWeight: 600,
                mb: { xs: 3, sm: 4, md: 5 },
                background: 'linear-gradient(45deg, #64b5f6 30%, #42a5f5 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                color: 'transparent',
                lineHeight: { xs: 1.2, sm: 1.3 }
              }}
            >
              {currentContent.specialtiesTitle}
            </Typography>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
          >
            <Box sx={{ position: 'relative', width: '100%' }}>
              <Swiper
                key={swiperKey}
                ref={swiperRef}
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={20}
                slidesPerView={1}
                autoplay={{ 
                  delay: 3000, 
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true
                }}
                loop={true}
                pagination={{ 
                  clickable: true,
                  dynamicBullets: true
                }}
                navigation={{
                  prevEl: '.custom-prev',
                  nextEl: '.custom-next',
                }}
                breakpoints={{
                  320: { 
                    slidesPerView: 1,
                    spaceBetween: 15
                  },
                  480: { 
                    slidesPerView: 2,
                    spaceBetween: 15
                  },
                  768: { 
                    slidesPerView: 3,
                    spaceBetween: 20
                  },
                  1024: { 
                    slidesPerView: 4,
                    spaceBetween: 20
                  }
                }}
                style={{ 
                  paddingBottom: '50px',
                  direction: language === "AR" ? 'rtl' : 'ltr'
                }}
              >
                {currentContent.specialties.map((specialty, index) => (
                  <SwiperSlide key={`${language}-${index}`}>
                    <Card sx={{
                      height: { xs: '180px', sm: '190px', md: '200px' },
                      background: `linear-gradient(135deg, ${specialty.color}15 0%, ${specialty.color}25 100%)`,
                      backdropFilter: 'blur(10px)',
                      border: `1px solid ${specialty.color}40`,
                      borderRadius: '15px',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: `0 15px 35px ${specialty.color}40`,
                        border: `1px solid ${specialty.color}70`,
                      }
                    }}>
                      <CardContent sx={{ 
                        p: { xs: 2, sm: 2.5, md: 3 }, 
                        textAlign: 'center',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '100%'
                      }}>
                        <Box sx={{
                          width: { xs: 50, sm: 55, md: 60 },
                          height: { xs: 50, sm: 55, md: 60 },
                          borderRadius: '50%',
                          background: `linear-gradient(45deg, ${specialty.color} 30%, ${specialty.color}90 90%)`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mb: { xs: 2, sm: 2.5, md: 3 },
                          fontSize: { xs: '1.4rem', sm: '1.5rem', md: '1.6rem' },
                          color: '#ffffff',
                          boxShadow: `0 8px 20px ${specialty.color}40`
                        }}>
                          {specialty.icon}
                        </Box>
                        <Typography 
                          variant="body1" 
                          sx={{ 
                            color: '#ffffff', 
                            fontWeight: 600,
                            fontSize: { xs: '0.85rem', sm: '0.9rem', md: '0.95rem' },
                            textAlign: 'center',
                            lineHeight: { xs: 1.3, sm: 1.4 }
                          }}
                        >
                          {specialty.name}
                        </Typography>
                      </CardContent>
                    </Card>
                  </SwiperSlide>
                ))}
              </Swiper>

              {/* Custom Navigation Buttons */}
              <Box
                className="custom-prev"
                sx={{
                  position: 'absolute',
                  top: '43%',
                  left: { xs: '-10px', sm: '-15px', md: '-20px' },
                  transform: 'translateY(-50%)',
                  width: { xs: '35px', sm: '40px', md: '45px' },
                  height: { xs: '35px', sm: '40px', md: '45px' },
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, #64b5f6 30%, #42a5f5 90%)',
                  display: { xs: 'none', md: 'flex' },
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10,
                  boxShadow: '0 4px 15px rgba(100, 181, 246, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-50%) scale(1.1)',
                    boxShadow: '0 6px 20px rgba(100, 181, 246, 0.5)',
                  }
                }}
              >
                <FaChevronLeft 
                  style={{ 
                    color: '#ffffff', 
                    fontSize: '14px' 
                  }} 
                />
              </Box>

              <Box
                className="custom-next"
                sx={{
                  position: 'absolute',
                  top: '43%',
                  right: { xs: '-10px', sm: '-15px', md: '-20px' },
                  transform: 'translateY(-50%)',
                  width: { xs: '35px', sm: '40px', md: '45px' },
                  height: { xs: '35px', sm: '40px', md: '45px' },
                  borderRadius: '50%',
                  background: 'linear-gradient(45deg, #64b5f6 30%, #42a5f5 90%)',
                  display: { xs: 'none', md: 'flex' },
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  zIndex: 10,
                  boxShadow: '0 4px 15px rgba(100, 181, 246, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-50%) scale(1.1)',
                    boxShadow: '0 6px 20px rgba(100, 181, 246, 0.5)',
                  }
                }}
              >
                <FaChevronRight 
                  style={{ 
                    color: '#ffffff', 
                    fontSize: '14px' 
                  }} 
                />
              </Box>

              {/* Custom Styles for Swiper */}
              <style>
                {`
                  .swiper-pagination {
                    bottom: 10px !important;
                  }
                  
                  .swiper-pagination-bullet {
                    background: rgba(100, 181, 246, 0.5) !important;
                    width: 8px !important;
                    height: 8px !important;
                    margin: 0 4px !important;
                    opacity: 1 !important;
                  }
                  
                  .swiper-pagination-bullet-active {
                    background: #64b5f6 !important;
                    transform: scale(1.2) !important;
                  }
                  
                  .swiper-rtl .swiper-slide {
                    text-align: right;
                  }
                  
                  .swiper-rtl .swiper-button-next {
                    left: 10px;
                    right: auto;
                  }
                  
                  .swiper-rtl .swiper-button-prev {
                    right: 10px;
                    left: auto;
                  }
                `}
              </style>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Facilities Section */}
      <Container maxWidth="lg" sx={{ 
        py: { xs: 4, sm: 5, md: 6 },
        px: { xs: 2, sm: 3, md: 3 }
      }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <Typography
            variant="h2"
            align="center"
            sx={{
              fontSize: { 
                xs: '1.3rem', 
                sm: '1.6rem', 
                md: '2rem', 
                lg: '2.2rem' 
              },
              fontWeight: 600,
              mb: { xs: 3, sm: 4, md: 4 },
              background: 'linear-gradient(45deg, #64b5f6 30%, #42a5f5 90%)',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              px: { xs: 1, sm: 0 },
              lineHeight: { xs: 1.2, sm: 1.3 }
            }}
          >
            {currentContent.facilitiesTitle}
          </Typography>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <Grid container spacing={{ xs: 2, sm: 3, md: 3 }}>
            {facilities.map((facility, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <motion.div variants={fadeInUp}>
                  <Box
                    onClick={() => setSelectedImage(facility)}
                    sx={{
                      width: '100%',
                      height: { xs: '180px', sm: '200px', md: '220px' },
                      borderRadius: '12px',
                      overflow: 'hidden',
                      cursor: 'pointer',
                      position: 'relative',
                      transition: 'all 0.3s ease',
                      backgroundImage: `url(${facility})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      mx: { xs: 1, sm: 0 },
                      '&:hover': {
                        transform: 'scale(1.02)',
                        boxShadow: '0 10px 25px rgba(100, 181, 246, 0.2)',
                      },
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'linear-gradient(135deg, rgba(100, 181, 246, 0.1) 0%, rgba(66, 165, 245, 0.1) 100%)',
                        transition: 'all 0.3s ease',
                      },
                      '&:hover::before': {
                        background: 'linear-gradient(135deg, rgba(100, 181, 246, 0.2) 0%, rgba(66, 165, 245, 0.2) 100%)',
                      }
                    }}
                  />
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </motion.div>
      </Container>

      {/* Leadership Section */}
      <Box sx={{ 
        background: '#111923', 
        py: { xs: 4, sm: 5, md: 6 },
        width: '100%'
      }}>
        <Container maxWidth="lg" sx={{ 
          px: { xs: 2, sm: 3, md: 3 }
        }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <Grid container spacing={{ xs: 3, sm: 4, md: 4 }} alignItems="center">
              <Grid item xs={12} md={6} order={{ xs: 2, md: 1 }}>
                <motion.div variants={fadeInUp}>
                  <Typography
                    variant="h2"
                    sx={{
                      fontSize: { 
                        xs: '1.3rem', 
                        sm: '1.6rem', 
                        md: '2rem', 
                        lg: '2.2rem' 
                      },
                      fontWeight: 600,
                      mb: { xs: 2, sm: 3, md: 3 },
                      background: 'linear-gradient(45deg, #64b5f6 30%, #42a5f5 90%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      color: 'transparent',
                      textAlign: language === "AR" ? 'right' : 'left',
                      lineHeight: { xs: 1.2, sm: 1.3 }
                    }}
                  >
                    {currentContent.leadershipTitle}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: { xs: '0.85rem', sm: '0.95rem', md: '1rem' },
                      color: '#b3e5fc',
                      lineHeight: { xs: 1.5, sm: 1.6, md: 1.6 },
                      mb: { xs: 2, sm: 3, md: 3 },
                      textAlign: language === "AR" ? 'right' : 'left',
                      px: { xs: 1, sm: 0 }
                    }}
                  >
                    {currentContent.leadershipText}
                  </Typography>
                  <Box sx={{ 
                    p: { xs: 2, sm: 2.5, md: 3 }, 
                    borderRadius: '12px',
                    background: 'linear-gradient(135deg, rgba(100, 181, 246, 0.1) 0%, rgba(66, 165, 245, 0.1) 100%)',
                    border: '1px solid rgba(100, 181, 246, 0.2)',
                    mx: { xs: 1, sm: 0 }
                  }}>
                    <Typography variant="h6" sx={{ 
                      color: '#64b5f6', 
                      mb: 1, 
                      fontWeight: 500, 
                      fontSize: { xs: '0.9rem', sm: '0.95rem', md: '1rem' },
                      textAlign: language === "AR" ? 'right' : 'left',
                      lineHeight: { xs: 1.3, sm: 1.4 }
                    }}>
                      {currentContent.doctorName}
                    </Typography>
                    <Typography variant="body2" sx={{ 
                      color: '#b3e5fc', 
                      mb: 1, 
                      fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.85rem' },
                      textAlign: language === "AR" ? 'right' : 'left',
                      lineHeight: { xs: 1.3, sm: 1.4 }
                    }}>
                      {currentContent.doctorTitle}
                    </Typography>
                    <Typography variant="h6" sx={{ 
                      color: '#42a5f5', 
                      fontWeight: 500, 
                      fontSize: { xs: '0.85rem', sm: '0.9rem', md: '0.9rem' },
                      textAlign: language === "AR" ? 'right' : 'left'
                    }}>
                      {currentContent.hospitalName}
                    </Typography>
                  </Box>
                </motion.div>
              </Grid>
              <Grid item xs={12} md={6} order={{ xs: 1, md: 2 }}>
                <motion.div variants={fadeInUp}>
                  <Box sx={{
                    width: '100%',
                    height: { xs: '280px', sm: '320px', md: '350px' },
                    borderRadius: '15px',
                    overflow: 'hidden',
                    boxShadow: '0 10px 30px rgba(100, 181, 246, 0.2)',
                    backgroundImage: `url(${person})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'top center',
                    mx: { xs: 1, sm: 0 }
                  }} />
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ 
        background: '#0a0e1a', 
        py: { xs: 4, sm: 5, md: 6 },
        width: '100%',
        borderTop: '1px solid rgba(100, 181, 246, 0.1)'
      }}>
        <Container maxWidth="lg" sx={{ 
          px: { xs: 2, sm: 3, md: 3 }
        }}>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <Grid container spacing={{ xs: 3, sm: 4, md: 4 }}>
              {/* Medical Specialties */}
              <Grid item xs={12} md={3} order={{ xs: 1, md: 1 }}>
                <motion.div variants={fadeInUp}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                      fontWeight: 600,
                      mb: { xs: 2, sm: 2.5, md: 3 },
                      color: '#64b5f6',
                      textAlign: { xs: 'center', md: language === "AR" ? 'right' : 'left' }
                    }}
                  >
                    {currentContent.medicalSpecialties}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {currentContent.specialties.slice(0, 6).map((specialty, index) => (
                      <Typography
                        key={index}
                        variant="body2"
                        sx={{
                          fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
                          color: '#b3e5fc',
                          textAlign: { xs: 'center', md: language === "AR" ? 'right' : 'left' },
                          cursor: 'pointer',
                          transition: 'color 0.3s ease',
                          '&:hover': {
                            color: '#64b5f6'
                          }
                        }}
                      >
                        {specialty.name}
                      </Typography>
                    ))}
                  </Box>
                </motion.div>
              </Grid>

              {/* Patient Services */}
              <Grid item xs={12} md={3} order={{ xs: 2, md: 2 }}>
                <motion.div variants={fadeInUp}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                      fontWeight: 600,
                      mb: { xs: 2, sm: 2.5, md: 3 },
                      color: '#64b5f6',
                      textAlign: { xs: 'center', md: language === "AR" ? 'right' : 'left' }
                    }}
                  >
                    {currentContent.patientServices}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {currentContent.patientServicesList.map((service, index) => (
                      <Typography
                        key={index}
                        variant="body2"
                        sx={{
                          fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
                          color: '#b3e5fc',
                          textAlign: { xs: 'center', md: language === "AR" ? 'right' : 'left' },
                          cursor: 'pointer',
                          transition: 'color 0.3s ease',
                          '&:hover': {
                            color: '#64b5f6'
                          }
                        }}
                      >
                        {service}
                      </Typography>
                    ))}
                  </Box>
                </motion.div>
              </Grid>

              {/* Facilities */}
              <Grid item xs={12} md={3} order={{ xs: 3, md: 3 }}>
                <motion.div variants={fadeInUp}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                      fontWeight: 600,
                      mb: { xs: 2, sm: 2.5, md: 3 },
                      color: '#64b5f6',
                      textAlign: { xs: 'center', md: language === "AR" ? 'right' : 'left' }
                    }}
                  >
                    {currentContent.facilities}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                    {currentContent.facilitiesList.map((facility, index) => (
                      <Typography
                        key={index}
                        variant="body2"
                        sx={{
                          fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
                          color: '#b3e5fc',
                          textAlign: { xs: 'center', md: language === "AR" ? 'right' : 'left' },
                          cursor: 'pointer',
                          transition: 'color 0.3s ease',
                          '&:hover': {
                            color: '#64b5f6'
                          }
                        }}
                      >
                        {facility}
                      </Typography>
                    ))}
                  </Box>
                </motion.div>
              </Grid>

              {/* App Promotion */}
              <Grid item xs={12} md={3} order={{ xs: 4, md: 4 }}>
                <motion.div variants={fadeInUp}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: { xs: '1rem', sm: '1.1rem', md: '1.2rem' },
                      fontWeight: 600,
                      mb: { xs: 2, sm: 2.5, md: 3 },
                      color: '#64b5f6',
                      textAlign: { xs: 'center', md: language === "AR" ? 'right' : 'left' }
                    }}
                  >
                    {currentContent.appPromotion}
                  </Typography>
                  
                  {/* App Logo */}
                  <Box sx={{ 
                    mb: 2, 
                    display: 'flex', 
                    justifyContent: { xs: 'center', md: 'flex-start' }
                  }}>
                    <img
                      src={asterapp}
                      alt="Aster App"
                      style={{
                        width: '60px',
                        height: '60px',
                        borderRadius: '12px',
                        boxShadow: '0 4px 15px rgba(100, 181, 246, 0.3)'
                      }}
                    />
                  </Box>

                  <Typography
                    variant="body2"
                    sx={{
                      fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
                      color: '#b3e5fc',
                      mb: 3,
                      textAlign: { xs: 'center', md: language === "AR" ? 'right' : 'left' },
                      lineHeight: 1.5
                    }}
                  >
                    {currentContent.appDescription}
                  </Typography>

                  {/* QR Code with Click Handler */}
                  <Box sx={{ 
                    mb: 3, 
                    display: 'flex', 
                    justifyContent: { xs: 'center', md: 'flex-start' }
                  }}>
                    <Box
                      onClick={() => setQrCodeOpen(true)}
                      sx={{
                        position: 'relative',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.05)'
                        }
                      }}
                    >
                      <img
                        src={main_large}
                        alt="QR Code"
                        style={{
                          width: '120px',
                          height: '120px',
                          borderRadius: '8px',
                          background: '#ffffff',
                          padding: '8px'
                        }}
                      />
                      <Box
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform: 'translate(-50%, -50%)',
                          opacity: 0,
                          transition: 'opacity 0.3s ease',
                          color: '#1976d2',
                          fontSize: '20px',
                          background: 'rgba(255, 255, 255, 0.9)',
                          borderRadius: '50%',
                          width: '35px',
                          height: '35px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          '&:hover': {
                            opacity: 1
                          }
                        }}
                      >
                        <FaExpand />
                      </Box>
                    </Box>
                  </Box>

                  {/* Download Buttons */}
                  <Box sx={{ 
                    display: 'flex', 
                    flexDirection: 'column', 
                    gap: 1.5,
                    alignItems: { xs: 'center', md: 'flex-start' }
                  }}>
                    <Box
                      component="a"
                      href="https://play.google.com/store/apps/details?id=com.aster.virtualcare.patient"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        display: 'block',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.05)'
                        }
                      }}
                    >
                      <img
                        src={play_store}
                        alt="Download from Play Store"
                        style={{
                          width: '140px',
                          height: 'auto',
                          cursor: 'pointer'
                        }}
                      />
                    </Box>
                    <Box
                      component="a"
                      href="https://apps.apple.com/sa/app/myaster/id1562991616"
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        display: 'block',
                        transition: 'transform 0.3s ease',
                        '&:hover': {
                          transform: 'scale(1.05)'
                        }
                      }}
                    >
                      <img
                        src={apple_store}
                        alt="Download from App Store"
                        style={{
                          width: '140px',
                          height: 'auto',
                          cursor: 'pointer'
                        }}
                      />
                    </Box>
                  </Box>
                </motion.div>
              </Grid>
            </Grid>

            {/* Bottom Section */}
            <Box sx={{ 
              mt: { xs: 4, sm: 5, md: 6 }, 
              pt: { xs: 3, sm: 4, md: 4 }, 
              borderTop: '1px solid rgba(100, 181, 246, 0.1)' 
            }}>
              <Grid container spacing={{ xs: 2, sm: 3, md: 3 }} alignItems="center">
                {/* Logo */}
                <Grid item xs={12} md={4}>
                  <motion.div variants={fadeInUp}>
                    <Box sx={{
                      display: 'flex',
                      justifyContent: { xs: 'center', md: 'flex-start' },
                      mb: { xs: 2, md: 0 }
                    }}>
                      <img
                        src={footer}
                        alt="Aster Hospital Logo"
                        style={{
                          height: '60px',
                          width: 'auto'
                        }}
                      />
                    </Box>
                  </motion.div>
                </Grid>

                {/* Contact Info */}
                <Grid item xs={12} md={4}>
                  <motion.div variants={fadeInUp}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                          fontWeight: 600,
                          mb: 1.5,
                          color: '#64b5f6'
                        }}
                      >
                        {currentContent.contactInfo}
                      </Typography>
                      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <FaMapMarkerAlt style={{ color: '#64b5f6', fontSize: '14px' }} />
                          <Typography variant="body2" sx={{ color: '#b3e5fc', fontSize: '0.85rem' }}>
                            {currentContent.address}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <FaPhone style={{ color: '#64b5f6', fontSize: '14px' }} />
                          <Typography variant="body2" sx={{ color: '#b3e5fc', fontSize: '0.85rem' }}>
                            {currentContent.phoneNumber}
                          </Typography>
                        </Box>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <FaEmail style={{ color: '#64b5f6', fontSize: '14px' }} />
                          <Typography variant="body2" sx={{ color: '#b3e5fc', fontSize: '0.85rem' }}>
                            {currentContent.emailAddress}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </motion.div>
                </Grid>

                {/* Social Media & Copyright */}
                <Grid item xs={12} md={4}>
                  <motion.div variants={fadeInUp}>
                    <Box sx={{ textAlign: { xs: 'center', md: 'center' } }}>
                      <Typography
                        variant="h6"
                        sx={{
                          fontSize: { xs: '0.9rem', sm: '1rem', md: '1.1rem' },
                          fontWeight: 600,
                          mb: 1.5,
                          color: '#64b5f6'
                        }}
                      >
                        {currentContent.followUs}
                      </Typography>
                      <Box sx={{ 
                        display: 'flex', 
                        gap: 2, 
                        justifyContent: 'center',
                        mb: 2
                      }}>
                        {[
                          { icon: <FaFacebook />, color: '#1877f2' },
                          { icon: <FaTwitter />, color: '#1da1f2' },
                          { icon: <FaInstagram />, color: '#e4405f' },
                          { icon: <FaLinkedin />, color: '#0077b5' },
                          { icon: <FaYoutube />, color: '#ff0000' }
                        ].map((social, index) => (
                          <Box
                            key={index}
                            sx={{
                              width: 35,
                              height: 35,
                              borderRadius: '50%',
                              background: `linear-gradient(45deg, ${social.color}20 30%, ${social.color}40 90%)`,
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              transition: 'all 0.3s ease',
                              border: `1px solid ${social.color}40`,
                              '&:hover': {
                                transform: 'translateY(-2px)',
                                boxShadow: `0 8px 20px ${social.color}40`,
                                background: `linear-gradient(45deg, ${social.color}40 30%, ${social.color}60 90%)`,
                              }
                            }}
                          >
                            <Box sx={{ color: social.color, fontSize: '16px' }}>
                              {social.icon}
                            </Box>
                          </Box>
                        ))}
                      </Box>
                      <Typography
                        variant="body2"
                        sx={{
                          color: '#64b5f6',
                          fontSize: { xs: '0.8rem', sm: '0.85rem', md: '0.9rem' },
                          fontWeight: 400,
                          textAlign: 'center'
                        }}
                      >
                        {currentContent.copyright}
                      </Typography>
                    </Box>
                  </motion.div>
                </Grid>
              </Grid>
            </Box>
          </motion.div>
        </Container>
      </Box>

      {/* Contact Dialog */}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        PaperProps={{
          sx: {
            borderRadius: '20px',
            background: 'linear-gradient(135deg, #111923 0%, #1a1f2e 100%)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(100, 181, 246, 0.2)',
            maxWidth: { xs: '90vw', sm: '400px', md: '450px' },
            width: '100%',
            direction: language === "AR" ? 'rtl' : 'ltr',
            m: { xs: 1, sm: 2 }
          }
        }}
        fullScreen={false}
        maxWidth={false}
      >
        <DialogTitle sx={{
          textAlign: "center",
          fontWeight: "600",
          fontSize: { xs: '1.1rem', sm: '1.2rem', md: '1.4rem' },
          pt: { xs: 2, sm: 3 },
          pb: { xs: 1, sm: 2 },
          color: '#e3f2fd',
          px: { xs: 2, sm: 3 }
        }}>
          {currentContent.contactForm}
          <IconButton
            onClick={() => setOpenDialog(false)}
            sx={{
              position: 'absolute',
              right: language === "AR" ? 'auto' : { xs: 4, sm: 8 },
              left: language === "AR" ? { xs: 4, sm: 8 } : 'auto',
              top: { xs: 4, sm: 8 },
              color: '#64b5f6',
              width: { xs: 28, sm: 32 },
              height: { xs: 28, sm: 32 }
            }}
          >
            <FaTimes size={12} />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ 
          px: { xs: 2, sm: 3 },
          pb: { xs: 2, sm: 3 }
        }}>
          <Box component="form" onSubmit={handleFormSubmit} sx={{ 
            p: { xs: 1, sm: 2 }
          }}>
            <TextField
              label={currentContent.name}
              variant="outlined"
              fullWidth
              size="small"
              sx={{
                mb: { xs: 1.5, sm: 2 },
                '& .MuiOutlinedInput-root': {
                  color: '#ffffff',
                  fontSize: { xs: '0.85rem', sm: '0.9rem' },
                  '& fieldset': { borderColor: 'rgba(100, 181, 246, 0.3)' },
                  '&:hover fieldset': { borderColor: 'rgba(100, 181, 246, 0.5)' },
                  '&.Mui-focused fieldset': { borderColor: '#64b5f6' },
                },
                '& .MuiInputLabel-root': { 
                  color: '#b3e5fc', 
                  fontSize: { xs: '0.85rem', sm: '0.9rem' }
                },
              }}
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
<TextField
  label={currentContent.phone}
  variant="outlined"
  fullWidth
  size="small"
  inputMode="numeric"
   type="tel"
  sx={{
    mb: { xs: 1.5, sm: 2 },
    '& .MuiOutlinedInput-root': {
      color: '#ffffff',
      fontSize: { xs: '0.85rem', sm: '0.9rem' },
      '& fieldset': { borderColor: 'rgba(100, 181, 246, 0.3)' },
      '&:hover fieldset': { borderColor: 'rgba(100, 181, 246, 0.5)' },
      '&.Mui-focused fieldset': { borderColor: '#64b5f6' },
    },
    '& .MuiInputLabel-root': { 
      color: '#b3e5fc', 
      fontSize: { xs: '0.85rem', sm: '0.9rem' }
    },
  }}
  value={phone}
  onChange={handlePhoneChange}
/>

            <TextField
              label={currentContent.email}
              variant="outlined"
              fullWidth
              size="small"
              type="email"
              sx={{
                mb: { xs: 2, sm: 3 },
                '& .MuiOutlinedInput-root': {
                  color: '#ffffff',
                  fontSize: { xs: '0.85rem', sm: '0.9rem' },
                  '& fieldset': { borderColor: 'rgba(100, 181, 246, 0.3)' },
                  '&:hover fieldset': { borderColor: 'rgba(100, 181, 246, 0.5)' },
                  '&.Mui-focused fieldset': { borderColor: '#64b5f6' },
                },
                '& .MuiInputLabel-root': { 
                  color: '#b3e5fc', 
                  fontSize: { xs: '0.85rem', sm: '0.9rem' }
                },
              }}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                py: { xs: 1.2, sm: 1.5 },
                borderRadius: '12px',
                background: 'linear-gradient(45deg, #1976d2 30%, #42a5f5 90%)',
                fontSize: { xs: '0.85rem', sm: '0.9rem' },
                fontWeight: 500,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.02)',
                  boxShadow: '0 6px 20px rgba(25, 118, 210, 0.3)',
                }
              }}
            >
              <FaEnvelope style={{ 
                marginRight: language === "AR" ? '0' : '6px', 
                marginLeft: language === "AR" ? '6px' : '0', 
                fontSize: '0.8rem' 
              }} />
              {currentContent.submit}
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* QR Code Modal */}
      <Dialog
        open={qrCodeOpen}
        onClose={() => setQrCodeOpen(false)}
        maxWidth={false}
        PaperProps={{
          sx: {
            backgroundColor: 'rgba(0,0,0,0.9)',
            boxShadow: 'none',
            borderRadius: 0,
            maxWidth: 'none',
            maxHeight: 'none',
            margin: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }
        }}
        fullScreen={true}
      >
        <DialogContent sx={{ 
          p: 0, 
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <IconButton
            onClick={() => setQrCodeOpen(false)}
            sx={{
              position: 'absolute',
              top: { xs: 15, sm: 25 },
              right: { xs: 15, sm: 25 },
              color: '#ffffff',
              backgroundColor: 'rgba(0,0,0,0.7)',
              zIndex: 1000,
              width: { xs: 40, sm: 50 },
              height: { xs: 40, sm: 50 },
              '&:hover': { 
                backgroundColor: 'rgba(0,0,0,0.8)',
                transform: 'scale(1.1)'
              }
            }}
          >
            <FaTimes size={20} />
          </IconButton>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
              p: 2
            }}
          >
            <img
              src={main_large}
              alt="QR Code - Download Aster App"
              style={{
                width: '300px',
                height: '300px',
                borderRadius: '15px',
                background: '#ffffff',
                padding: '20px',
                boxShadow: '0 10px 30px rgba(100, 181, 246, 0.3)'
              }}
            />
            <Typography
              variant="h5"
              sx={{
                color: '#ffffff',
                textAlign: 'center',
                fontSize: { xs: '1.2rem', sm: '1.5rem' },
                fontWeight: 600
              }}
            >
              {language === "AR" ? "امسح الكود لتحميل التطبيق" : "Scan QR Code to Download App"}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#b3e5fc',
                textAlign: 'center',
                fontSize: { xs: '0.9rem', sm: '1rem' },
                maxWidth: '400px'
              }}
            >
              {currentContent.appDescription}
            </Typography>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Image Preview Dialog */}
      <Dialog
        open={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        maxWidth={false}
        fullScreen={true}
        PaperProps={{
          sx: {
            backgroundColor: 'rgba(0,0,0,0.9)',
            boxShadow: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }
        }}
      >
        <DialogContent sx={{ 
          p: 0, 
          position: 'relative',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <IconButton
            onClick={() => setSelectedImage(null)}
            sx={{
              position: 'absolute',
              top: { xs: 10, sm: 20 },
              right: { xs: 10, sm: 20 },
              color: '#ffffff',
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 1,
              width: { xs: 35, sm: 40 },
              height: { xs: 35, sm: 40 },
              '&:hover': { backgroundColor: 'rgba(0,0,0,0.7)' }
            }}
          >
            <FaTimes size={16} />
          </IconButton>
          {selectedImage && (
            <img
              src={selectedImage}
              alt="Facility"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                maxWidth: '95vw',
                maxHeight: '95vh'
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      {/* Alert Dialog */}
      <Dialog
        open={openAlert}
        onClose={() => setOpenAlert(false)}
        PaperProps={{
          sx: {
            borderRadius: '15px',
            background: 'linear-gradient(135deg, #111923 0%, #1a1f2e 100%)',
            border: `2px solid ${alertSuccess ? '#4CAF50' : '#f44336'}`,
            maxWidth: { xs: '90vw', sm: '400px' },
            width: '100%',
            m: { xs: 1, sm: 2 }
          }
        }}
      >
        <DialogTitle sx={{ 
          color: alertSuccess ? '#4CAF50' : '#f44336', 
          textAlign: 'center',
          pt: { xs: 1.5, sm: 2 },
          pb: { xs: 1, sm: 1 },
          fontSize: { xs: '1rem', sm: '1.1rem' },
          fontWeight: 600,
          px: { xs: 2, sm: 3 }
        }}>
          {alertSuccess ? 
            (language === "AR" ? "تم بنجاح!" : "Success!") : 
            (language === "AR" ? "تنبيه!" : "Alert!")}
        </DialogTitle>
        <DialogContent sx={{ 
          color: '#e3f2fd', 
          textAlign: 'center', 
          pb: { xs: 1.5, sm: 2 },
          px: { xs: 2, sm: 3 }
        }}>
          <Typography sx={{ 
            fontSize: { xs: '0.85rem', sm: '0.9rem' },
            lineHeight: { xs: 1.4, sm: 1.5 }
          }}>
            {alertMessage}
          </Typography>
        </DialogContent>
      </Dialog>
    </Box>
  );
}

export default HomePage;