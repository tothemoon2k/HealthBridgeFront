import React from 'react';

const Step2 = ({ next, formData, updateFormData }) => {
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        updateFormData({
            ...formData,
            [name]: value
        });
    };

    const handleNextBtn = () => {
        if (formData.firstName && formData.lastName) {
            next();
        }else{
            alert('Please enter your first and last name.');
        }
    }

    return (
        <div className='flex flex-col w-[80%] md:w-[80%] md:items-center'>
            <h1 className='md:w-full mt-6 text-2xl font-medium'>First, what is your name?</h1>

            <div className="mt-10 w-sm md:w-full">
                <label htmlFor="first-name" className="block text-sm font-medium mb-2">First Name</label>
                <input type="text" id="first-name" name="firstName" className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="John" value={formData.firstName}
                    onChange={handleInputChange}/>
            </div>

            <div className="mt-6 w-sm md:w-full">
                <label htmlFor="last-name" className="block text-sm font-medium mb-2">Last Name</label>
                <input type="text" id="last-name" name="lastName" className="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Doe" value={formData.lastName}
                    onChange={handleInputChange}/>
            </div>

            <button onClick={handleNextBtn} className='z-20 mt-16 w-full md:w-full flex justify-center items-center gap-3 bg-black text-white py-2 px-4 rounded-xl text-sm font-medium'>Next <img className='h-8' loading="lazy" src="https://img.icons8.com/windows/50/ffffff/long-arrow-right.png" alt="Long arrow" /></button>
        </div>
    );
};

export default Step2;