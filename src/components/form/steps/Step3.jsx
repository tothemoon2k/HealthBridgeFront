import React, { useState } from 'react';

const Step3 = ({ next, formData, updateFormData }) => {
    const handleNextBtn = () => {
        console.log(formData);

        if (formData.pronouns) {
            next();
        } else {
            alert('Please select a pronoun.');
        }
    };

    const handlePronounSelection = (id) => {
        updateFormData({
            ...formData,
            pronouns: {id: id, label: pronouns.find(pronoun => pronoun.id === id).label}
        });
    };

    const pronouns = [
        { id: 1, label: 'He/Him/His', imgSrc: 'https://img.icons8.com/color/200/male.png' },
        { id: 2, label: 'She/Her/Hers', imgSrc: 'https://img.icons8.com/color/200/female.png' },
        { id: 3, label: 'They/Them', imgSrc: 'https://img.icons8.com/color-glass/200/transgender.png' }
    ];

    return (
        <div className='flex flex-col w-[80%]'>
            <h1 className='mt-6 mb-10 text-2xl font-medium'>Please select your preferred pronouns.</h1>

            <div className='grid grid-cols-2 gap-y-5 md:grid-cols-3 md:mt-6 md:mb-10'>
                {pronouns.map(pronoun => (
                    <div
                        key={pronoun.id}
                        className={`${formData.pronouns.id === pronoun.id ? 'border-x-2 border-t-2 border-b-[4px] border-blue-500 bg-gray-50' : 'border-x-2 border-t-2 border-b-[4px] border-gray-200'} w-fit flex flex-col items-center justify-center gap-1 py-5 px-6 border rounded-lg`}
                        onClick={() => handlePronounSelection(pronoun.id)}
                    >
                        <img className="h-[4.5rem]" src={pronoun.imgSrc} alt={pronoun.label} />
                        <p>{pronoun.label}</p>
                    </div>
                ))}
            </div>

            <button onClick={handleNextBtn} className='z-20 mt-12 w-full flex justify-center items-center gap-3 bg-black text-white py-2 px-4 rounded-xl text-sm font-medium'>
                Next <img className='h-8' loading="lazy" src="https://img.icons8.com/windows/50/ffffff/long-arrow-right.png" alt="Long arrow" />
            </button>
        </div>
    );
};

export default Step3;