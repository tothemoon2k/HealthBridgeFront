import React from 'react';

const Step14 = ({ next, formData, updateFormData }) => {
    const handleInputChange = (e) => {
        updateFormData({
            ...formData,
            email: e.target.value
        });
    };

    const handleNextBtn = () => {
        if(formData.email){
            next();
        }else{
            alert("Please enter your email")
        }
    }

    return (
        <div className='flex flex-col w-[80%]'>
            <h1 className='mt-6 text-2xl font-medium'>What is your email? This is where we will send the note.</h1>

            <div class="mt-10 max-w-sm md:max-w-full">
                <label for="input-label" class="block text-sm font-medium mb-2">Email</label>
                <input value={formData.email} onChange={handleInputChange} type="email" id="input-label" class="py-3 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="john.doe@gmail.com"/>
            </div>

            <button onClick={handleNextBtn} className='z-20 mt-16 w-full flex justify-center items-center gap-3 bg-black text-white py-2 px-4 rounded-xl text-sm font-medium'>Next <img className='h-8' loading="lazy" src="https://img.icons8.com/windows/50/ffffff/long-arrow-right.png" alt="Long arrow" /></button>
        </div>
    );
};

export default Step14;