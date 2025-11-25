import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

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

export default ToolsScreen