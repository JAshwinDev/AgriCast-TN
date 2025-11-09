'use client';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

export default function WeatherCard({ weatherData, city }) {
  const { language } = useLanguage();
  const t = translations[language];

  // Safe data access with fallbacks
  const safeWeatherData = weatherData || {};
  
  // Handle both API structures
  const current = safeWeatherData.current || safeWeatherData.main ? {
    temp: safeWeatherData.main?.temp || 'N/A',
    humidity: safeWeatherData.main?.humidity || 'N/A',
    description: safeWeatherData.weather?.[0]?.description || 'No data',
    icon: safeWeatherData.weather?.[0]?.icon || '01d',
    wind_speed: safeWeatherData.wind?.speed || 'N/A',
    feels_like: safeWeatherData.main?.feels_like || safeWeatherData.main?.temp || 'N/A',
    pressure: safeWeatherData.main?.pressure || 'N/A'
  } : {};

  const forecast = safeWeatherData.forecast || [];

  const getWeatherIcon = (iconCode) => {
    if (!iconCode || iconCode === 'N/A') return '/weather-icon.png';
    return `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
  };

  const getAgricultureAdvice = (weather) => {
    if (!weather || !weather.temp || weather.temp === 'N/A') {
      return language === 'en' 
        ? "Weather data unavailable - check connection"
        : language === 'hi'
        ? "मौसम डेटा उपलब्ध नहीं - कनेक्शन जांचें"
        : "வானிலை தரவு கிடைக்கவில்லை - இணைப்பை சரிபார்க்கவும்";
    }

    const temp = typeof weather.temp === 'number' ? weather.temp : parseInt(weather.temp);
    const humidity = typeof weather.humidity === 'number' ? weather.humidity : parseInt(weather.humidity) || 50;
    const description = weather.description || '';

    if (temp > 35) {
      return language === 'en' 
        ? "High temperature - Consider irrigation and shade management"
        : language === 'hi'
        ? "उच्च तापमान - सिंचाई और छाया प्रबंधन पर विचार करें"
        : "அதிக வெப்பநிலை - பாசனம் மற்றும் நிழல் மேலாண்மை கவனிக்கவும்";
    } else if (temp < 10) {
      return language === 'en'
        ? "Low temperature - Protect crops from frost"
        : language === 'hi'
        ? "कम तापमान - फसलों को पाला से बचाएं"
        : "குறைந்த வெப்பநிலை - பனியில் இருந்து பயிர்களைப் பாதுகாக்கவும்";
    } else if (humidity > 80) {
      return language === 'en'
        ? "High humidity - Watch for fungal diseases"
        : language === 'hi'
        ? "उच्च आर्द्रता - फंगल रोगों पर नजर रखें"
        : "அதிக ஈரப்பதம் - பூஞ்சை நோய்களைக் கவனிக்கவும்";
    } else if (description.toLowerCase().includes('rain')) {
      return language === 'en'
        ? "Rainy conditions - Good for irrigation, avoid spraying"
        : language === 'hi'
        ? "बारिश की स्थिति - सिंचाई के लिए अच्छा, छिड़काव से बचें"
        : "மழை நிலை - பாசனத்திற்கு நல்லது, தெளிப்பதை தவிர்க்கவும்";
    } else {
      return language === 'en'
        ? "Favorable conditions for most crops"
        : language === 'hi'
        ? "अधिकांश फसलों के लिए अनुकूल परिस्थितियां"
        : "பெரும்பாலான பயிர்களுக்கு சாதகமான நிலை";
    }
  };

  // Get font class based on language
  const getFontClass = () => {
    if (language === 'hi') return 'hindi-font';
    if (language === 'ta') return 'tamil-font';
    return '';
  };

  // Don't render if no valid data
  if (!current || current.temp === 'N/A') {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <h2 className={`text-2xl font-bold text-gray-800 mb-4 ${getFontClass()}`}>
          {t.weatherIn} {city}
        </h2>
        <div className={`text-center py-8 text-gray-500 ${getFontClass()}`}>
          {t.weatherDataUnavailable || "Weather data not available"}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className={`text-2xl font-bold text-gray-800 mb-4 ${getFontClass()}`}>
        {t.weatherIn} {city}
      </h2>

      <div className="grid md:grid-cols-2 gap-6 mb-6">
        {/* Current Weather */}
        <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className={`text-lg font-semibold mb-2 ${getFontClass()}`}>
                {t.currentWeather}
              </h3>
              <div className="text-4xl font-bold mb-2">{current.temp}°C</div>
              <div className="capitalize">{current.description}</div>
            </div>
            <img 
              src={getWeatherIcon(current.icon)} 
              alt={current.description}
              className="w-20 h-20"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        </div>

        {/* Weather Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-green-50 rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">💧</div>
            <div className="font-bold text-gray-800">{current.humidity}%</div>
            <div className={`text-sm text-gray-600 ${getFontClass()}`}>
              {t.humidity}
            </div>
          </div>
          
          <div className="bg-green-50 rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">💨</div>
            <div className="font-bold text-gray-800">{current.wind_speed} m/s</div>
            <div className={`text-sm text-gray-600 ${getFontClass()}`}>
              {t.windSpeed}
            </div>
          </div>
          
          <div className="bg-green-50 rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">🌡️</div>
            <div className="font-bold text-gray-800">{current.feels_like}°C</div>
            <div className={`text-sm text-gray-600 ${getFontClass()}`}>
              {t.feelsLike}
            </div>
          </div>
          
          <div className="bg-green-50 rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">📊</div>
            <div className="font-bold text-gray-800">{current.pressure} hPa</div>
            <div className={`text-sm text-gray-600 ${getFontClass()}`}>
              {t.pressure}
            </div>
          </div>
        </div>
      </div>

      {/* Farming Advice */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-6">
        <h4 className={`font-semibold text-amber-800 mb-2 ${getFontClass()}`}>
          🌱 {t.farmingAdvice}
        </h4>
        <p className={`text-amber-700 ${getFontClass()}`}>
          {getAgricultureAdvice(current)}
        </p>
      </div>

      {/* Forecast - Only show if available */}
      {forecast.length > 0 && (
        <div>
          <h3 className={`text-lg font-semibold mb-4 ${getFontClass()}`}>
            5-{t.forecast}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {forecast.map((day, index) => (
              <div key={index} className="bg-gray-50 rounded-xl p-4 text-center">
                <div className={`font-medium text-gray-600 mb-2 ${getFontClass()}`}>
                  {new Date(day.dt * 1000).toLocaleDateString(
                    language === 'ta' ? 'ta-IN' : 
                    language === 'hi' ? 'hi-IN' : 'en-IN', 
                    { weekday: 'short' }
                  )}
                </div>
                <img 
                  src={getWeatherIcon(day.icon)} 
                  alt={day.description}
                  className="w-12 h-12 mx-auto mb-2"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
                <div className="font-bold text-gray-800">{day.temp}°C</div>
                <div className={`text-sm text-gray-600 capitalize ${getFontClass()}`}>
                  {day.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}