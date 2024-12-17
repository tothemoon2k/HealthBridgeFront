import React from 'react';
import { useState } from 'react';
import Calendar from '../../Calendar'

const Step12 = ({ next, formData, updateFormData }) => {
    const handleNextBtn = () => {
        if(formData.returnDate){
            next();
        }else{
            alert("Please select a return date.")
        }
    }

    const handleSelectDate = (value) =>{ 
        updateFormData({
            ...formData,
            returnDate: value
        });
    }

    return (
        <div className='flex flex-col w-[80%]'>
            <h1 className='mt-6 mb-10 text-2xl font-medium'>What day will you return to {formData?.purpose?.label}?</h1>

            <div className="flex flex-col gap-7">
                <div className='w-full md:w-fit flex items-center gap-2 border-x-2 border-t-2 border-b-[4px] py-4 px-5 border-gray-200 rounded-lg'>
                    <img className='h-5' src="https://img.icons8.com/material-rounded/100/calendar--v1.png" alt="" />
                    <p className='text-gray-800'>{formData.returnDate ? formData.returnDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Select a Date'}</p>
                </div>

                <div className=''>
                    <div>
                        <label for="input-label" class="block text-sm font-medium mb-2">Select a Date:</label>
                        <Calendar selectDate={handleSelectDate} selectedDate={formData.returnDate}/>
                    </div>
                </div>
            </div>

            <button onClick={handleNextBtn} className='z-20 mt-16 w-full flex justify-center items-center gap-3 bg-black text-white py-2 px-4 rounded-xl text-sm font-medium'>Next <img className='h-8' loading="lazy" src="https://img.icons8.com/windows/50/ffffff/long-arrow-right.png" alt="Long arrow" /></button>
        </div>
    );
};

export default Step12;