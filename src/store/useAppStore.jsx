// src/store/useAppStore.js
import { create } from "zustand";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";
export const useAppStore = create((set) => ({
  language: i18n.language, // current language

  setLanguage: (lang) => {
    i18n.changeLanguage(lang);  // change i18next language globally
    set({ language: lang });    // update Zustand store
  },
}));
