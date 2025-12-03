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
const key_to_link = ["/", "/learn_the_difference", "/check_dbt_status", "/help_center", "/community", "/tools_and_resources", "call_chat_support"]



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
        {<CheckScreen />}
      </main>
    </div>
  ) }

export default DBTAwarenessApp



