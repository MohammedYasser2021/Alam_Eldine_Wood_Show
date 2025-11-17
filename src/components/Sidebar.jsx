import React from "react";
import PropTypes from "prop-types";
import { useNavigate, Outlet, Link, useLocation } from "react-router-dom";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
  useMediaQuery,
  Divider,
  Container,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  AdminPanelSettings as AdminPanelSettingsIcon,
  PeopleAlt as PeopleAltIcon,
  GridView as GridViewIcon,
  VerifiedUser as VerifiedUserIcon,
  Compare as CompareIcon,
  Logout as LogoutIcon,
  ExpandMore,
  Close as CloseIcon,
  KeyboardArrowDown,
} from "@mui/icons-material";
import { FaBars } from "react-icons/fa";
import { MdGTranslate } from "react-icons/md";
import { HiHome, HiCalendar } from "react-icons/hi";
import logo from "../assets/logo.png";
import "../App.css";

const NAVIGATION = [
  {
    title: "Home",
    titleAr: "الصفحة الرئيسية",
    icon: <HiHome className="w-4 h-4" />,
    path: "/",
  },
  {
    title: "Booking",
    titleAr: "حجز",
    icon: <HiCalendar className="w-4 h-4" />,
    path: "/booking",
  },
];

function DashboardLayoutBasic({ language, setLanguage, ...props }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEls, setAnchorEls] = React.useState({});
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const toggleLanguage = () => {
    setLanguage((prev) => {
      const newLanguage = prev === "EN" ? "AR" : "EN";
      return newLanguage;
    });
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event, index) => {
    setAnchorEls(prev => ({
      ...prev,
      [index]: event.currentTarget
    }));
  };

  const handleMenuClose = (index) => {
    setAnchorEls(prev => ({
      ...prev,
      [index]: null
    }));
  };

  React.useEffect(() => {
    setMobileOpen(false);
    setAnchorEls({});
  }, [location]);

  const navbarItems = (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 0.3,
        direction: 'ltr', // إجبار الاتجاه ليكون من اليسار لليمين دائماً
      }}
    >
      {NAVIGATION.map((item, index) => (
        <Box key={index} sx={{ position: 'relative' }}>
          {item.children ? (
            <>
              <Button
                onClick={(e) => handleMenuOpen(e, index)}
                sx={{
                  color: '#ffffff',
                  textTransform: 'none',
                  fontWeight: 500,
                  fontSize: '0.8rem',
                  padding: '8px 12px',
                  borderRadius: '8px',
                  minHeight: '36px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 0.5, // مسافة ثابتة
                  flexDirection: 'row', // ترتيب ثابت: أيقونة ثم نص
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                    borderRadius: '8px',
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(255, 255, 255, 0.12)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
                    '&::before': {
                      opacity: 1,
                    }
                  },
                  '&:active': {
                    transform: 'translateY(-1px)',
                  }
                }}
              >
                {item.icon}
                <span style={{ marginLeft: '4px', marginRight: '4px' }}>
                  {language === "EN" ? item.title : item.titleAr}
                </span>
                <KeyboardArrowDown sx={{ color: '#ffffff', fontSize: '16px', marginLeft: '2px' }} />
              </Button>
              <Menu
                anchorEl={anchorEls[index]}
                open={Boolean(anchorEls[index])}
                onClose={() => handleMenuClose(index)}
                sx={{
                  '& .MuiPaper-root': {
                    borderRadius: '12px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.4)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    minWidth: 180,
                    backgroundColor: '#111923',
                    backdropFilter: 'blur(20px)',
                    mt: 1,
                  }
                }}
                transformOrigin={{
                  horizontal: 'left',
                  vertical: 'top',
                }}
                anchorOrigin={{
                  horizontal: 'left',
                  vertical: 'bottom',
                }}
              >
                {item.children?.map((subItem, subIndex) => (
                  <MenuItem
                    key={subIndex}
                    component={Link}
                    to={subItem.path}
                    onClick={() => handleMenuClose(index)}
                    sx={{
                      padding: '10px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.8,
                      color: '#ffffff',
                      transition: 'all 0.2s ease',
                      borderRadius: '6px',
                      margin: '2px 6px',
                      fontSize: '0.8rem',
                      flexDirection: 'row',
                      '&:hover': {
                        backgroundColor: 'rgba(255, 255, 255, 0.15)',
                     
                      }
                    }}
                  >
                    {subItem.icon}
                    <Typography variant="body2" sx={{ fontWeight: 400, color: '#ffffff', fontSize: '0.8rem' }}>
                      {language === "EN" ? subItem.title : subItem.titleAr}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </>
          ) : (
            <Button
              component={Link}
              to={item.path}
              sx={{
                color: location.pathname === item.path ? '#64b5f6' : '#ffffff',
                textTransform: 'none',
                fontWeight: location.pathname === item.path ? 600 : 500,
                fontSize: '0.8rem',
                padding: '8px 12px',
                borderRadius: '8px',
                minHeight: '36px',
                display: 'flex',
                alignItems: 'center',
                gap: 0.5, // مسافة ثابتة
                flexDirection: 'row', // ترتيب ثابت: أيقونة ثم نص
                position: 'relative',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                overflow: 'hidden',
                backgroundColor: location.pathname === item.path ? 'rgba(100, 181, 246, 0.15)' : 'transparent',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: location.pathname === item.path 
                    ? 'rgba(100, 181, 246, 0.2)' 
                    : 'rgba(255,255,255,0.1)',
                  opacity: location.pathname === item.path ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                  borderRadius: '8px',
                },
                '&:hover': {
                  backgroundColor: location.pathname === item.path ? 'rgba(100, 181, 246, 0.2)' : 'rgba(255, 255, 255, 0.12)',
                  transform: 'translateY(-2px)',
                  boxShadow: location.pathname === item.path 
                    ? '0 8px 25px rgba(100, 181, 246, 0.3)' 
                    : '0 8px 25px rgba(0, 0, 0, 0.15)',
                  '&::before': {
                    opacity: 1,
                  }
                },
                '&:active': {
                  transform: 'translateY(-1px)',
                },
                '&::after': location.pathname === item.path ? {
                  content: '""',
                  position: 'absolute',
                  bottom: '-2px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  width: '70%',
                  height: '2px',
                  backgroundColor: '#64b5f6',
                  borderRadius: '1px',
                } : {}
              }}
            >
              {item.icon}
              <span style={{ marginLeft: '4px', marginRight: '4px' }}>
                {language === "EN" ? item.title : item.titleAr}
              </span>
            </Button>
          )}
        </Box>
      ))}
    </Box>
  );

  const mobileDrawer = (
    <Box sx={{ width: 280, height: '100%', backgroundColor: '#111923' }}>
      <Box sx={{ p: 2.5, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <img src={logo} alt="Logo" style={{ maxHeight: '50px' }} />
      </Box>
      <Divider sx={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', mx: 2 }} />
      <List sx={{ px: 1.5, py: 2 }}>
        {NAVIGATION.map((item, index) => (
          <ListItem
            key={index}
            button
            component={Link}
            to={item.path}
            onClick={handleDrawerToggle}
            sx={{
              borderRadius: '12px',
              mb: 1,
              mx: 0.5,
              padding: '10px 12px',
              backgroundColor: location.pathname === item.path ? 'rgba(100, 181, 246, 0.2)' : 'transparent',
              direction: 'ltr', // اتجاه ثابت
              '&:hover': {
                backgroundColor: location.pathname === item.path ? 'rgba(100, 181, 246, 0.25)' : 'rgba(255, 255, 255, 0.1)',
              
              },
              transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <ListItemIcon sx={{ 
              minWidth: 35, 
              color: location.pathname === item.path ? '#64b5f6' : '#ffffff',
              marginRight: language === 'AR' ? '8px' : '0', // مسافة إضافية للعربية
              marginLeft: language === 'AR' ? '0' : '0',
            }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText
              primary={language === "EN" ? item.title : item.titleAr}
              sx={{
                textAlign: language === 'AR' ? 'right' : 'left', // محاذاة النص
                '& .MuiTypography-root': {
                  fontWeight: location.pathname === item.path ? 600 : 500,
                  fontSize: '0.85rem',
                  color: location.pathname === item.path ? '#64b5f6' : '#ffffff',
                  direction: language === 'AR' ? 'rtl' : 'ltr',
                }
              }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: "flex", flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          backgroundColor: '#111923',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          backdropFilter: 'blur(20px)',
          zIndex: 1300,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              minHeight: { xs: 70, sm: 70 },
              px: { xs: 0, sm: 0 },
              direction: 'ltr', // إجبار الاتجاه ليكون من اليسار لليمين دائماً
            }}
          >
            {/* Logo - دائماً على الشمال */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 2,
              order: 1, // ترتيب ثابت
            }}>
              <img
                src={logo}
                alt="Logo"
                style={{ 
                  maxHeight: '55px',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  filter: 'brightness(1.1) contrast(1.1)',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'scale(1.05)';
                                e.target.style.filter = 'brightness(1.1) contrast(1.1)';
                }}
              />
            </Box>

                      {/* Desktop Navigation - في الوسط */}
            {!isMobile && (
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: 0.5,
                order: 2, // ترتيب ثابت
                position: 'absolute',
                left: '50%',
                transform: 'translateX(-50%)',
              }}>
                {navbarItems}
              </Box>
            )}

            {/* Right Side Actions - دائماً على اليمين */}
            <Box sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: 1,
              order: 3, // ترتيب ثابت
            }}>
              {/* Language Toggle */}
              <IconButton
                onClick={toggleLanguage}
                sx={{
                  color: '#64b5f6',
                  backgroundColor: 'rgba(100, 181, 246, 0.15)',
                  width: 40,
                  height: 40,
                  borderRadius: '10px',
                  border: '1px solid rgba(100, 181, 246, 0.3)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: 'rgba(100, 181, 246, 0.2)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  },
                  '&:hover': {
                    backgroundColor: 'rgba(100, 181, 246, 0.25)',
                    transform: 'scale(1.08)',
                    boxShadow: '0 8px 25px rgba(100, 181, 246, 0.4)',
                    borderColor: 'rgba(100, 181, 246, 0.5)',
                    '&::before': {
                      opacity: 1,
                    }
                  },
                  '&:active': {
                    transform: 'scale(1.05)',
                  }
                }}
                title={language === "EN" ? "Translate to Arabic" : "ترجم إلى الإنجليزية"}
              >
                <MdGTranslate style={{ fontSize: "18px" }} />
              </IconButton>

              {/* Mobile Menu Button */}
              {isMobile && (
                <IconButton
                  onClick={handleDrawerToggle}
                  sx={{
                    color: '#ffffff',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    width: 40,
                    height: 40,
                    borderRadius: '10px',
                    border: '1px solid rgba(255,255,255,0.2)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      backgroundColor: 'rgba(255,255,255,0.15)',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                    },
                    '&:hover': {
                      backgroundColor: 'rgba(255,255,255,0.2)',
                      transform: 'rotate(90deg) scale(1.05)',
                      boxShadow: '0 8px 25px rgba(0, 0, 0, 0.2)',
                      borderColor: 'rgba(255,255,255,0.3)',
                      '&::before': {
                        opacity: 1,
                      }
                    },
                  }}
                >
                  {mobileOpen ? (
                    <CloseIcon style={{ fontSize: "18px" }} />
                  ) : (
                    <FaBars style={{ fontSize: "16px" }} />
                  )}
                </IconButton>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="left" // دائماً من الشمال
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: 280,
            backgroundColor: '#111923',
            borderRadius: '0 20px 20px 0', // دائماً نفس الشكل
            boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            border: '1px solid rgba(255,255,255,0.1)',
          },
        }}
      >
        {mobileDrawer}
      </Drawer>

      {/* Content Area */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          bgcolor: "#f8f9fa",
          padding: { xs: 2, sm: 3 },
          marginTop: { xs: '60px', sm: '70px' },
          minHeight: 'calc(100vh - 70px)',
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

DashboardLayoutBasic.propTypes = {
  language: PropTypes.string.isRequired,
  setLanguage: PropTypes.func.isRequired,
  window: PropTypes.func,
};

export default DashboardLayoutBasic;

