import React, { useState, memo } from 'react';

const Step1 = ({ next }) => {
    const handleNextBtn = () => {
        next();
    }

    return (
        <div className='pt-10 md:pt-0 flex flex-col w-[80%] absolute md:static top-0 h-screen md:h-fit justify-center'>
            <img className='w-[85%] md:w-1/2 rounded-2xl' src="https://cdn.prod.website-files.com/65368fc78fd4181b4ff15020/65368fc78fd4181b4ff151f7_about-doctors-image-doctr-x-webflow-template-p-500.jpg" alt="Doctors" loading="lazy" />
            <h1 className='mt-6 text-2xl font-medium'>Let's Begin!</h1>

            <p className='mt-3 text-sm text-gray-500'>Answer a few questions, pay securely, and have your note delivered to your inbox in minutes.</p>

            <div className='mt-8 w-full'>
                <button onClick={handleNextBtn} className='w-full flex justify-center items-center gap-3 bg-black text-white py-2 px-4 rounded-xl text-sm font-medium'>
                    Get Started 
                    <img className='h-8' loading="lazy" src="https://img.icons8.com/windows/50/ffffff/long-arrow-right.png" alt="Long arrow" />
                </button>
                <p className='mt-4 flex gap-1 text-xs items-center'>
                    <img className='w-3.5 h-3.5' src="https://img.icons8.com/material-sharp/24/clock.png" alt="Clock" loading="lazy" />
                    Takes 3 mins
                </p>
            </div>
        </div>
    );
};

export default memo(Step1);