'use client';
import { useState } from 'react';
import { Search } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../utils/translations';

const INDIAN_CITIES = [
  // Major Metros
  'Mumbai', 'Delhi', 'Bangalore', 'Hyderabad', 'Ahmedabad', 'Chennai', 'Kolkata',
  'Surat', 'Pune', 'Jaipur', 'Lucknow', 'Kanpur', 'Nagpur', 'Indore', 'Thane',
  'Bhopal', 'Visakhapatnam', 'Pimpri-Chinchwad', 'Patna', 'Vadodara', 'Ghaziabad',
  'Ludhiana', 'Agra', 'Nashik', 'Faridabad', 'Meerut', 'Rajkot', 'Kalyan-Dombivli',
  'Vasai-Virar', 'Varanasi', 'Srinagar', 'Aurangabad', 'Dhanbad', 'Amritsar',
  'Navi Mumbai', 'Allahabad', 'Howrah', 'Gwalior', 'Jabalpur', 'Coimbatore',

  // Tamil Nadu Districts
  'Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli', 'Salem', 'Tirunelveli',
  'Tiruppur', 'Erode', 'Vellore', 'Thoothukudi', 'Dindigul', 'Thanjavur', 'Hosur',
  'Kanchipuram', 'Nagercoil', 'Karaikudi', 'Udhagamandalam', 'Hosur', 'Cuddalore',
  'Kumbakonam', 'Tiruvannamalai', 'Pollachi', 'Rajapalayam', 'Sivakasi', 'Pudukkottai',
  'Neyveli', 'Ambur', 'Vaniyambadi', 'Nagapattinam', 'Paramakudi',

  // Maharashtra Districts
  'Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Kalyan-Dombivli', 'Vasai-Virar',
  'Aurangabad', 'Navi Mumbai', 'Solapur', 'Mira-Bhayandar', 'Bhiwandi', 'Amravati',
  'Nanded', 'Kolhapur', 'Ulhasnagar', 'Sangli', 'Malegaon', 'Jalgaon', 'Akola',
  'Latur', 'Dhule', 'Ahmednagar', 'Chandrapur', 'Parbhani', 'Ichalkaranji', 'Jalna',
  'Ambarnath', 'Bhusawal', 'Panvel', 'Badlapur', 'Beed', 'Gondia', 'Satara', 'Barshi',
  'Yavatmal', 'Wardha', 'Udgir', 'Hinganghat',

  // Uttar Pradesh Districts
  'Lucknow', 'Kanpur', 'Ghaziabad', 'Agra', 'Varanasi', 'Meerut', 'Allahabad',
  'Bareilly', 'Aligarh', 'Moradabad', 'Saharanpur', 'Gorakhpur', 'Noida', 'Firozabad',
  'Jhansi', 'Muzaffarnagar', 'Mathura', 'Budaun', 'Rampur', 'Shahjahanpur', 'Farrukhabad',
  'Maunath Bhanjan', 'Hapur', 'Etawah', 'Mirzapur', 'Bulandshahr', 'Sambhal', 'Amroha',
  'Hardoi', 'Fatehpur', 'Raebareli', 'Orai', 'Sitapur', 'Bahraich', 'Modinagar',
  'Unnao', 'Jaunpur', 'Lakhimpur', 'Hathras', 'Banda', 'Pilibhit', 'Barabanki',
  'Khurja', 'Gonda', 'Mainpuri', 'Lalitpur', 'Etah', 'Deoria', 'Ghazipur', 'Sultanpur',
  'Azamgarh', 'Bijnor', 'Sahaswan', 'Basti', 'Chandausi', 'Akbarpur', 'Ballia',

  // Karnataka Districts
  'Bangalore', 'Mysore', 'Hubli', 'Dharwad', 'Belgaum', 'Mangalore', 'Gulbarga',
  'Davanagere', 'Bellary', 'Bijapur', 'Shimoga', 'Tumkur', 'Raichur', 'Bidar',
  'Hospet', 'Hassan', 'Bagalkot', 'Udupi', 'Gadag', 'Chitradurga', 'Kolar',
  'Mandya', 'Chikmagalur', 'Ranebennur', 'Gangawati', 'Robertson Pet', 'Bhadravati',

  // Andhra Pradesh Districts
  'Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool', 'Rajahmundry',
  'Kakinada', 'Tirupati', 'Kadapa', 'Anantapur', 'Eluru', 'Ongole', 'Nandyal',
  'Machilipatnam', 'Adoni', 'Tenali', 'Chittoor', 'Hindupur', 'Proddatur', 'Bhimavaram',
  'Madanapalle', 'Guntakal', 'Dharmavaram', 'Gudivada', 'Srikakulam', 'Narasaraopet',

  // Telangana Districts
  'Hyderabad', 'Warangal', 'Nizamabad', 'Karimnagar', 'Ramagundam', 'Khammam',
  'Mahbubnagar', 'Nalgonda', 'Adilabad', 'Siddipet', 'Miryalaguda', 'Jagtial',
  'Mancherial', 'Sangareddy', 'Vikarabad', 'Wanaparthy', 'Nagarkurnool',

  // Kerala Districts
  'Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Kollam', 'Thrissur', 'Kannur',
  'Alappuzha', 'Kottayam', 'Palakkad', 'Manjeri', 'Thalassery', 'Ponnani', 'Vatakara',
  'Kanhangad', 'Koyilandy', 'Malappuram', 'Kodungallur', 'Nedumangad', 'Changanassery',

  // Gujarat Districts
  'Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar', 'Junagadh',
  'Gandhinagar', 'Gandhidham', 'Anand', 'Navsari', 'Morbi', 'Bharuch', 'Porbandar',
  'Godhra', 'Palanpur', 'Valsad', 'Patan', 'Deesa', 'Amreli', 'Ankleshwar', 'Dhoraji',

  // Rajasthan Districts
  'Jaipur', 'Jodhpur', 'Kota', 'Bikaner', 'Ajmer', 'Udaipur', 'Bhilwara', 'Alwar',
  'Bharatpur', 'Sikar', 'Pali', 'Sri Ganganagar', 'Tonk', 'Kishangarh', 'Baran',
  'Chittorgarh', 'Hanumangarh', 'Beawar', 'Dholpur', 'Gangapur City', 'Sawai Madhopur',

  // Madhya Pradesh Districts
  'Indore', 'Bhopal', 'Jabalpur', 'Gwalior', 'Ujjain', 'Sagar', 'Dewas', 'Satna',
  'Ratlam', 'Rewa', 'Murwara', 'Singrauli', 'Burhanpur', 'Khandwa', 'Morena',
  'Bhind', 'Chhindwara', 'Guna', 'Shivpuri', 'Vidisha', 'Chhatarpur', 'Damoh',

  // Punjab Districts
  'Ludhiana', 'Amritsar', 'Jalandhar', 'Patiala', 'Bathinda', 'Hoshiarpur', 'Moga',
  'Pathankot', 'Malerkotla', 'Khanna', 'Phagwara', 'Kapurthala', 'Zirakpur', 'Kot Kapura',
  'Faridkot', 'Muktsar', 'Rajpura', 'Sangrur', 'Barnala', 'Fazilka', 'Gurdaspur',

  // Haryana Districts
  'Faridabad', 'Gurgaon', 'Panipat', 'Ambala', 'Yamunanagar', 'Rohtak', 'Hisar',
  'Karnal', 'Sonipat', 'Panchkula', 'Bhiwani', 'Sirsa', 'Bahadurgarh', 'Jind',
  'Thanesar', 'Kaithal', 'Rewari', 'Palwal', 'Hansi', 'Narnaul', 'Fatehabad',

  // Bihar Districts
  'Patna', 'Gaya', 'Bhagalpur', 'Muzaffarpur', 'Purnia', 'Darbhanga', 'Bihar Sharif',
  'Arrah', 'Begusarai', 'Katihar', 'Munger', 'Chhapra', 'Hajipur', 'Saharsa', 'Sasaram',
  'Dehri', 'Bettiah', 'Motihari', 'Bagaha', 'Siwan', 'Kishanganj', 'Jamalpur',

  // West Bengal Districts
  'Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri', 'Bardhaman', 'Malda',
  'Bahrampur', 'Habra', 'Kharagpur', 'Shantipur', 'Dankuni', 'Dhulian', 'Ranaghat',
  'Haldia', 'Raiganj', 'Krishnanagar', 'Nabadwip', 'Medinipur', 'Jalpaiguri', 'Balurghat',

  // Odisha Districts
  'Bhubaneswar', 'Cuttack', 'Rourkela', 'Berhampur', 'Sambalpur', 'Puri', 'Balasore',
  'Bhadrak', 'Baripada', 'Jharsuguda', 'Jeypore', 'Bargarh', 'Rayagada', 'Paradip',
  'Bhawanipatna', 'Dhenkanal', 'Barbil', 'Kendujhar', 'Sunabeda', 'Talcher',

  // Assam Districts
  'Guwahati', 'Silchar', 'Dibrugarh', 'Nagaon', 'Tinsukia', 'Jorhat', 'Bongaigaon',
  'Dhubri', 'Diphu', 'North Lakhimpur', 'Tezpur', 'Karimganj', 'Sibsagar', 'Goalpara',
  'Barpeta', 'Lanka', 'Lumding', 'Golaghat', 'Morigaon', 'Haflong', 'Kokrajhar',

  // Jammu & Kashmir Districts
  'Srinagar', 'Jammu', 'Anantnag', 'Baramulla', 'Pulwama', 'Kupwara', 'Budgam',
  'Sopore', 'Bandipore', 'Kargil', 'Leh', 'Ganderbal', 'Shopian', 'Kulgam', 'Doda',

  // Uttarakhand Districts
  'Dehradun', 'Haridwar', 'Roorkee', 'Haldwani', 'Rudrapur', 'Kashipur', 'Rishikesh',
  'Ramnagar', 'Pithoragarh', 'Almora', 'Mussoorie', 'Tehri', 'Khatima', 'Bageshwar',

  // Himachal Pradesh Districts
  'Shimla', 'Solan', 'Dharamshala', 'Baddi', 'Mandi', 'Chamba', 'Palampur', 'Nahan',
  'Sundarnagar', 'Kullu', 'Hamirpur', 'Una', 'Bilaspur', 'Yol', 'Jogindernagar',

  // Northeastern States
  'Imphal', 'Aizawl', 'Shillong', 'Agartala', 'Kohima', 'Gangtok', 'Dimapur',
  'Itanagar', 'Naharlagun', 'Pasighat', 'Tura', 'Williamnagar', 'Jowai', 'Churachandpur',

  // Union Territories
  'Chandigarh', 'Puducherry', 'Kavaratti', 'Daman', 'Diu', 'Silvassa', 'Port Blair',
  'Leh', 'Kargil'
];

export default function SearchBar({ onCitySelect, loading }) {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const { language } = useLanguage();
  const t = translations[language];

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    
    if (value.length > 1) {
      const filtered = INDIAN_CITIES.filter(city =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setSuggestions(filtered.slice(0, 8)); // Show more suggestions
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (city) => {
    setQuery(city);
    setSuggestions([]);
    onCitySelect(city);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      // Find exact match or first close match
      const exactMatch = INDIAN_CITIES.find(city => 
        city.toLowerCase() === query.toLowerCase()
      );
      const closeMatch = INDIAN_CITIES.find(city =>
        city.toLowerCase().includes(query.toLowerCase())
      );
      
      if (exactMatch || closeMatch) {
        onCitySelect(exactMatch || closeMatch);
      }
    }
  };

  return (
    <div className="relative">
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={query}
            onChange={handleInputChange}
            placeholder={t.searchPlaceholder}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
            disabled={loading}
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {loading ? t.searching : t.search}
          </button>
        </div>
      </form>

      {/* Suggestions */}
      {suggestions.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg max-h-80 overflow-y-auto">
          {suggestions.map((city, index) => (
            <button
              key={index}
              onClick={() => handleSuggestionClick(city)}
              className="w-full px-4 py-3 text-left hover:bg-green-50 transition-colors border-b border-gray-100 last:border-b-0"
            >
              <div className="flex items-center space-x-3">
                <span className="text-gray-400">📍</span>
                <span className="font-medium text-gray-800">{city}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}