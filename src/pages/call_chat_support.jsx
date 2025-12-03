import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, Link } from 'react-router-dom';
import data from '../lang/texts.json'

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

const Key_To_Screen = ["home", "awareness", "check", "chatbot", "community", "tools", "contact"]
const key_to_link = ["/", "/learn_the_difference", "/check_dbt_status", "/help_center", "/community", "/tools_and_resources", "/call_chat_support"]



const DBTAwarenessApp = () => {

  const [language, setLanguage] = useState(localStorage.getItem("lang"));
  const [isAuthenticated, setIsAuthenticated] = useState(true); //change
  const [currentUser, setCurrentUser] = useState(null);
  const [t, i18n] = useTranslation("global");
  const [currentScreen, setCurrentScreen] = useState("check");
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



  return(
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
        {<ContactScreen/>}
      </main>
    </div>
  ) }

export default DBTAwarenessApp












