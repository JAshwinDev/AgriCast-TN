'use client';
import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';
import SearchBar from '../components/SearchBar';
import WeatherCard from '../components/WeatherCard';
import CropInfo from '../components/CropInfo';
import AgricultureTips from '../components/AgricultureTips';

export default function Dashboard() {
  const [selectedCity, setSelectedCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { language, toggleLanguage, getLanguageName } = useLanguage();
  const t = translations[language];

  // Add the getFontClass function inside the component
  const getFontClass = (level) => {
    const fontClasses = {
      1: 'text-3xl font-bold',
      2: 'text-2xl font-semibold',
      3: 'text-xl font-medium',
    };
    return fontClasses[level] || 'text-base';
  };

  const handleCitySelect = async (city) => {
    setSelectedCity(city);
    setLoading(true);
    
    try {
      // Use a free weather API directly (no backend needed)
      // Using OpenWeatherMap - you can get a free API key from https://openweathermap.org/api
      const API_KEY = 'demo'; // Replace with your actual API key for production
      
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)},in&appid=${API_KEY}&units=metric`
      );
      
      if (response.ok) {
        const data = await response.json();
        setWeatherData(data);
      } else {
        // Fallback demo data if API fails
        console.log('Using demo weather data');
        setWeatherData({
          main: { 
            temp: Math.round(20 + Math.random() * 15), // Random temp between 20-35°C
            humidity: Math.round(40 + Math.random() * 40), // Random humidity 40-80%
            pressure: 1013
          },
          weather: [{ 
            description: ['Sunny', 'Partly cloudy', 'Cloudy', 'Clear'][Math.floor(Math.random() * 4)],
            main: 'Clear',
            icon: '01d'
          }],
          wind: { 
            speed: Math.round(1 + Math.random() * 10) // Random wind speed 1-10 km/h
          },
          name: city,
          visibility: 10000
        });
      }
    } catch (error) {
      console.error('Error fetching weather:', error);
      // Fallback demo data on error
      setWeatherData({
        main: { temp: 28, humidity: 65, pressure: 1013 },
        weather: [{ description: 'Sunny', main: 'Clear', icon: '01d' }],
        wind: { speed: 5 },
        name: city,
        visibility: 10000
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen">
      <header className="bg-green-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold text-lg">🌱</span>
              </div>
              <h1 className={`text-2xl font-bold ${getFontClass(1)}`}>
                {t.dashboard}
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className={`text-sm ${getFontClass(3)}`}>
                {selectedCity ? `${t.viewing}: ${selectedCity}` : t.selectCity}
              </div>
              
              <button
                onClick={toggleLanguage}
                className="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-lg transition-colors font-medium"
              >
                {getLanguageName(language === 'en' ? 'hi' : language === 'hi' ? 'ta' : 'en')}
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 space-y-6 pb-20">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className={`text-2xl font-bold text-gray-800 mb-4 ${getFontClass(2)}`}>
            {language === 'en' ? 'Search Indian Cities' : language === 'hi' ? 'भारतीय शहर खोजें' : 'இந்திய நகரங்களைத் தேடுங்கள்'}
          </h2>
          <SearchBar onCitySelect={handleCitySelect} loading={loading} />
        </div>

        {weatherData && (
          <WeatherCard weatherData={weatherData} city={selectedCity} />
        )}

        {selectedCity && (
          <CropInfo city={selectedCity} weatherData={weatherData} />
        )}

        {selectedCity && (
          <AgricultureTips city={selectedCity} weatherData={weatherData} />
        )}
      </main>
    </div>
  );
}