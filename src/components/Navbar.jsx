import React from 'react';
import { handleCtaClick } from '../handleCtaClick';

const Navbar = ({ absolute, button }) => {
    return (
        <nav className={`w-full h-10 flex items-center justify-between px-6 md:px-32 py-10 ${absolute ? 'absolute top-2' : ''}`}>
            <div className='flex gap-6 items-center'>
                <a className='text-3xl font-medium' href="/">OnlineMed</a>

                <div className='flex items-center gap-3 font-medium text-lg'>
                    <a className='' href="/">Home</a>
                    <a className='' href="/faq">FAQ</a>
                </div>
            </div>

            <button onClick={()=>handleCtaClick("navbar")} className={`${button === false ? 'hidden' : 'hidden md:block'} bg-black text-white py-3 px-5 rounded-xl font-medium`}>Get Your Doctors Note</button>
        </nav>
    );
};

export default Navbar;