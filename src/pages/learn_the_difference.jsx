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
  const [currentScreen, setCurrentScreen] = useState("awareness");
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


  const AwarenessScreen = () => {
  const languages = {
    en: "English",
    hin: "हिंदी",
    mar: "मराठी",
  };
  const [content, setContent] = useState(data.find(item => item.page === "learn_the_difference")[language])
  useEffect(() => {console.log(content)}, [content])

  const changeLang = (lang) => {
    console.log(lang);
    setLanguage(lang);
    i18n.changeLanguage(lang);
  };

  const [currentCard, setCurrentCard] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  // useEffect(() => {i18n.changeLanguage("mar")}, [])

  const comparisonCards = [
    {
      title: content[1][3],
      icon: <CreditCard className="w-12 h-12 text-orange-500" />,
      description: content[1][4],
      features: [
        content[1][5],
        content[1][6],
        content[1][7],
      ],
      status: content[1][8],
      statusColor: "text-red-600 bg-red-100",
    },
    {
      title: content[1][9],
      icon: <Shield className="w-12 h-12 text-green-500" />,
      description: content[1][10],
      features: [
        content[1][10],
        content[1][11],
        content[1][12],
      ],
      status: content[1][13],
      statusColor: "text-green-600 bg-green-100",
    },
  ];

  const steps = [
    {
      title: content[2][1],
      description:
       content[2][2],
      icon: <Building className="w-8 h-8 text-blue-600" />,
      completed: currentStep >= 0,
    },
    {
      title: content[2][3],
      description: content[2][4],
      icon: <Smartphone className="w-8 h-8 text-orange-600" />,
      completed: currentStep >= 1,
    },
    {
      title: content[2][5],
      description: content[2][6],
      icon: <CheckCircle className="w-8 h-8 text-green-600" />,
      completed: currentStep >= 2,
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          {content[0][0]}
        </h2>
        <p className="text-gray-600">
          {content[0][1]}
        </p>
      </div>

      {/* Interactive Comparison Cards */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-6">
          {content[1][0]}
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
            {content[1][1]}
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
            {content[1][2]}
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
              <h4 className="font-medium text-yellow-800">{content[2][7]}</h4>
              <p className="text-sm text-yellow-700 mt-1">
                {content[2][8]}
              </p>
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
        {currentScreen === "awareness" && <AwarenessScreen />}
      </main>
    </div>
  ) }

export default DBTAwarenessApp
