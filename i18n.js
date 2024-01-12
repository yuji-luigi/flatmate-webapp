// i18n.js

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // .use(Backend) // Load translations via http (e.g., from a server)
  .use(LanguageDetector) // Detect language from the browser
  .use(initReactI18next) // Pass the i18next instance to react-i18next
  .init({
    languages: ['en', 'it'],
    fallbackLng: 'en', // Use 'en' if the detected language is not available
    debug: false, // Set to false in production

    interpolation: {
      escapeValue: false, // Not needed for React as it escapes by default
    },

    // React-i18next options
    react: {
      wait: true, // Wait for translations to be loaded before rendering
    },
  });

export default i18n;
