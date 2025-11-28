import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
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

 

const AwarenessScreen = () => {
  const [language, setLanguage] = useState("en");
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

export default AwarenessScreen;
