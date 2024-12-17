import React from 'react';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Analytics } from '@vercel/analytics/react';
import {Helmet} from "react-helmet";

const ThankYou = () => {
    const [showOptions, setShowOptions] = React.useState(false);

    const handleClick = () => {
        setShowOptions(true);
    };

    return (
        <div className='w-screen h-screen flex flex-col justify-center items-center px-10 relative'>
            <Helmet>
                <script async src="https://www.googletagmanager.com/gtag/js?id=AW-16749261252"></script>
                <script type="text/javascript">
                {`
                    window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                    gtag('config', 'AW-16749261252');
                `}
                </script>
                <script type="text/javascript">
                {`
                    gtag('event', 'conversion', {
                        'send_to': 'AW-16749261252/mfBOCLOu7-AZEMTj1bI-',
                        'value': 1.0,
                        'currency': 'USD'
                    });
                `}
                </script>
            </Helmet>

            <Navbar absolute={true} button={false}/>
            <div>
                <h1 className='mb-5 text-4xl md:text-5xl font-medium text-center'>Your're all set! 🎉✨</h1>
                <h2 className='mb-9 text-gray-600 text-center text-2xl md:text-3xl'>You should receive your note via email in the next 10 mins, <br /> thank you for choosing OnlineMed.</h2>

                <div className='flex flex-col items-center gap-10'>
                    <p className='text-blue-500 md:text-xl underline cursor-pointer' onClick={handleClick}>Haven't received your email after 10 mins? Click Here</p>

                    {showOptions && (
                        <div className='transition-opacity duration-500 ease-in-out opacity-100 flex flex-col items-center'>
                            <div className='flex gap-10'>
                                <div className='flex flex-col items-center h-168'>
                                    <button className='mb-2 w-fit flex items-center gap-3 bg-gray-300 text-black py-4 px-5 rounded-xl font-medium'>Contact Support <img className='h-6' src="https://img.icons8.com/external-vitaliy-gorbachev-fill-vitaly-gorbachev/80/external-call-center-agent-emergency-vitaliy-gorbachev-fill-vitaly-gorbachev-1.png" alt="Long arrow" /></button>
                                </div>

                                <div className='flex flex-col items-center h-168'>
                                    <button className='mb-2 w-fit flex items-center gap-3 bg-black text-white py-4 px-5 rounded-xl font-medium'>Resend Email <img className='h-6' src="https://img.icons8.com/ios-glyphs/100/ffffff/filled-sent.png" alt="Long arrow" /></button>
                                    <p className='pl-1 text-gray-600'>Resend email in 5:00</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <Footer absolute={true}/>
            
            <Analytics />
        </div>
    );
};

export default ThankYou;