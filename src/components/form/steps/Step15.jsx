import React from 'react';

const Step15 = ({ next, formData, updateFormData }) => {
    const handleNextBtn = () => {
        if(formData.finalReview.label === "I accept"){
            next();
        }else{
            alert("You must accept the terms to continue.")
        }
    };

    const options = [
        { id: 1, label: 'I accept' },
        { id: 2, label: "I don't accept" },
    ];

    const handleOptionSelection = (id) => {
        updateFormData({
            ...formData,
            finalReview: {id: id, label: options.find(option => option.id === id).label}
        });
    };

    return (
        <div className='flex flex-col w-[80%]'>
            <h1 className='mt-6 text-2xl font-medium'>Please review and confirm.</h1>
            <br />
            <p className='mb-10 text-[1rem] text-gray-500'>
                To continue, you must accept OnlineMed's <a href="/terms">Terms & Conditions</a>, <a href="/privacy">Privacy Policy</a>, <a href="/hipaa">HIPAA Consent</a>, and <a href="/telehealth">Telehealth Consent</a>.
            </p>

            <div className="flex flex-col gap-7">
                {options.map(option=>(
                    <div key={option.id} onClick={()=>handleOptionSelection(option.id)} className={`${formData.finalReview.id === option.id ? "border-t-2 border-b-[4px] bg-gray-50 border border-blue-500" : "border-t-2 border-b-[4px] border-gray-200"} w-full flex items-center gap-1 border-x-2 py-4 px-6 rounded-lg`}>
                        <p>{option.label}</p>
                    </div>
                ))}
            </div>

            <button onClick={handleNextBtn} className='z-20 mt-16 w-full flex justify-center items-center gap-3 bg-black text-white py-2 px-4 rounded-xl text-sm font-medium'>Next <img className='h-8' loading="lazy" src="https://img.icons8.com/windows/50/ffffff/long-arrow-right.png" alt="Long arrow" /></button>
        </div>
    );
};

export default Step15;