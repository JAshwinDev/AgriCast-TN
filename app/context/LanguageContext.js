'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language');
    if (savedLanguage) {
      setLanguage(savedLanguage);
    }
  }, []);

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'hi' : language === 'hi' ? 'ta' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
  };

  const getLanguageName = (lang) => {
    const names = { en: 'English', hi: 'हिन्दी', ta: 'தமிழ்' };
    return names[lang] || 'English';
  };

  const getFontClass = (level) => {
    const fontClasses = {
      1: 'text-3xl font-bold',
      2: 'text-2xl font-semibold',
      3: 'text-xl font-medium',
    };
    return fontClasses[level] || 'text-base';
  };

  return (
    <LanguageContext.Provider value={{
      language,
      toggleLanguage,
      getLanguageName,
      getFontClass
    }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}