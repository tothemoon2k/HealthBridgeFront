import React from 'react';

const Step13 = ({ next, formData, updateFormData }) => {
    const handleInputChange = (e) => {
        updateFormData({
            ...formData,
            additionalInfo: e.target.value
        });
    };

    const handleNextBtn = () => {
        next();
    }

    return (
        <div className='flex flex-col w-[80%]'>
            <h1 className='mt-6 text-2xl font-medium'>Is there any additional info you’d like to share with your doctor? <span className='text-gray-500 text-[1.2rem]'>(Optional)</span></h1>

            <div class="mt-10 max-w-sm md:max-w-full">
                <textarea onChange={handleInputChange} type="text" id="input-label" class="pt-3 h-20 px-4 block w-full border border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none" placeholder="Additional Info"/>
            </div>

            <button onClick={handleNextBtn} className='z-20 mt-16 w-full flex justify-center items-center gap-3 bg-black text-white py-2 px-4 rounded-xl text-sm font-medium'>Next <img className='h-8' loading="lazy" src="https://img.icons8.com/windows/50/ffffff/long-arrow-right.png" alt="Long arrow" /></button>
        </div>
    );
};

export default Step13;