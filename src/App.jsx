import React, { useState, useEffect } from "react";
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
} from "lucide-react";
import { useTranslation } from "react-i18next";

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
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [t, i18n] = useTranslation("global");
  const [currentScreen, setCurrentScreen] = useState("home");
  const [language, setLanguage] = useState("english");
  const [showNotification, setShowNotification] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Authentication handlers
  const handleLogin = (user) => {
    setIsAuthenticated(true);
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

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

  // Show login screen if not authenticated
  if (!isAuthenticated) {
    return <AuthScreen onLogin={handleLogin} />;
  }

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
                  {currentUser?.username || "User"}
                </span>
              </div>

              <select
                value={language}
                onChange={(e) => changeLang(e.target.value)}
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
              {Object.entries(screens).map(([key, value]) => (
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
              ))}
            </div>
          )}
        </div>
      </header>

      {/* Navigation */}
      <nav className="hidden md:block bg-white border-b">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex space-x-8">
            {Object.entries(screens).map(([key, value]) => (
              <button
                key={key}
                onClick={() => setCurrentScreen(key)}
                className={`py-4 px-2 border-b-2 transition-colors ${
                  currentScreen === key
                    ? "border-blue-500 text-blue-600 font-medium"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                {value}
              </button>
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
        {currentScreen === "awareness" && <AwarenessScreen />}
        {currentScreen === "check" && <CheckScreen />}
        {currentScreen === "chatbot" && <ChatbotScreen />}
        {currentScreen === "community" && <CommunityScreen />}
        {currentScreen === "tools" && <ToolsScreen />}
        {currentScreen === "contact" && <ContactScreen />} {/* Add this line */}
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

// Home Screen Component
const HomeScreen = ({ setCurrentScreen }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [t, i18n] = useTranslation("global");

  const infoSlides = [
    {
      icon: <AlertCircle className="w-8 h-8 text-red-500" />,
      title: t("home.quickinfo.info1.title"),
      content: t("home.quickinfo.info1.component"),
      description: t("home.quickinfo.info1.description"),
    },
    {
      icon: <CreditCard className="w-8 h-8 text-orange-500" />,
      title: t("home.quickinfo.info2.title"),
      content: t("home.quickinfo.info2.component"),
      description: t("home.quickinfo.info2.description"),
    },
    {
      icon: <Building className="w-8 h-8 text-green-500" />,
      title: t("home.quickinfo.info3.title"),
      content: t("home.quickinfo.info3.component"),
      description: t("home.quickinfo.info3.description"),
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
          {t("home.title")}
        </h1>
        {/* <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Secure Your Scholarship
        </h1> */}
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          {t("home.subtitle")}
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
            {t("home.main.check_dbt_status.main_line")}
          </h3>
          <p className="text-blue-100">
            {" "}
            {t("home.main.check_dbt_status.sub_line")}
          </p>
          {/* <p className="text-blue-100">Verify if your account is DBT-enabled</p> */}
        </button>

        <button
          onClick={() => setCurrentScreen("awareness")}
          className="bg-gradient-to-r from-green-600 to-green-700 text-white p-8 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
        >
          <BookOpen className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">
            {" "}
            {t("home.main.learn_the_difference.main_line")}
          </h3>
          {/* <h3 className="text-xl font-bold mb-2">Learn the Difference</h3> */}
          <p className="text-green-100">
            {t("home.main.learn_the_difference.sub_line")}
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
            {t("home.quickinfo.title")}
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
            {t("home.footer.helpcenter")}
          </span>
        </button>

        <button
          onClick={() => setCurrentScreen("tools")}
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          <Download className="w-8 h-8 text-green-600 mx-auto mb-2" />
          {/* <span className="text-sm font-medium text-gray-800">Resources</span> */}
          <span className="text-sm font-medium text-gray-800">
            {t("home.footer.toolsandresources")}
          </span>
        </button>

        <button
          onClick={() => setCurrentScreen("community")}
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
        >
          <Users className="w-8 h-8 text-purple-600 mx-auto mb-2" />
          <span className="text-sm font-medium text-gray-800">
            {t("home.footer.community")}
          </span>
          {/* <span className="text-sm font-medium text-gray-800">Community</span> */}
        </button>

        <button className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
          <PhoneCall className="w-8 h-8 text-orange-600 mx-auto mb-2" />
          <span className="text-sm font-medium text-gray-800">
            {t("home.footer.contact")}
          </span>
          {/* <span className="text-sm font-medium text-gray-800">Contact</span> */}
        </button>
      </div>
    </div>
  );
};

// Awareness Screen Component
const AwarenessScreen = () => {
  const [t, i18n] = useTranslation("global");
  const [currentCard, setCurrentCard] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const comparisonCards = [
    {
      title: "Aadhaar Linked Account",
      icon: <CreditCard className="w-12 h-12 text-orange-500" />,
      description: "Your Aadhaar is connected to your bank account",
      features: [
        "Basic KYC completed",
        "Can do banking operations",
        "But cannot receive government benefits directly",
      ],
      status: "Not Sufficient",
      statusColor: "text-red-600 bg-red-100",
    },
    {
      title: "DBT-Enabled Account",
      icon: <Shield className="w-12 h-12 text-green-500" />,
      description: "Your account can receive Direct Benefit Transfers",
      features: [
        "Aadhaar seeded in NPCI system",
        "Can receive scholarships directly",
        "Government benefits transfer smoothly",
      ],
      status: "Ready for Benefits",
      statusColor: "text-green-600 bg-green-100",
    },
  ];

  const steps = [
    {
      title: "Link Aadhaar with Bank",
      description:
        "Visit your bank branch or use net banking to link your Aadhaar",
      icon: <Building className="w-8 h-8 text-blue-600" />,
      completed: currentStep >= 0,
    },
    {
      title: "Seed Aadhaar in DBT System",
      description: "Bank will register your Aadhaar in NPCI's DBT database",
      icon: <Smartphone className="w-8 h-8 text-orange-600" />,
      completed: currentStep >= 1,
    },
    {
      title: "Confirm DBT Status",
      description: "Verify your account is DBT-enabled through NPCI portal",
      icon: <CheckCircle className="w-8 h-8 text-green-600" />,
      completed: currentStep >= 2,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Understanding the Difference
        </h2>
        <p className="text-gray-600">
          Learn why DBT-enabling is crucial for receiving scholarships
        </p>
      </div>

      {/* Interactive Comparison Cards */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          Compare Account Types
        </h3>

        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setCurrentCard(0)}
            className={`px-4 py-2 rounded-lg ${
              currentCard === 0
                ? "bg-orange-100 text-orange-700"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            Aadhaar Linked
          </button>
          <ArrowRight className="w-6 h-6 text-gray-400" />
          <button
            onClick={() => setCurrentCard(1)}
            className={`px-4 py-2 rounded-lg ${
              currentCard === 1
                ? "bg-green-100 text-green-700"
                : "text-gray-600 hover:bg-gray-100"
            }`}
          >
            DBT-Enabled
          </button>
        </div>

        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-xl p-6">
          <div className="text-center mb-4">
            {comparisonCards[currentCard].icon}
          </div>
          <h4 className="text-xl font-bold text-gray-900 mb-2 text-center">
            {comparisonCards[currentCard].title}
          </h4>
          <p className="text-gray-600 mb-4 text-center">
            {comparisonCards[currentCard].description}
          </p>

          <div className="space-y-2 mb-4">
            {comparisonCards[currentCard].features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <span className="text-sm text-gray-700">{feature}</span>
              </div>
            ))}
          </div>

          <div
            className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${comparisonCards[currentCard].statusColor}`}
          >
            {comparisonCards[currentCard].status}
          </div>
        </div>
      </div>

      {/* Step-by-Step Guide */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          How to Enable DBT
        </h3>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className={`flex items-start space-x-4 p-4 rounded-xl cursor-pointer transition-all ${
                currentStep === index
                  ? "bg-blue-50 border-2 border-blue-200"
                  : "hover:bg-gray-50"
              }`}
              onClick={() => setCurrentStep(index)}
            >
              <div
                className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                  step.completed ? "bg-green-100" : "bg-gray-100"
                }`}
              >
                {step.completed ? (
                  <CheckCircle className="w-6 h-6 text-green-600" />
                ) : (
                  <span className="text-gray-600 font-medium">{index + 1}</span>
                )}
              </div>

              <div className="flex-grow">
                <h4 className="font-semibold text-gray-900 mb-1">
                  {step.title}
                </h4>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>

              {step.icon}
            </div>
          ))}
        </div>

        <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-800">Important Note</h4>
              <p className="text-sm text-yellow-700 mt-1">
                DBT seeding can take 24-48 hours to complete. Always verify your
                status before scholarship deadlines.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Check Screen Component
const CheckScreen = () => {
  const [t, i18n] = useTranslation("global");
  const [checkType, setCheckType] = useState("aadhaar");
  const [inputValue, setInputValue] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheck = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const isEnabled = Math.random() > 0.5;
      setResult({
        isEnabled,
        account: inputValue,
        bank: "State Bank of India",
        lastUpdated: "2 days ago",
      });
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {t("checkscreen.title")}
        </h2>
        {/* <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Check Your DBT Status
        </h2> */}
        <p className="text-gray-600">{t("checkscreen.subtitle")}</p>
        {/* <p className="text-gray-600">
          Verify if your bank account can receive Direct Benefit Transfers
        </p> */}
      </div>

      {/* Input Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          {t("checkscreen.enter_details")}
        </h3>
        {/* <h3 className="text-lg font-semibold text-gray-800 mb-6">
          Enter Your Details
        </h3> */}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t("checkscreen.checkusing")}
            </label>
            {/* <label className="block text-sm font-medium text-gray-700 mb-2">
              Check using:
            </label> */}
            <div className="flex space-x-4">
              <button
                onClick={() => setCheckType("aadhaar")}
                className={`px-4 py-2 rounded-lg border ${
                  checkType === "aadhaar"
                    ? "bg-blue-100 border-blue-500 text-blue-700"
                    : "border-gray-300 text-gray-700"
                }`}
              >
                {t("checkscreen.aadhar")}
              </button>
              <button
                onClick={() => setCheckType("account")}
                className={`px-4 py-2 rounded-lg border ${
                  checkType === "account"
                    ? "bg-blue-100 border-blue-500 text-blue-700"
                    : "border-gray-300 text-gray-700"
                }`}
              >
                {t("checkscreen.account")}
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {checkType === "aadhaar"
                ? t("checkscreen.aadhar")
                : t("checkscreen.account")}
            </label>
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder={
                checkType === "aadhaar" ? "1234 5678 9012" : "1234567890123456"
              }
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          <button
            onClick={handleCheck}
            disabled={!inputValue || loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? t("checkscreen.buttonpressed") : t("checkscreen.button")}
          </button>
        </div>
      </div>

      {/* Results Section */}
      {result && (
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-6">
            {t("checkscreen.resultsuccess.congo")}
          </h3>

          <div
            className={`rounded-xl p-6 ${
              result.isEnabled
                ? "bg-green-50 border-2 border-green-200"
                : "bg-red-50 border-2 border-red-200"
            }`}
          >
            <div className="flex items-start space-x-4">
              {result.isEnabled ? (
                <CheckCircle className="w-12 h-12 text-green-600" />
              ) : (
                <AlertCircle className="w-12 h-12 text-red-600" />
              )}

              <div className="flex-grow">
                <h4
                  className={`text-xl font-bold mb-2 ${
                    result.isEnabled ? "text-green-800" : "text-red-800"
                  }`}
                >
                  {result.isEnabled
                    ? t("checkscreen.resultsuccess.congo")
                    : t("checkscreen.resultfailure.failure")}
                </h4>

                <p
                  className={`mb-4 ${
                    result.isEnabled ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {result.isEnabled
                    ? t("checkscreen.resultsuccess.subline")
                    : t("checkscreen.resultfailure.subline")}
                </p>

                <div className="text-sm text-gray-600 space-y-1">
                  <p>
                    <strong>{t("checkscreen.resultsuccess.bank")}</strong>{" "}
                    {result.bank}
                  </p>
                  <p>
                    <strong>
                      {t("checkscreen.resultsuccess.lastupdated")}
                    </strong>{" "}
                    {result.lastUpdated}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {!result.isEnabled && (
            <div className="mt-6">
              <h4 className="font-semibold text-gray-800 mb-3">
                {t("checkscreen.resultfailure.howtoenable")}
              </h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    1
                  </span>
                  <span className="text-sm text-gray-700">
                    {t("checkscreen.resultfailure.step1")}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    2
                  </span>
                  <span className="text-sm text-gray-700">
                    {t("checkscreen.resultfailure.step2")}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    3
                  </span>
                  <span className="text-sm text-gray-700">
                    {t("checkscreen.resultfailure.step3")}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                    4
                  </span>
                  <span className="text-sm text-gray-700">
                    {t("checkscreen.resultfailure.step4")}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Help Section */}
      <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6">
        <h4 className="font-semibold text-yellow-800 mb-2">Need Help?</h4>
        <p className="text-sm text-yellow-700 mb-4">
          If you're having trouble checking your status or need assistance with
          DBT seeding:
        </p>
        <div className="flex space-x-4">
          <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-700">
            Contact Bank
          </button>
          <button className="bg-yellow-100 text-yellow-800 border border-yellow-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-200">
            Visit Help Center
          </button>
        </div>
      </div>
    </div>
  );
};

// Chatbot Screen Component
const ChatbotScreen = () => {
  const [t, i18n] = useTranslation("global");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);

  const categories = [
    {
      id: "what-is-dbt",
      title: "What is DBT?",
      icon: <HelpCircle className="w-6 h-6 text-blue-600" />,
      description: "Learn about Direct Benefit Transfer",
    },
    {
      id: "difference",
      title: "Aadhaar vs DBT-enabled",
      icon: <AlertCircle className="w-6 h-6 text-orange-600" />,
      description: "Understand the key differences",
    },
    {
      id: "enable-dbt",
      title: "How to enable DBT?",
      icon: <CheckCircle className="w-6 h-6 text-green-600" />,
      description: "Steps to activate DBT in your bank",
    },
    {
      id: "scholarship",
      title: "Check scholarship status",
      icon: <Award className="w-6 h-6 text-purple-600" />,
      description: "Track your scholarship application",
    },
  ];

  const responses = {
    "what-is-dbt": {
      title: "What is Direct Benefit Transfer (DBT)?",
      content:
        "DBT is a system that allows government to transfer subsidies and benefits directly to beneficiaries' bank accounts. It eliminates intermediaries and ensures transparent, efficient delivery of government schemes.",
      options: ["How does DBT work?", "Benefits of DBT", "Go back to menu"],
    },
    difference: {
      title: "Aadhaar Linked vs DBT-enabled Account",
      content:
        "Aadhaar linked account means your Aadhaar is connected to your bank account for KYC. DBT-enabled means your account can receive government benefits directly. You need both - Aadhaar linking AND DBT seeding.",
      options: [
        "Why do I need both?",
        "How to check DBT status?",
        "Go back to menu",
      ],
    },
    "enable-dbt": {
      title: "How to Enable DBT in Your Bank Account",
      content:
        "1. Visit your bank branch with original Aadhaar card\n2. Fill DBT seeding form\n3. Bank will register your account in NPCI database\n4. Wait 24-48 hours for activation\n5. Verify status online",
      options: [
        "Which documents needed?",
        "How long does it take?",
        "Go back to menu",
      ],
    },
    scholarship: {
      title: "Check Your Scholarship Status",
      content:
        "To check scholarship status:\n1. Visit the official scholarship portal\n2. Login with your credentials\n3. Check application status\n4. Ensure your bank account is DBT-enabled\n5. Contact your institution if issues persist",
      options: [
        "My scholarship is delayed",
        "DBT status shows inactive",
        "Go back to menu",
      ],
    },
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setChatHistory([
      {
        type: "bot",
        content: responses[categoryId],
      },
    ]);
  };

  const handleOptionSelect = (option) => {
    if (option === "Go back to menu") {
      setSelectedCategory(null);
      setChatHistory([]);
      return;
    }

    setChatHistory((prev) => [
      ...prev,
      { type: "user", content: option },
      {
        type: "bot",
        content: {
          title: "More Information",
          content:
            "For detailed assistance with this topic, please contact your bank or visit our resources section.",
          options: ["Contact Bank", "View Resources", "Go back to menu"],
        },
      },
    ]);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Help Center</h2>
        <p className="text-gray-600">
          Get instant answers to common DBT questions
        </p>
      </div>

      {!selectedCategory ? (
        /* Category Selection */
        <div className="grid md:grid-cols-2 gap-4">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategorySelect(category.id)}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all text-left"
            >
              <div className="flex items-start space-x-4">
                {category.icon}
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {category.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        /* Chat Interface */
        <div className="bg-white rounded-2xl shadow-lg">
          <div className="border-b border-gray-200 p-4 flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">Help Assistant</h3>
            <button
              onClick={() => {
                setSelectedCategory(null);
                setChatHistory([]);
              }}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
            {chatHistory.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.type === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-xl ${
                    message.type === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 text-gray-900"
                  }`}
                >
                  {message.type === "user" ? (
                    <p className="text-sm">{message.content}</p>
                  ) : (
                    <div>
                      <h4 className="font-semibold mb-2">
                        {message.content.title}
                      </h4>
                      <p className="text-sm whitespace-pre-line mb-3">
                        {message.content.content}
                      </p>
                      <div className="space-y-1">
                        {message.content.options.map((option, optIndex) => (
                          <button
                            key={optIndex}
                            onClick={() => handleOptionSelect(option)}
                            className="block w-full text-left px-3 py-1 text-xs bg-blue-50 hover:bg-blue-100 rounded border"
                          >
                            {option}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <PhoneCall className="w-4 h-4" />
              <span>Need more help? Call your Gram Panchayat or Bank</span>
            </div>
          </div>
        </div>
      )}

      {/* Quick Contact */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <h4 className="font-semibold text-blue-800 mb-2">Still Need Help?</h4>
        <p className="text-sm text-blue-700 mb-4">
          Our automated assistant covers common questions. For personalized
          help:
        </p>
        <div className="flex space-x-4">
          <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
            <PhoneCall className="w-4 h-4 inline mr-2" />
            Call Helpline
          </button>
          <button className="bg-blue-100 text-blue-800 border border-blue-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-200">
            Submit Feedback
          </button>
        </div>
        <div className="mt-6">
          <iframe
            id="JotFormIFrame-0199702c8cdf7cb89b621623a2bf9f8c777d"
            title="DBT Verification Assistant: Customer Support Agent"
            allow="geolocation; microphone; camera; fullscreen"
            src="https://agent.jotform.com/0199702c8cdf7cb89b621623a2bf9f8c777d?embedMode=iframe&background=1&shadow=1"
            frameBorder="0"
            style={{
              maxWidth: "100%",
              height: "600px",
              border: "none",
              width: "100%",
              borderRadius: "12px",
            }}
            scrolling="no"
          ></iframe>
        </div>
      </div>
    </div>
  );
};

// Community Screen Component
const CommunityScreen = () => {
  const [t, i18n] = useTranslation("global");
  const [activeTab, setActiveTab] = useState("quiz");
  const [quizScore, setQuizScore] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});

  const quizQuestions = [
    {
      question: "What does DBT stand for?",
      options: [
        "Direct Bank Transfer",
        "Direct Benefit Transfer",
        "Digital Banking Technology",
      ],
      correct: 1,
    },
    {
      question: "Is Aadhaar linking the same as DBT enabling?",
      options: [
        "Yes, they are the same",
        "No, DBT requires additional seeding",
        "Only for government banks",
      ],
      correct: 1,
    },
    {
      question: "How long does DBT seeding typically take?",
      options: ["Immediate", "24-48 hours", "1 week"],
      correct: 1,
    },
  ];

  const leaderboard = [
    {
      rank: 1,
      school: "Government High School, Nagpur",
      score: 98,
      students: 245,
    },
    {
      rank: 2,
      school: "Zilla Parishad School, Wardha",
      score: 95,
      students: 189,
    },
    { rank: 3, school: "Municipal School, Akola", score: 92, students: 156 },
    {
      rank: 4,
      school: "Government School, Amravati",
      score: 89,
      students: 203,
    },
    { rank: 5, school: "District School, Yavatmal", score: 85, students: 134 },
  ];

  const handleAnswer = (answerIndex) => {
    const newAnswers = { ...userAnswers, [currentQuestion]: answerIndex };
    setUserAnswers(newAnswers);

    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Calculate score
      const score = Object.entries(newAnswers).reduce(
        (total, [qIndex, answer]) => {
          return total + (quizQuestions[qIndex].correct === answer ? 1 : 0);
        },
        0
      );
      setQuizScore(Math.round((score / quizQuestions.length) * 100));
    }
  };

  const resetQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers({});
    setQuizScore(null);
  };

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Community Engagement
        </h2>
        <p className="text-gray-600">Learn together, achieve together</p>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-2xl shadow-lg">
        <div className="border-b border-gray-200">
          <div className="flex space-x-8 px-6">
            {[
              {
                id: "quiz",
                label: "Knowledge Quiz",
                icon: <Award className="w-5 h-5" />,
              },
              {
                id: "leaderboard",
                label: "School Leaderboard",
                icon: <Trophy className="w-5 h-5" />,
              },
              {
                id: "feedback",
                label: "Get Help",
                icon: <MessageCircle className="w-5 h-5" />,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-2 border-b-2 transition-colors flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? "border-blue-500 text-blue-600 font-medium"
                    : "border-transparent text-gray-600 hover:text-gray-900"
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {activeTab === "quiz" && (
            <div>
              {quizScore === null ? (
                <div>
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold">
                        DBT Knowledge Quiz
                      </h3>
                      <span className="text-sm text-gray-500">
                        Question {currentQuestion + 1} of {quizQuestions.length}
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{
                          width: `${
                            ((currentQuestion + 1) / quizQuestions.length) * 100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="text-xl font-semibold text-gray-900 mb-6">
                      {quizQuestions[currentQuestion].question}
                    </h4>

                    <div className="space-y-3">
                      {quizQuestions[currentQuestion].options.map(
                        (option, index) => (
                          <button
                            key={index}
                            onClick={() => handleAnswer(index)}
                            className="w-full text-left p-4 bg-white border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
                          >
                            <div className="flex items-center space-x-3">
                              <span className="w-6 h-6 border-2 border-gray-300 rounded-full flex items-center justify-center text-sm font-medium">
                                {String.fromCharCode(65 + index)}
                              </span>
                              <span>{option}</span>
                            </div>
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                /* Quiz Results */
                <div className="text-center">
                  <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <Trophy className="w-12 h-12 text-white" />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    Quiz Complete!
                  </h3>
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {quizScore}%
                  </div>
                  <p className="text-gray-600 mb-6">
                    {quizScore >= 80
                      ? "Excellent! You understand DBT very well."
                      : quizScore >= 60
                      ? "Good job! Consider reviewing the learning materials."
                      : "Keep learning! Visit our awareness section for more information."}
                  </p>

                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={resetQuiz}
                      className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700"
                    >
                      Retake Quiz
                    </button>
                    <button className="bg-gray-100 text-gray-800 px-6 py-2 rounded-lg font-medium hover:bg-gray-200">
                      Share Score
                    </button>
                  </div>

                  {quizScore >= 80 && (
                    <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-800">
                        🎉 Congratulations!
                      </h4>
                      <p className="text-sm text-green-700">
                        You've earned the DBT Expert badge!
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {activeTab === "leaderboard" && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                School Participation Leaderboard
              </h3>
              <div className="space-y-3">
                {leaderboard.map((school) => (
                  <div
                    key={school.rank}
                    className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                          school.rank === 1
                            ? "bg-yellow-100 text-yellow-800"
                            : school.rank === 2
                            ? "bg-gray-100 text-gray-800"
                            : school.rank === 3
                            ? "bg-orange-100 text-orange-800"
                            : "bg-blue-100 text-blue-800"
                        }`}
                      >
                        {school.rank}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {school.school}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {school.students} students participated
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">
                        {school.score}%
                      </div>
                      <div className="text-xs text-gray-500">avg score</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-semibold text-blue-800 mb-2">
                  🏆 Monthly Challenge
                </h4>
                <p className="text-sm text-blue-700">
                  Top 3 schools will receive DBT awareness kits and certificates
                  this month!
                </p>
              </div>
            </div>
          )}

          {activeTab === "feedback" && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">
                Get Help with DBT
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    What do you need help with?
                  </label>
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
                    <option>Select your issue...</option>
                    <option>DBT seeding not working</option>
                    <option>Bank account not linked</option>
                    <option>Scholarship payment delayed</option>
                    <option>Don't understand the process</option>
                    <option>Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Describe your problem
                  </label>
                  <textarea
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    rows="4"
                    placeholder="Please describe your issue in detail..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your contact number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    placeholder="+91 9876543210"
                  />
                </div>

                <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700">
                  Submit Request
                </button>
              </div>

              <div className="mt-6 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-semibold text-yellow-800 mb-2">
                  📱 Instant Help
                </h4>
                <p className="text-sm text-yellow-700 mb-3">
                  For immediate assistance, you can also:
                </p>
                <div className="flex space-x-4">
                  <button className="bg-yellow-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-700">
                    Call Gram Panchayat
                  </button>
                  <button className="bg-yellow-100 text-yellow-800 border border-yellow-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-yellow-200">
                    WhatsApp Support
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Tools Screen Component
const ToolsScreen = () => {
  const [t, i18n] = useTranslation("global");
  const [selectedTool, setSelectedTool] = useState(null);

  const tools = [
    {
      id: "infographics",
      title: "Infographic Library",
      icon: <Download className="w-8 h-8 text-blue-600" />,
      description: "Download posters and infographics in multiple languages",
      items: [
        "DBT vs Aadhaar Link Comparison Chart",
        "Step-by-Step DBT Enabling Guide",
        "Common Problems and Solutions",
        "Scholarship Timeline Infographic",
      ],
    },
    {
      id: "videos",
      title: "Educational Videos",
      icon: <Play className="w-8 h-8 text-red-600" />,
      description: "Short animated videos explaining DBT concepts",
      items: [
        "What is DBT? (60 seconds)",
        "How to Enable DBT in Your Bank",
        "Why Scholarships Get Delayed",
        "Success Stories from Students",
      ],
    },
    {
      id: "documents",
      title: "Documents & Forms",
      icon: <Download className="w-8 h-8 text-green-600" />,
      description: "Download required forms and documents",
      items: [
        "DBT Seeding Application Form",
        "Aadhaar Bank Linking Form",
        "Scholarship Status Check Guide",
        "Bank Contact Directory",
      ],
    },
    {
      id: "faqs",
      title: "FAQ Collection",
      icon: <HelpCircle className="w-8 h-8 text-purple-600" />,
      description: "Comprehensive Q&A in regional languages",
      items: [
        "Top 20 DBT Questions",
        "Bank-specific FAQs",
        "Troubleshooting Guide",
        "Government Scheme Updates",
      ],
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Tools & Resources
        </h2>
        <p className="text-gray-600">
          Download materials to spread DBT awareness in your community
        </p>
      </div>

      {!selectedTool ? (
        <div className="grid md:grid-cols-2 gap-6">
          {tools.map((tool) => (
            <div
              key={tool.id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="text-center mb-4">{tool.icon}</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">
                {tool.title}
              </h3>
              <p className="text-gray-600 mb-4">{tool.description}</p>
              <button
                onClick={() => setSelectedTool(tool)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700"
              >
                View Resources
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg">
          <div className="border-b border-gray-200 p-6 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {selectedTool.icon}
              <h3 className="text-xl font-bold text-gray-900">
                {selectedTool.title}
              </h3>
            </div>
            <button
              onClick={() => setSelectedTool(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6">
            <p className="text-gray-600 mb-6">{selectedTool.description}</p>

            <div className="space-y-3">
              {selectedTool.items.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <Download className="w-5 h-5 text-gray-600" />
                    <span className="font-medium text-gray-900">{item}</span>
                  </div>
                  <div className="flex space-x-2">
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">
                      Download
                    </button>
                    <button className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200">
                      Preview
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2">
                📄 Usage Guidelines
              </h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>
                  • All materials are free for educational and awareness
                  purposes
                </li>
                <li>
                  • Share with schools, communities, and local organizations
                </li>
                <li>• Print in high quality for better readability</li>
                <li>
                  • Contact us for custom materials in your local language
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* Offline Mode Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
        <h4 className="font-semibold text-blue-800 mb-2">
          📱 Offline Mode Available
        </h4>
        <p className="text-sm text-blue-700 mb-4">
          Download the complete awareness kit to access all materials offline -
          perfect for areas with limited internet connectivity.
        </p>
        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700">
          Download Offline Kit (25 MB)
        </button>
      </div>
    </div>
  );
};

const ContactScreen = () => {
  const [t, i18n] = useTranslation("global");

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Contact & Helpline
        </h2>
        <p className="text-gray-600">
          Get instant support through our helpline or WhatsApp
        </p>
      </div>

      {/* Main Contact Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Helpline IVR Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <PhoneCall className="w-10 h-10 text-blue-600" />
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2">
              Helpline (IVR)
            </h3>
            <p className="text-gray-600 text-sm mb-6">
              24/7 Automated Voice Support
            </p>

            <div className="bg-blue-50 rounded-xl p-6 mb-6">
              <p className="text-gray-600 text-sm mb-2">Toll-Free Number</p>
              <a
                href="tel:12187577504"
                className="text-3xl font-bold text-blue-600 hover:text-blue-700"
              >
                +1 218 757 7504
              </a>
            </div>

            <a
              href="tel:1 218 757 7504"
              className="block w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Call Now
            </a>

            {/* <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-3 text-sm">
                IVR Menu Options:
              </h4>
              <ul className="text-sm text-gray-600 space-y-2 text-left">
                <li>• Press 1 - Check DBT Status</li>
                <li>• Press 2 - Enable DBT Guide</li>
                <li>• Press 3 - Scholarship Information</li>
                <li>• Press 4 - Speak to Officer</li>
              </ul>
            </div> */}
          </div>
        </div>

        {/* WhatsApp Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <MessageCircle className="w-10 h-10 text-green-600" />
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-2">
              WhatsApp Bot
            </h3>
            <p className="text-gray-600 text-sm mb-6">
              Instant Chat Support with AI Bot
            </p>

            <div className="bg-green-50 rounded-xl p-6 mb-6">
              <p className="text-gray-600 text-sm mb-2">WhatsApp Number</p>
              <a
                href="https://wa.me/14155238886"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl font-bold text-green-600 hover:text-green-700"
              >
                +1 415 523 8886
              </a>
              <br />
              <p className="text-gray-600 text-sm mb-2">
                Type 1st message as : <strong>join selection-buried</strong>
              </p>
            </div>

            {/* QR Code */}
            <div className="bg-white border-2 border-green-200 rounded-xl p-4 mb-6 inline-block">
              <div className="w-40 h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                {/* Replace this div with actual QR code image */}
                <div className="text-center">
                  <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-green-600 rounded-lg flex items-center justify-center mb-2">
                    {/* <MessageCircle className="w-16 h-16 text-white" /> */}
                    <img className="w-full h-full" src="wa_qr.jpg" />
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">Scan to chat</p>
            </div>

            <a
              href="https://wa.me/14155238886"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-green-600 text-white py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
            >
              Chat on WhatsApp
            </a>

            {/* <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="font-semibold text-gray-800 mb-3 text-sm">
                Bot Features:
              </h4>
              <ul className="text-sm text-gray-600 space-y-2 text-left">
                <li>• Instant DBT status check</li>
                <li>• Step-by-step guidance</li>
                <li>• Multilingual support</li>
                <li>• Document sharing</li>
              </ul>
            </div> */}
          </div>
        </div>
      </div>

      {/* Additional Information */}
      <div className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-6">
        <div className="flex items-start space-x-4">
          <AlertCircle className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Support Timings
            </h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <p className="font-medium">IVR Helpline:</p>
                <p>Available 24/7 (Automated)</p>
                <p className="text-xs text-gray-600 mt-1">
                  Officer support: Mon-Fri, 9 AM - 6 PM
                </p>
              </div>
              <div>
                <p className="font-medium">WhatsApp Bot:</p>
                <p>Available 24/7 (Instant replies)</p>
                <p className="text-xs text-gray-600 mt-1">
                  Average response time: Under 1 minute
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contact */}
      <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">
        <div className="flex items-start space-x-4">
          <Bell className="w-6 h-6 text-orange-600 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-semibold text-orange-900 mb-2">
              Urgent Scholarship Issues?
            </h4>
            <p className="text-sm text-orange-800 mb-4">
              If your scholarship is delayed and deadline is approaching,
              contact your nearest:
            </p>
            <div className="flex flex-wrap gap-3">
              <button className="bg-orange-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-700">
                Gram Panchayat Office
              </button>
              <button className="bg-orange-100 text-orange-800 border border-orange-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-200">
                District Education Office
              </button>
              <button className="bg-orange-100 text-orange-800 border border-orange-300 px-4 py-2 rounded-lg text-sm font-medium hover:bg-orange-200">
                Bank Branch
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DBTAwarenessApp;
