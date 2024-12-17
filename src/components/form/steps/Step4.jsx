import React, {useEffect, useState} from 'react';
import { Analytics, track } from '@vercel/analytics/react';
import axios from 'axios';

const Step4 = ({ next, formData, updateFormData }) => {
    const [loading, setLoading] = useState(false);
    const handleNextBtn = () => {
        if(formData.state){
            next();
        }else{
            alert("Please select your state.")
        }
    }

    const states = [
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode Island",
        "South Carolina", 
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming"
    ];

    const requestLocation = () => {
        setLoading(true);
        track('request-location');

        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            async (position) => {
                const res = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${position.coords.latitude},${position.coords.longitude}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY || process.env.VITE_GOOGLE_MAPS_API_KEY}`);

                updateFormData({
                    ...formData,
                    state: res.data.results[0].address_components[5].long_name
                });

                setLoading(false);
            },
            (err) => {
                setLoading(false);
                alert("There was an error using your current location. Please enter your state manually.");
            }
          );
        } else {
          alert('Geolocation is not supported by your browser.');
        }
    };

    const handleSelect = (e) => {
        updateFormData({
            ...formData,
            state: e.target.value
        });
    }

    return (
        <div className='flex flex-col w-[80%]'>
            <h1 className='mt-6 text-2xl font-medium'>What state are you in?</h1>
            <p className='mb-10 text-[1rem] text-gray-400'>Your request will be evaluated by a medical professional licensed in your state.</p>

            <select value={formData?.state} onChange={handleSelect} className="mb-2 border py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none">
                {!loading && states.map((item, index)=> (
                    <option value={item} key={index}>{item}</option>
                ))}

                {loading &&
                    <option>Loading...</option>
                }
            </select>

            <button onClick={requestLocation} className='ml-1 self-start text-sm font-medium text-blue-500 font-me'>📍 <span className='underline'>Use My Current Location</span></button>

            <button onClick={handleNextBtn} className='z-20 mt-16 w-full flex justify-center items-center gap-3 bg-black text-white py-2 px-4 rounded-xl text-sm font-medium'>Next <img className='h-8' loading="lazy" src="https://img.icons8.com/windows/50/ffffff/long-arrow-right.png" alt="Long arrow" /></button>
        </div>
    );
};

export default Step4;