import React from 'react';

const Header = ({ step, back }) => {
    const handleBackBtn = () => {
        back();
    }

    return (
        <div className='mb-4 w-[80%] md:w-[80%] h-fit flex flex-col'>
            <div className='flex w-full justify-between items-center pb-4'>
                <img onClick={handleBackBtn} className='h-6 rotate-45 object-cover' src="https://img.icons8.com/windows/200/down-left-arrow.png" alt="" />

                <p className='bg-[#0055FF] text-sm bg-opacity-25 pt-2 pb-2 px-3 rounded-lg font-medium'>{step - 1}/{step < 8 ? 8 : step - 1}</p>
            </div>

            <div className="flex w-full h-1.5 bg-gray-200 rounded-full overflow-hidden" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
                <div className="flex flex-col justify-center rounded-full overflow-hidden bg-blue-600 text-xs text-white text-center whitespace-nowrap transition duration-500" style={{ width: `${Math.round(((step - 1) /10) * 100)}%` }}></div>
            </div>
        </div>
    );
};

export default Header;