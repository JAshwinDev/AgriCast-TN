'use client';
import { useRouter } from 'next/navigation';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { translations } from './utils/translations';

// Simple fallback component that doesn't use hooks
function LandingContent() {
  const router = useRouter();
  
  // Use the hook safely with null checks
  const languageContext = useLanguage();
  
  // Safe defaults if context is not available during build
  const language = languageContext?.language || 'en';
  const toggleLanguage = languageContext?.toggleLanguage || (() => {});
  const getLanguageName = languageContext?.getLanguageName || ((lang) => lang);
  const getFontClass = languageContext?.getFontClass || (() => '');
  
  const t = translations[language] || translations.en;

  const handleGetStarted = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50">
      <nav className="px-6 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">🌱</span>
            </div>
            <span className={`text-2xl font-bold text-green-800 ${getFontClass()}`}>
              Agricast
            </span>
          </div>
          <button
            onClick={toggleLanguage}
            className="bg-white border border-green-600 text-green-600 px-4 py-2 rounded-lg hover:bg-green-50 transition-colors font-medium"
          >
            {getLanguageName(language === 'en' ? 'hi' : language === 'hi' ? 'ta' : 'en')}
          </button>
        </div>
      </nav>

      <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className={`text-5xl md:text-6xl font-bold text-gray-900 mb-6 ${getFontClass()}`}>
            {t.welcome.split(' ')[0]}
            <span className="text-green-600 block">{t.welcome.split(' ').slice(1).join(' ')}</span>
          </h1>
          
          <p className={`text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed ${getFontClass()}`}>
            {t.tagline}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={handleGetStarted}
              className="bg-green-600 hover:bg-green-700 text-white font-semibold text-lg px-8 py-4 rounded-2xl shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
            >
              <span className={getFontClass()}>{t.getStarted}</span>
              <span>→</span>
            </button>
            
            <button className="border-2 border-green-600 text-green-600 hover:bg-green-50 font-semibold text-lg px-8 py-4 rounded-2xl transition-all duration-300">
              <span className={getFontClass()}>{t.learnMore}</span>
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: '🌤️', title: t.features.weather, desc: t.features.weatherDesc },
              { icon: '🌽', title: t.features.crops, desc: t.features.cropsDesc },
              { icon: '📊', title: t.features.insights, desc: t.features.insightsDesc }
            ].map((feature, index) => (
              <div key={index} className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-green-100">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className={`font-bold text-lg text-gray-900 mb-2 ${getFontClass()}`}>
                  {feature.title}
                </h3>
                <p className={`text-gray-600 ${getFontClass()}`}>
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <footer className={`text-center py-8 text-gray-600 ${getFontClass()}`}>
        <p>{t.footer}</p>
      </footer>
    </div>
  );
}

// Main component with safe provider
export default function LandingPage() {
  return (
    <LanguageProvider>
      <LandingContent />
    </LanguageProvider>
  );
}