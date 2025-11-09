'use client';
import { useLanguage } from '../context/LanguageContext'; // ← FIXED: Changed () to {}
import { translations } from '../utils/translations';

export default function AgricultureTips({ city, weatherData }) {
  const { language } = useLanguage();
  const t = translations[language];

  // Get font class based on language
  const getFontClass = () => {
    if (language === 'hi') return 'hindi-font';
    if (language === 'ta') return 'tamil-font';
    return '';
  };

  const getSeasonalTips = () => {
    const month = new Date().getMonth() + 1;
    
    if (month >= 3 && month <= 5) {
      return {
        season: language === 'en' ? 'Summer' : language === 'hi' ? 'गर्मी' : 'கோடை',
        tips: language === 'en' ? [
          'Ensure adequate irrigation for standing crops',
          'Apply mulch to conserve soil moisture',
          'Monitor for pest attacks in high temperatures',
          'Prepare land for Kharif season crops',
          'Harvest Rabi crops and store properly'
        ] : language === 'hi' ? [
          'खड़ी फसलों के लिए पर्याप्त सिंचाई सुनिश्चित करें',
          'मिट्टी की नमी बनाए रखने के लिए मल्च लगाएं',
          'उच्च तापमान में कीटों के हमलों पर नजर रखें',
          'खरीफ सीजन की फसलों के लिए जमीन तैयार करें',
          'रबी फसलों की कटाई करें और ठीक से भंडारण करें'
        ] : [
          'நிற்கும் பயிர்களுக்கு போதுமான பாசனம் உறுதி செய்யவும்',
          'மண்ணின் ஈரப்பதத்தைப் பாதுகாக்க மல்ச் பயன்படுத்தவும்',
          'அதிக வெப்பநிலையில் பூச்சி தாக்குதல்களை கண்காணிக்கவும்',
          'கரிப் பருவ பயிர்களுக்கு நிலத்தை தயார் செய்யவும்',
          'ரபி பயிர்களை அறுவடை செய்து சரியாக சேமிக்கவும்'
        ]
      };
    } else if (month >= 6 && month <= 9) {
      return {
        season: language === 'en' ? 'Monsoon (Kharif)' : language === 'hi' ? 'मानसून (खरीफ)' : 'மழை (கரிப்)',
        tips: language === 'en' ? [
          'Complete sowing of Kharif crops',
          'Ensure proper drainage in fields',
          'Apply fertilizers as per schedule',
          'Monitor for fungal diseases in humid conditions',
          'Weed control is crucial in rainy season'
        ] : language === 'hi' ? [
          'खरीफ फसलों की बुआई पूरी करें',
          'खेतों में उचित जल निकासी सुनिश्चित करें',
          'समय表 के अनुसार उर्वरक डालें',
          'नम स्थितियों में फंगल रोगों पर नजर रखें',
          'बरसात के मौसम में खरपतवार नियंत्रण महत्वपूर्ण है'
        ] : [
          'கரிப் பயிர்களின் விதைப்பை முடிக்கவும்',
          'வயல்களில் சரியான வடிகால் உறுதி செய்யவும்',
          'திட்டத்தின்படி உரங்களைப் பயன்படுத்தவும்',
          'ஈரப்பதமான நிலையில் பூஞ்சை நோய்களை கண்காணிக்கவும்',
          'மழைக்காலத்தில் களை கட்டுப்பாடு முக்கியம்'
        ]
      };
    } else {
      return {
        season: language === 'en' ? 'Winter (Rabi)' : language === 'hi' ? 'सर्दी (रबी)' : 'குளிர் (ரபி)',
        tips: language === 'en' ? [
          'Complete sowing of Rabi crops like wheat',
          'Protect crops from frost during cold waves',
          'Apply irrigation before frost conditions',
          'Monitor for aphid attacks in mustard',
          'Harvest Kharif crops and prepare for storage'
        ] : language === 'hi' ? [
          'गेहूं जैसी रबी फसलों की बुआई पूरी करें',
          'ठंडी हवाओं के दौरान फसलों को पाला से बचाएं',
          'पाला पड़ने की स्थिति से पहले सिंचाई करें',
          'सरसों में एफिड के हमलों पर नजर रखें',
          'खरीफ फसलों की कटाई करें और भंडारण के लिए तैयार करें'
        ] : [
          'கோதுமை போன்ற ரபி பயிர்களின் விதைப்பை முடிக்கவும்',
          'குளிர் அலைகளின் போது பனியில் இருந்து பயிர்களைப் பாதுகாக்கவும்',
          'பனி நிலைமைகளுக்கு முன் பாசனம் செய்யவும்',
          'கடுகில் அசீரை தாக்குதல்களை கண்காணிக்கவும்',
          'கரிப் பயிர்களை அறுவடை செய்து சேமிப்பிற்கு தயார் செய்யவும்'
        ]
      };
    }
  };

  const getWeatherSpecificTips = (weather) => {
    if (!weather) return [];
    
    // Safe data access
    const temp = weather.temp || weather.main?.temp || 25;
    const humidity = weather.humidity || weather.main?.humidity || 60;
    const description = weather.description || weather.weather?.[0]?.description || '';
    
    const tips = [];
    
    if (temp > 35) {
      tips.push(language === 'en' 
        ? 'Provide shade nets for sensitive crops'
        : language === 'hi'
        ? 'संवेदनशील फसलों के लिए शेड नेट लगाएं'
        : 'உணர்திறன் பயிர்களுக்கு நிழல் வலையங்களை வழங்கவும்'
      );
    }
    
    if (humidity > 80) {
      tips.push(language === 'en'
        ? 'Watch for fungal diseases - apply fungicides if needed'
        : language === 'hi'
        ? 'फंगल रोगों पर नजर रखें - जरूरत पड़ने पर फफूंदनाशक लगाएं'
        : 'பூஞ்சை நோய்களை கவனிக்கவும் - தேவைப்பட்டால் பூஞ்சைக்கொல்லிகளை பயன்படுத்தவும்'
      );
    }
    
    if (description.toLowerCase().includes('rain')) {
      tips.push(language === 'en'
        ? 'Postpone spraying operations'
        : language === 'hi'
        ? 'छिड़काव कार्य स्थगित करें'
        : 'தெளிப்பு செயல்பாடுகளை ஒத்திவைக்கவும்'
      );
    }

    return tips.length > 0 ? tips : [
      language === 'en'
        ? 'Current weather conditions are favorable for most farming activities'
        : language === 'hi'
        ? 'वर्तमान मौसम की स्थितियां अधिकांश कृषि गतिविधियों के लिए अनुकूल हैं'
        : 'தற்போதைய வானிலை நிலைமைகள் பெரும்பாலான விவசாய செயல்பாடுகளுக்கு சாதகமானவை'
    ];
  };

  const seasonalData = getSeasonalTips();
  const weatherTips = weatherData ? getWeatherSpecificTips(weatherData.current || weatherData) : [];

  const generalTips = language === 'en' ? [
    'Test soil health regularly',
    'Use quality seeds from certified sources',
    'Practice crop rotation',
    'Implement integrated pest management',
    'Use water efficiently with drip irrigation',
    'Maintain farm records for better planning'
  ] : language === 'hi' ? [
    'नियमित रूप से मिट्टी की सेहत की जांच करें',
    'प्रमाणित स्रोतों से गुणवत्तापूर्ण बीज का उपयोग करें',
    'फसल चक्रण का अभ्यास करें',
    'एकीकृत कीट प्रबंधन लागू करें',
    'ड्रिप सिंचाई के साथ पानी का कुशलतापूर्वक उपयोग करें',
    'बेहतर योजना के लिए फार्म रिकॉर्ड रखें'
  ] : [
    'தொடர்ந்து மண்ணின் ஆரோக்கியத்தை சோதிக்கவும்',
    'சான்றளிக்கப்பட்ட ஆதாரங்களிலிருந்து தரமான விதைகளைப் பயன்படுத்தவும்',
    'பயிர் சுழற்சியை பயிற்சி செய்யவும்',
    'ஒருங்கிணைந்த பூச்சி மேலாண்மையை செயல்படுத்தவும்',
    'டிரிப் பாசனத்துடன் தண்ணீரை திறமையாக பயன்படுத்தவும்',
    'சிறந்த திட்டமிடலுக்கு பண்ணை பதிவுகளை பராமரிக்கவும்'
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6">
      <h2 className={`text-2xl font-bold text-gray-800 mb-6 ${getFontClass()}`}>
        {t.agriculturalTips} - {city}
      </h2>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Seasonal Tips */}
        <div className="bg-blue-50 rounded-2xl p-5 border border-blue-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">📅</span>
            </div>
            <h3 className={`text-xl font-bold text-gray-800 ${getFontClass()}`}>
              {seasonalData.season} {t.seasonalTips?.split(' ')[0] || 'Tips'}
            </h3>
          </div>
          <ul className="space-y-3">
            {seasonalData.tips.map((tip, index) => (
              <li key={index} className="flex items-start space-x-3">
                <span className="text-blue-600 mt-1">•</span>
                <span className={`text-gray-700 ${getFontClass()}`}>
                  {tip}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Weather-based Tips */}
        <div className="bg-green-50 rounded-2xl p-5 border border-green-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white text-lg">🌤️</span>
            </div>
            <h3 className={`text-xl font-bold text-gray-800 ${getFontClass()}`}>
              {t.weatherTips || 'Weather Tips'}
            </h3>
          </div>
          <ul className="space-y-3">
            {weatherTips.map((tip, index) => (
              <li key={index} className="flex items-start space-x-3">
                <span className="text-green-600 mt-1">•</span>
                <span className={`text-gray-700 ${getFontClass()}`}>
                  {tip}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* General Farming Tips */}
      <div className="mt-6 bg-amber-50 rounded-2xl p-5 border border-amber-200">
        <h3 className={`text-lg font-semibold text-gray-800 mb-3 ${getFontClass()}`}>
          🌾 {t.bestPractices || 'Best Practices'}
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <ul className="space-y-2">
            {generalTips.slice(0, 3).map((tip, index) => (
              <li key={index} className="flex items-center space-x-2">
                <span className="text-amber-600">✓</span>
                <span className={`${getFontClass()}`}>
                  {tip}
                </span>
              </li>
            ))}
          </ul>
          <ul className="space-y-2">
            {generalTips.slice(3).map((tip, index) => (
              <li key={index} className="flex items-center space-x-2">
                <span className="text-amber-600">✓</span>
                <span className={`${getFontClass()}`}>
                  {tip}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}