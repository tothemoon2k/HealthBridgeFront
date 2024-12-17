import React from 'react';

const Footer = ({ absolute }) => {
    return (
        <footer className={`${absolute ? 'absolute bottom-3' : ''} mt-32 mb-8 w-[85%] mx-auto bg-white rounded-lg shadow`}>
            <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                <span className="text-sm text-gray-500 sm:text-center">© 2024 <a href="https://flowbite.com/" className="hover:underline">OnlineMed™</a>. All Rights Reserved.
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 sm:mt-0">
                    <li>
                        <a href="/team" className="hover:underline me-4 md:me-6">About Us</a>
                    </li>
                    <li>
                        <a href="/privacy" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="/faq" className="hover:underline me-4 md:me-6">FAQ</a>
                    </li>
                    <li>
                        <a href="/terms" className="hover:underline">Terms & Conditions</a>
                    </li>
                </ul>
            </div>
        </footer>
    );
};

export default Footer;