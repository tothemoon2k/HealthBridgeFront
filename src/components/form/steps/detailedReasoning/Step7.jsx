import React from 'react';

const Step7 = ({ next, formData, updateFormData }) => {
    const handleNextBtn = () => {
        if(formData.detailedReasoning){
            next();
        }else{
            alert("Please select an option.")
        }
    }

    const options = [
        { id: 1, label: 'Common Cold' },
        { id: 2, label: 'Flu' },
        { id: 3, label: 'Stomach Bug' },
        { id: 4, label: 'Migraine/Severe Headache' },
        { id: 5, label: 'COVID-19' },
        { id: 6, label: "Strep Throat" },
        { id: 7, label: "Other" },
    ];

    const handleOptionSelection = (id) => {
        updateFormData({
            ...formData,
            detailedReasoning: {id: id, label: options.find(option => option.id === id).label}
        });
    };

    return (
        <div className='flex flex-col w-[80%]'>
            <h1 className='mt-6 mb-10 text-2xl font-medium'>Please select the condition that best matches your current illness:</h1>

            <div className="flex flex-col gap-7">
                {options.map(option=>(
                    <div key={option.id} onClick={()=>handleOptionSelection(option.id)} className={`${formData.detailedReasoning.id === option.id ? "border-t-2 border-b-[4px] bg-gray-50 border border-blue-500" : "border-t-2 border-b-[4px] border-gray-200"} w-full flex items-center gap-1 border-x-2 py-4 px-6 rounded-lg`}>
                        <p>{option.label}</p>
                    </div>
                ))}
            </div>

            <button onClick={handleNextBtn} className='mt-16 w-full flex justify-center items-center gap-3 bg-black text-white py-2 px-4 rounded-xl text-sm font-medium'>Next <img className='h-8' loading="lazy" src="https://img.icons8.com/windows/50/ffffff/long-arrow-right.png" alt="Long arrow" /></button>
        </div>
    );
};

export default Step7;