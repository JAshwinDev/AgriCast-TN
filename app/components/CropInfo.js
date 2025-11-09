'use client';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

export default function CropInfo({ city, weatherData }) {
  const { language } = useLanguage();
  const t = translations[language] || translations.en;

  // Get font class based on language
  const getFontClass = () => {
    if (language === 'hi') return 'hindi-font';
    if (language === 'ta') return 'tamil-font';
    return '';
  };

  // Safe crop data access
  const getCropData = () => {
    const cropData = {
      en: {
        rice: { name: 'Rice', season: 'Kharif', planting: 'June-July', harvesting: 'Oct-Nov', temperature: '20-35°C', soil: 'Clay Loam' },
        wheat: { name: 'Wheat', season: 'Rabi', planting: 'Nov-Dec', harvesting: 'Mar-Apr', temperature: '15-25°C', soil: 'Loam' },
        maize: { name: 'Maize', season: 'Kharif/Rabi', planting: 'Jun-Jul/Oct-Nov', harvesting: 'Sep-Oct/Feb-Mar', temperature: '18-27°C', soil: 'Well-drained' },
        cotton: { name: 'Cotton', season: 'Kharif', planting: 'Jun-Jul', harvesting: 'Dec-Jan', temperature: '21-30°C', soil: 'Black Soil' },
        sugarcane: { name: 'Sugarcane', season: 'Year-round', planting: 'Feb-Mar/Oct-Nov', harvesting: 'Dec-Mar', temperature: '20-30°C', soil: 'Heavy Soil' }
      },
      hi: {
        rice: { name: 'चावल', season: 'खरीफ', planting: 'जून-जुलाई', harvesting: 'अक्टूबर-नवंबर', temperature: '20-35°C', soil: 'चिकनी दोमट' },
        wheat: { name: 'गेहूं', season: 'रबी', planting: 'नवंबर-दिसंबर', harvesting: 'मार्च-अप्रैल', temperature: '15-25°C', soil: 'दोमट' },
        maize: { name: 'मक्का', season: 'खरीफ/रबी', planting: 'जून-जुलाई/अक्टूबर-नवंबर', harvesting: 'सितंबर-अक्टूबर/फरवरी-मार्च', temperature: '18-27°C', soil: 'अच्छी जल निकासी' },
        cotton: { name: 'कपास', season: 'खरीफ', planting: 'जून-जुलाई', harvesting: 'दिसंबर-जनवरी', temperature: '21-30°C', soil: 'काली मिट्टी' },
        sugarcane: { name: 'गन्ना', season: 'साल भर', planting: 'फरवरी-मार्च/अक्टूबर-नवंबर', harvesting: 'दिसंबर-मार्च', temperature: '20-30°C', soil: 'भारी मिट्टी' }
      },
      ta: {
        rice: { name: 'நெல்', season: 'கரிப்', planting: 'ஜூன்-ஜூலை', harvesting: 'அக்டோபர்-நவம்பர்', temperature: '20-35°C', soil: 'களிமண் வண்டல்' },
        wheat: { name: 'கோதுமை', season: 'ரபி', planting: 'நவம்பர்-டிசம்பர்', harvesting: 'மார்ச்-ஏப்ரல்', temperature: '15-25°C', soil: 'வண்டல்' },
        maize: { name: 'சோளம்', season: 'கரிப்/ரபி', planting: 'ஜூன்-ஜூலை/அக்டோ-நவம்', harvesting: 'செப்-அக்டோ/பிப்-மார்', temperature: '18-27°C', soil: 'நீர் வடிகால்' },
        cotton: { name: 'பருத்தி', season: 'கரிப்', planting: 'ஜூன்-ஜூலை', harvesting: 'டிசம்-ஜனவரி', temperature: '21-30°C', soil: 'கருமண்' },
        sugarcane: { name: 'கரும்பு', season: 'ஆண்டு முழுவதும்', planting: 'பிப்-மார்/அக்டோ-நவம்', harvesting: 'டிசம்-மார்', temperature: '20-30°C', soil: 'கனமண்' }
      }
    };
    return cropData[language] || cropData.en;
  };

  const crops = getCropData();

  const getRecommendedCrops = (weather) => {
    if (!weather) return ['rice', 'wheat', 'maize'];
    
    // Safe temperature access
    const temp = weather.temp || weather.main?.temp || 25;
    const season = new Date().getMonth() + 1;
    
    if (temp >= 25 && season >= 6 && season <= 10) {
      return ['rice', 'cotton', 'maize'];
    } else if (temp >= 15 && temp <= 25 && (season >= 11 || season <= 3)) {
      return ['wheat', 'maize'];
    } else {
      return ['sugarcane', 'maize'];
    }
  };

  const recommendedCrops = weatherData ? getRecommendedCrops(weatherData.current || weatherData) : ['rice', 'wheat', 'maize'];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className={`text-2xl font-bold text-gray-800 mb-6 ${getFontClass()}`}>
        {t.recommendedCrops || 'Recommended Crops'} - {city}
      </h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {recommendedCrops.map(cropKey => {
          const crop = crops[cropKey];
          if (!crop) return null;
          
          return (
            <div key={cropKey} className="border border-green-200 rounded-2xl p-5 bg-green-50 hover:bg-green-100 transition-colors">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">🌾</span>
                </div>
                <h3 className={`text-xl font-bold text-gray-800 ${getFontClass()}`}>
                  {crop.name}
                </h3>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className={`text-gray-600 ${getFontClass()}`}>
                    {t.season || 'Season'}:
                  </span>
                  <span className={`font-medium text-right ${getFontClass()}`}>
                    {crop.season}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-gray-600 ${getFontClass()}`}>
                    {t.planting || 'Planting'}:
                  </span>
                  <span className={`font-medium ${getFontClass()}`}>
                    {crop.planting}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-gray-600 ${getFontClass()}`}>
                    {t.harvesting || 'Harvesting'}:
                  </span>
                  <span className={`font-medium ${getFontClass()}`}>
                    {crop.harvesting}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-gray-600 ${getFontClass()}`}>
                    {t.temperature || 'Temperature'}:
                  </span>
                  <span className={`font-medium ${getFontClass()}`}>
                    {crop.temperature}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className={`text-gray-600 ${getFontClass()}`}>
                    {t.soilType || 'Soil Type'}:
                  </span>
                  <span className={`font-medium text-right ${getFontClass()}`}>
                    {crop.soil}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-8">
        <h3 className={`text-lg font-semibold mb-4 ${getFontClass()}`}>
          {t.allCrops || 'All Crops'}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-green-100">
                <th className="border border-green-300 px-4 py-2 text-left">
                  <span className={getFontClass()}>{t.crop || 'Crop'}</span>
                </th>
                <th className="border border-green-300 px-4 py-2 text-left">
                  <span className={getFontClass()}>{t.season || 'Season'}</span>
                </th>
                <th className="border border-green-300 px-4 py-2 text-left">
                  <span className={getFontClass()}>{t.planting || 'Planting'}</span>
                </th>
                <th className="border border-green-300 px-4 py-2 text-left">
                  <span className={getFontClass()}>{t.harvesting || 'Harvesting'}</span>
                </th>
                <th className="border border-green-300 px-4 py-2 text-left">
                  <span className={getFontClass()}>{t.idealTemp || 'Ideal Temp'}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(crops).map(([key, crop]) => (
                <tr key={key} className="hover:bg-green-50">
                  <td className={`border border-green-300 px-4 py-2 font-medium ${getFontClass()}`}>
                    {crop.name}
                  </td>
                  <td className={`border border-green-300 px-4 py-2 ${getFontClass()}`}>
                    {crop.season}
                  </td>
                  <td className={`border border-green-300 px-4 py-2 ${getFontClass()}`}>
                    {crop.planting}
                  </td>
                  <td className={`border border-green-300 px-4 py-2 ${getFontClass()}`}>
                    {crop.harvesting}
                  </td>
                  <td className={`border border-green-300 px-4 py-2 ${getFontClass()}`}>
                    {crop.temperature}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}