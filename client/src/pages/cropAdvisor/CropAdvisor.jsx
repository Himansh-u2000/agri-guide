import React, { useState } from 'react'
import Dropdown from '../../components/common/Dropdown'
import CropPieChart from './CropPieChart ';
import { Percent } from 'lucide-react';

export default function CropAdvisor() {
  const districts = {
    "Andhra Pradesh": ["Anantapur", "Chittoor", "East Godavari", "Guntur", "Krishna", "Kurnool", "Nellore", "Prakasam", "Srikakulam", "Visakhapatnam", "Vizianagaram", "West Godavari", "YSR Kadapa"],
    "Arunachal Pradesh": ["Tawang", "West Kameng", "East Kameng", "Papum Pare", "Kurung Kumey", "Kra Daadi", "Lower Subansiri", "Upper Subansiri", "West Siang", "East Siang", "Siang", "Upper Siang", "Lower Siang", "Longding", "Tirap", "Changlang", "Namsai", "Lohit", "Anjaw", "Dibang Valley", "Lower Dibang Valley"],
    "Assam": ["Baksa", "Barpeta", "Biswanath", "Bongaigaon", "Cachar", "Charaideo", "Chirang", "Darrang", "Dhemaji", "Dhubri", "Dibrugarh", "Dima Hasao", "Goalpara", "Golaghat", "Hailakandi", "Hojai", "Jorhat", "Kamrup", "Kamrup Metropolitan", "Karbi Anglong", "Karimganj", "Kokrajhar", "Lakhimpur", "Majuli", "Morigaon", "Nagaon", "Nalbari", "Sivasagar", "Sonitpur", "South Salmara-Mankachar", "Tinsukia", "Udalguri", "West Karbi Anglong"],
    "Bihar": ["Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur", "Bhojpur", "Buxar", "Darbhanga", "East Champaran", "Gaya", "Gopalganj", "Jamui", "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj", "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur", "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa", "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan", "Supaul", "Vaishali", "West Champaran"],
    "Chhattisgarh": ["Balod", "Baloda Bazar", "Balrampur", "Bastar", "Bemetara", "Bijapur", "Bilaspur", "Dantewada", "Dhamtari", "Durg", "Gariaband", "Janjgir-Champa", "Jashpur", "Kabirdham", "Kanker", "Kondagaon", "Korba", "Koriya", "Mahasamund", "Mungeli", "Narayanpur", "Raigarh", "Raipur", "Rajnandgaon", "Sukma", "Surajpur", "Surguja"],
    "Goa": ["North Goa", "South Goa"],
    "Gujarat": ["Ahmedabad", "Amreli", "Anand", "Aravalli", "Banaskantha", "Bharuch", "Bhavnagar", "Botad", "Chhota Udaipur", "Dahod", "Dang", "Devbhoomi Dwarka", "Gandhinagar", "Gir Somnath", "Jamnagar", "Junagadh", "Kheda", "Kutch", "Mahisagar", "Mehsana", "Morbi", "Narmada", "Navsari", "Panchmahal", "Patan", "Porbandar", "Rajkot", "Sabarkantha", "Surat", "Surendranagar", "Tapi", "Vadodara", "Valsad"],
    "Haryana": ["Ambala", "Bhiwani", "Charkhi Dadri", "Faridabad", "Fatehabad", "Gurugram", "Hisar", "Jhajjar", "Jind", "Kaithal", "Karnal", "Kurukshetra", "Mahendragarh", "Nuh", "Palwal", "Panchkula", "Panipat", "Rewari", "Rohtak", "Sirsa", "Sonipat", "Yamunanagar"],
    "Himachal Pradesh": ["Bilaspur", "Chamba", "Hamirpur", "Kangra", "Kinnaur", "Kullu", "Lahaul and Spiti", "Mandi", "Shimla", "Sirmaur", "Solan", "Una"],
    "Jharkhand": ["Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum", "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara", "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu", "Ramgarh", "Ranchi", "Sahibganj", "Seraikela Kharsawan", "Simdega", "West Singhbhum"],
    "Karnataka": ["Bagalkot", "Ballari", "Belagavi", "Bengaluru Rural", "Bengaluru Urban", "Bidar", "Chamarajanagar", "Chikkaballapur", "Chikkamagaluru", "Chitradurga", "Dakshina Kannada", "Davanagere", "Dharwad", "Gadag", "Hassan", "Haveri", "Kalaburagi", "Kodagu", "Kolar", "Koppal", "Mandya", "Mysuru", "Raichur", "Ramanagara", "Shivamogga", "Tumakuru", "Udupi", "Uttara Kannada", "Vijayanagara", "Vijayapura", "Yadgir"]
  };

  const [selectedDistrict, setSelectedDistrict] = useState('');
  let states = Object.keys(districts).map((state) => {
    return { label: state, value: state }
  });

  const selectedDistrictData = districts[selectedDistrict] || [];
  let districtData = selectedDistrictData.map((district) => {
    return { label: district, value: district }
  });

  const soilTypes = [
    { label: "Alluvial Soil or जलोढ़ मिट्टी", value: "alluvial" },
    { label: "Black Soil (Regur) or काली मिट्टी", value: "black" },
    { label: "Red Soil or लाल मिट्टी", value: "red" },
    { label: "Laterite Soil or लेटराइट मिट्टी", value: "laterite" },
    { label: "Desert Soil or मरुस्थलीय मिट्टी", value: "desert" },
    { label: "Mountain Soil or पहाड़ी मिट्टी", value: "mountain" },
    { label: "Peaty and Marshy Soil or पीट एवं दलदली मिट्टी", value: "peaty" }
  ];

  const [selectedSoilType, setSelectedSoilType] = useState('');

  const handleFormSubmit = (event) => {
    event.preventDefault();

    console.log('Form submitted');
  }

  const recommendedCropReasons = [
    {
      name: 'Rice',
      reason: ['Weather suits for rice cultivation', 'Land is suitable for rice farming'],
      img: 'https://img.freepik.com/premium-vector/oryza-sative-plant-white-background-2d-vector-illustration_983286-4583.jpg?w=740',
      Percent: 35
    },
    {
      name: 'Wheat',
      reason: ['Weather suits for wheat cultivation', 'Land is suitable for wheat farming'],
      img: 'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRb-XBVbvw2JOG73CAERD1qKVVeRQlTQrHO55WN2O4putZ-sW9m',
      Percent: 24
    },
    {
      name: 'Maize',
      reason: ['Weather suits for maize cultivation', 'Land is suitable for maize farming'],
      img: 'https://img.freepik.com/free-vector/corn-plant-growing-with-soil-cartoon_1308-100337.jpg',
      Percent: 20
    },
    {
      name: 'SugarCane',
      reason: ['Weather suits for barley cultivation', 'Land is suitable for barley farming'],
      img: 'https://png.pngtree.com/png-vector/20240106/ourmid/pngtree-pongal-festival-celebration-sugarcane-png-image_11412136.png',
      Percent: 20
    },
  ];

  return (
    <div className='bg-secondary'>
      <form className="flex md:flex-row flex-col gap-4 p-4 max-w-7xl mx-auto">
        <Dropdown label={'Select State'} data={states} onChange={setSelectedDistrict} />
        <Dropdown label={'Select District'} data={districtData} />
        <Dropdown label={'Select Soil Type'} data={soilTypes} onChange={setSelectedSoilType} />
      </form>

      <h1 className='text-center text-xl md:text-2xl font-bold text-primary-shade p-4'>
        Smart Farming: The 4 Best Crops for Your Land & Climate!
      </h1>
      <div className="p-4 grid md:grid-cols-3 grid-cols-1 gap-8 max-w-7xl mx-auto">
        <div className="bg-white p-4 rounded-lg shadow-md md:col-span-2 col-span-1">
          <CropPieChart />
        </div>
        {recommendedCropReasons.map((crop, index) => (
          <div key={index} className='rounded-lg hover:shadow-2xl shadow-md bg-white md:min-h-[500px]'>
            <h1 className='text-xl font-semibold hover:cursor-pointer text-center p-4 rounded-t-lg bg-primary text-white'>
              {crop.name.toUpperCase()} - {crop.Percent}%
            </h1>
            <div className="p-4">
              <img src={crop.img} alt="crop" className='w-40 h-40 mx-auto' />
              <div className="text-center">
                <h2 className='text-lg font-semibold'>{crop.name}</h2>
                <h3 className='text-sm font-semibold'>Reasons to grow</h3>
                <ul className='list-disc list-inside'>
                  {crop.reason.map((reason, index) => (
                    <li key={index}>{reason}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
