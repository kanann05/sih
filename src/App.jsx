import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useNavigation, Link } from 'react-router-dom';
import Awareness_Screen from './pages/learn_the_difference'
import Check_DBT_Status from './pages/check_dbt_status'
import Help_Center from './pages/help_center'
import Community from './pages/community'
import Tools_And_Resources from './pages/tools_and_resources'
import Call_Chat_Support from './pages/call_chat_support'
import {Lang} from './i18n'
// import { useAppStore } from "../store/useAppStore";
import {
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  LogOut,
  Home,
  CheckCircle,
  BookOpen,
  Search,
  MessageCircle,
  Award,
  Users,
  Download,
  Play,
  HelpCircle,
  ArrowRight,
  ArrowLeft,
  Globe,
  PhoneCall,
  AlertCircle,
  Smartphone,
  Building,
  CreditCard,
  Shield,
  Star,
  Trophy,
  Bell,
  X,
  Menu,
  Key,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import data from './lang/texts.json'
const Key_To_Screen = ["home", "awareness", "check", "chatbot", "community", "tools", "contact"]
const key_to_link = ["/", "/learn_the_difference", "/check_dbt_status", "/help_center", "/community", "/tools_and_resources", "/call_chat_support"]
// const key_to_link = {"home" : "/", "awareness" : "/learn_the_difference"}
// Add this after your imports, before the DBTAwarenessApp component
const USERS = [
  {
    username: "admin",
    email: "Admin@123",
    password: "Admin@123",
    role: "Admin",
  },
  {
    username: "student",
    email: "student@education.gov.in",
    password: "Student@2024",
    role: "Student",
  },
  {
    username: "officer",
    email: "officer@dbt.gov.in",
    password: "Officer#456",
    role: "Officer",
  },
];

// Main App Component
const DBTAwarenessApp = () => {

  const [language, setLanguage] = useState(localStorage.getItem("lang"));
  const [isAuthenticated, setIsAuthenticated] = useState(true); //change
  const [currentUser, setCurrentUser] = useState(null);
  const [t, i18n] = useTranslation("global");
  const [currentScreen, setCurrentScreen] = useState("home");
  // const [language, setLanguage] = useState("english");
  const [showNotification, setShowNotification] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = useNavigate();
  
  const [contentNav, setContentNav] = useState(data.find(item => item.page === "nav")[language])

  // Authentication handlers
  const handleLogin = (user) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };
  useEffect(() => {
  const navData = data.find(item => item.page === "nav");
  setContentNav(navData[language]);
}, [language]);

  // localStorage.setItem("lang", "en")
  const screens = {
    home: t("home.navigation.home"),
    awareness: t("home.navigation.learn_the_difference"),
    check: t("home.navigation.check_dbt_status"),
    chatbot: t("home.navigation.help_center"),
    community: t("home.navigation.community"),
    tools: t("home.navigation.tools_and_resources"),
    contact: t("home.navigation.call_and_chat_support"), // Add this line
  };

  const languages = {
    en: "English",
    hin: "हिंदी",
    mar: "मराठी",
  };

  const changeLang = (lang) => {
    console.log(lang);
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    const timer = setTimeout(() => setShowNotification(true), 3000);
    return () => clearTimeout(timer);
    
  }, []);

  useEffect(() => {localStorage.setItem("lang", language)}, [language])

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return <AuthScreen onLogin={handleLogin} />;
  }

  const HomeScreen = ({ setCurrentScreen }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [t, i18n] = useTranslation("global");
  const languages = {
    en: "English",
    hin: "हिंदी",
    mar: "मराठी",
  };
  const [content, setContent] = useState(data.find(item => item.page === "home")[language])
  useEffect(() => {setContent(data.find(item => item.page === "home")[language])}, [language])

  useEffect(() => {console.log(content)}, [content])
  const infoSlides = [
    {
      icon: <AlertCircle className="w-8 h-8 text-red-500" />,
      title: content[3][1],
      content:content[3][2],
      description: content[3][3],
    },
    {
      icon: <CreditCard className="w-8 h-8 text-orange-500" />,
      title: content[3][4],
      content: content[3][5],
      description: content[3][6],
    },
    {
      icon: <Building className="w-8 h-8 text-green-500" />,
      title: content[3][7],
      content: content[3][8],
      description: content[3][9],
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % infoSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center py-8">
        <div className="w-24 h-24 bg-gradient-to-r from-blue-600 to-green-600 rounded-full mx-auto mb-6 flex items-center justify-center">
          <Shield className="w-12 h-12 text-white" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          {content[0][0]}
        </h1>
        {/* <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Secure Your Scholarship
        </h1> */}
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {content[0][1]}
        </p>
        {/* <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Ensure your bank account is DBT-enabled to receive government benefits
          without delays
        </p> */}
      </div>

      {/* Main Action Buttons */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <button
          onClick={() => setCurrentScreen("check")}
          className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          <CheckCircle className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">
            {content[1][0]}
          </h3>
          <p className="text-blue-100">
            {" "}
            {content[1][1]}
          </p>
          {/* <p className="text-blue-100">Verify if your account is DBT-enabled</p> */}
        </button>

        <button
          // onClick={() => setCurrentScreen("awareness")}
          

          className="bg-gradient-to-r from-green-600 to-green-700 text-white p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          <BookOpen className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">
            {" "}
            {content[2][0]}
          </h3>
          {/* <h3 className="text-xl font-bold mb-2">Learn the Difference</h3> */}
          <p className="text-green-100">
             {content[2][1]}
          </p>
          {/* <p className="text-green-100">
            Understand Aadhaar link vs DBT-enabled
          </p> */}
        </button>
      </div>

      {/* Info Slider */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-800">
            {content[3][0]}
          </h3>
          {/* <h3 className="text-lg font-semibold text-gray-800">
            Quick Information
          </h3> */}
          <div className="flex space-x-2">
            {infoSlides.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentSlide === index ? "bg-blue-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>

        <div className="min-h-[120px] bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6">
          <div className="flex items-start space-x-4">
            {infoSlides[currentSlide].icon}
            <div>
              <h4 className="font-semibold text-gray-900 mb-1">
                {infoSlides[currentSlide].title}
              </h4>
              <p className="text-lg font-medium text-gray-800 mb-2">
                {infoSlides[currentSlide].content}
              </p>
              <p className="text-sm text-gray-600">
                {infoSlides[currentSlide].description}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Access Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          onClick={() => setCurrentScreen("chatbot")}
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          <MessageCircle className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          {/* <span className="text-sm font-medium text-gray-800">Help Center</span> */}
          <span className="text-sm font-medium text-gray-800">
            {content[4][0]}
          </span>
        </button>

        <button
          onClick={() => setCurrentScreen("tools")}
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          <Download className="w-8 h-8 text-green-600 mx-auto mb-2" />
          {/* <span className="text-sm font-medium text-gray-800">Resources</span> */}
          <span className="text-sm font-medium text-gray-800">
             {content[4][2]}
          </span>
        </button>

        <button
          onClick={() => setCurrentScreen("community")}
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <span className="text-sm font-medium text-gray-800">
             {content[4][1]}
          </span>
          {/* <span className="text-sm font-medium text-gray-800">Community</span> */}
        </button>

        <button className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <PhoneCall className="w-8 h-8 text-orange-600 mx-auto mb-2" />
          <span className="text-sm font-medium text-gray-800">
             {content[4][3]}
          </span>
          {/* <span className="text-sm font-medium text-gray-800">Contact</span> */}
        </button>
      </div>
    </div>
  );
};

  // Rest of your existing code continues here...
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
       
      <header className="bg-white shadow-lg border-b-4 border-orange-400">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-600 rounded-full flex items-center justify-center">
                <Shield className="w-7 h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">
                  QuickLink DBT
                </h1>
                <p className="text-sm text-gray-600">Direct Benefit Transfer</p>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {/* User Info Display */}
              <div className="hidden md:flex items-center space-x-2 px-3 py-2 bg-blue-50 rounded-lg">
                <User className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">
                  {contentNav[0][0]}
                </span>
              </div>

              <select
                value={language}
                onChange={(e) => {changeLang(e.target.value); console.log(e.target.value)}}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500"
              >
                {Object.entries(languages).map(([key, value]) => (
                  <option key={key} value={key}>
                    {value}
                  </option>
                ))}
              </select>

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="p-2 rounded-lg hover:bg-red-50 text-red-600"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>

              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100"
              >
                {menuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden mt-4 space-y-2">
              {/* {Object.entries(screens).map(([key, value]) => (
                <button
                  key={key}
                  onClick={() => {
               
                    setCurrentScreen(key);
                    setMenuOpen(false);
                   
                  }}
                  className={`w-full text-left px-4 py-2 rounded-lg ${
                    currentScreen === key
                      ? "bg-blue-100 text-blue-700 font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {value}
                </button>
              ))} */}

              {Object.entries(screens).map(([key, value]) => (
                <Link
                  key={key}
                  to={key_to_link[key]}
                  // onClick={() => {
                  //   setCurrentScreen(key);
                  //   setMenuOpen(false);
                  // }}
                  className={`w-full block px-4 py-2 rounded-lg ${
                    currentScreen === key
                      ? "bg-blue-100 text-blue-700 font-medium"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {value}
                </Link>
              ))}

            </div>
          )}
        </div>
      </header>

      {/* Navigation */}
      <nav className="hidden md:block bg-white border-b">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex space-x-8">
            {Object.entries(contentNav[1]).map(([key, value]) => (
              <Link
                key={key}
                to={key_to_link[key]}
                onClick={() => {
                  // setCurrentScreen(key);
                  // setMenuOpen(false);
                }}
                className={`w-full block px-4 py-2 rounded-lg ${
                  currentScreen === key
                    ? "bg-blue-100 text-blue-700 font-medium"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                {value}
              </Link>
            ))}

            
          </div>
        </div>
      </nav>

      {/* Notification Banner */}
      {showNotification && (
        <div className="bg-orange-100 border border-orange-400 px-4 py-3 relative">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            <div className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-orange-600" />
              <span className="text-orange-800 text-sm text-center font-medium">
                {t("fact")}
              </span>
            </div>
            <button
              onClick={() => setShowNotification(false)}
              className="text-orange-600 hover:text-orange-800"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {currentScreen === "home" && (
          <HomeScreen setCurrentScreen={setCurrentScreen} />
        )}
        {currentScreen === "awareness" && <Awareness_Screen />}
        {currentScreen === "check" && <Check_DBT_Status />}
        {currentScreen === "chatbot" && <Help_Center />}
        {currentScreen === "community" && <Community />}
        {currentScreen === "tools" && <Tools_And_Resources />}
        {currentScreen === "contact" && <Call_Chat_Support />} {/* Add this line */}
      </main>
    </div>
  );
};

// Authentication Screen Component - Add this BEFORE HomeScreen
const AuthScreen = ({ onLogin }) => {
  const [authMode, setAuthMode] = useState("login"); // 'login' or 'signup'
  const [loginMethod, setLoginMethod] = useState("username"); // 'username' or 'email'
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const identifier =
      loginMethod === "username" ? formData.username : formData.email;
    const user = USERS.find(
      (u) =>
        (loginMethod === "username"
          ? u.username === identifier
          : u.email === identifier) && u.password === formData.password
    );

    if (user) {
      onLogin(user);
    } else {
      setError("Invalid credentials. Please check and try again.");
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    setError("");

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.username ||
      !formData.password
    ) {
      setError("All fields are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // Check if user already exists
    const userExists = USERS.find(
      (u) => u.username === formData.username || u.email === formData.email
    );

    if (userExists) {
      setError("Username or email already exists");
      return;
    }

    // Create new user and log them in
    const newUser = {
      username: formData.username,
      email: formData.email,
      password: formData.password,
      role: "Student",
      fullName: formData.fullName,
    };

    onLogin(newUser);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="text-center pt-8 pb-6 px-6">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-green-600 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Shield className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            {authMode === "login" ? "DBT Portal Login" : "Create Account"}
          </h1>
          <p className="text-sm text-gray-600">
            Direct Benefit Transfer System
          </p>
          <div className="flex items-center justify-center space-x-1 text-xs text-gray-500 mt-2">
            <Building className="w-3 h-3" />
            <span>Government of India</span>
          </div>
        </div>

        {/* Form */}
        <div className="px-6 pb-8">
          {authMode === "login" ? (
            <>
              {/* Login Method Tabs */}
              <div className="flex bg-gray-100 rounded-lg p-1 mb-6">
                <button
                  onClick={() => setLoginMethod("username")}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-all ${
                    loginMethod === "username"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600"
                  }`}
                >
                  <User className="w-4 h-4" />
                  <span className="text-sm font-medium">Username</span>
                </button>
                <button
                  onClick={() => setLoginMethod("email")}
                  className={`flex-1 flex items-center justify-center space-x-2 py-2 px-4 rounded-md transition-all ${
                    loginMethod === "email"
                      ? "bg-white text-blue-600 shadow-sm"
                      : "text-gray-600"
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  <span className="text-sm font-medium">Email</span>
                </button>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                {/* Username/Email Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {loginMethod === "username" ? "Username" : "Email"}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      {loginMethod === "username" ? (
                        <User className="w-5 h-5 text-gray-400" />
                      ) : (
                        <Mail className="w-5 h-5 text-gray-400" />
                      )}
                    </div>
                    <input
                      type="text"
                      name={loginMethod === "username" ? "username" : "email"}
                      value={
                        loginMethod === "username"
                          ? formData.username
                          : formData.email
                      }
                      onChange={handleInputChange}
                      placeholder={
                        loginMethod === "username"
                          ? "Enter your username"
                          : "Enter your email"
                      }
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Enter your password"
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-gray-400" />
                      ) : (
                        <Eye className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                    <span className="text-sm text-red-700">{error}</span>
                  </div>
                )}

                {/* Sign In Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-green-700 transition-all shadow-lg"
                >
                  Sign In
                </button>
              </form>

              {/* Demo Credentials */}
              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="text-sm font-semibold text-blue-900 mb-2">
                  Demo Credentials:
                </h4>
                <div className="space-y-1 text-xs text-blue-800">
                  <p>
                    <strong>Admin:</strong> admin / Admin@123
                  </p>
                  <p>
                    <strong>Student:</strong> student@education.gov.in /
                    Student@2024
                  </p>
                  <p>
                    <strong>Officer:</strong> officer / Officer#456
                  </p>
                </div>
              </div>

              {/* Sign Up Link */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <button
                    onClick={() => {
                      setAuthMode("signup");
                      setError("");
                      setFormData({
                        username: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                        fullName: "",
                      });
                    }}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Sign Up
                  </button>
                </p>
              </div>
            </>
          ) : (
            <>
              {/* Sign Up Form */}
              <form onSubmit={handleSignup} className="space-y-4">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {/* Username */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Username
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleInputChange}
                      placeholder="Choose a username"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Create a password"
                      className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5 text-gray-400" />
                      ) : (
                        <Eye className="w-5 h-5 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirm your password"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                {/* Error Message */}
                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-center space-x-2">
                    <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
                    <span className="text-sm text-red-700">{error}</span>
                  </div>
                )}

                {/* Sign Up Button */}
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-green-700 transition-all shadow-lg"
                >
                  Create Account
                </button>
              </form>

              {/* Login Link */}
              <div className="mt-6 text-center">
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <button
                    onClick={() => {
                      setAuthMode("login");
                      setError("");
                      setFormData({
                        username: "",
                        email: "",
                        password: "",
                        confirmPassword: "",
                        fullName: "",
                      });
                    }}
                    className="text-blue-600 font-medium hover:underline"
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-center space-x-2 text-xs text-gray-600">
            <Lock className="w-3 h-3" />
            <span>
              This is a secure government portal. Your data is protected.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};


// Check Screen Component

// Chatbot Screen Component

// Community Screen Component

export default function App() {
  return (
    <Router>
      <Routes>

        {/* Home Route */}
        <Route path="/" element={<DBTAwarenessApp />} />

        {/* Awareness Route */}
        <Route path="/learn_the_difference" element={<Awareness_Screen />} />
        <Route path="/check_dbt_status" element={<Check_DBT_Status />} />
        <Route path="/help_center" element={<Help_Center />} />
        <Route path="/community" element={<Community />} />
        <Route path="/tools_and_resources" element={<Tools_And_Resources />} />
        <Route path="/call_chat_support" element={<Call_Chat_Support />} />
      </Routes>
    </Router>
  )
}
