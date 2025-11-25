import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';

import "./index.css";

import global_en from "./locales/en/en.json";
import global_mar from "./locales/mar/mar.json";
import global_hin from "./locales/hin/hin.json";
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
// import { LanguageProvider } from "./context/LanguageContext.js";
i18next.init({
  interpolation: { escapeValue: false },
  lng: "en",
  resources: {
    en: {
      global: global_en,
    },
    mar: {
      global: global_mar,
    },
    hin: {
      global: global_hin,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <LanguageProvider> */}
    <I18nextProvider i18n={i18next}>
      <App />
    </I18nextProvider>
    {/* </LanguageProvider> */}
  </StrictMode>
);
