import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { track } from '@vercel/analytics';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import bg from "../../public/assets/bg.webp";
import whiteCircle from "../../public/assets/whiteCircle.png";
import star7 from "../../public/assets/star-7.png";
import doc1 from "../../public/assets/doc1.webp";
import doc2 from "../../public/assets/doc2.webp";
import doc3 from "../../public/assets/doc3.webp";
import doc4 from "../../public/assets/doc4.webp";
import doc5 from "../../public/assets/doc5.webp";
import { handleCtaClick } from '../handleCtaClick';


const OurTeam = () => {
    return (
        <div className='w-screen h-fit relative overflow-hidden px-8 md:px-0 flex flex-col items-center'>
            <img className='w-screen absolute -z-10' loading="lazy" src={bg} alt="Background pattern" />
            <Navbar />

            <h1 className='md:px-12 mt-12 md:mt-16 text-5xl font-medium md:text-center'>We are the people <br className='hidden md:block'/> who make up OnlineMed</h1>
            <p className='mt-3 md:text-lg md:text-center'>Our philosophy is simple; hire great people and give them <br className='hidden md:block'/> the resources and support to do their best work.</p>

            <section className='mt-14 md:mt-20 w-full h-fit'>
                <div className='w-full h-fit py-2 md:py-2 rounded-xl grid grid-cols-2 gap-5 lg:grid-cols-3 md:gap-8 md:px-6 justify-center justify-items-center'>
                    <div className='h-fit w-fit shrink-0 rounded-2xl hover:scale-105 transition-all'>
                        <img className='h-48 w-full md:h-80 md:w-72 object-cover rounded-xl' src={doc1} alt="" />
                        <div className='mt-3 w-full md:w-72'>
                            <p className='font-medium text-sm md:text-xl'>Dr. Kelvin Jackson, MD</p>
                            <p className='hidden md:block text-gray-600 text-sm md:text-base'>Medical Director</p>
                            <p className='mt-2 text-gray-600 text-sm md:text-base'>Dr. Kelvin Jackson obtained his bachelors degree at St. Francis University in 2015. He has over 9 years of experience in the medical field and is dedicated to providing exceptional care to his patients.</p>
                        </div>
                    </div>

                    <div className='h-fit w-fit shrink-0 rounded-2xl hover:scale-105 transition-all'>
                        <img className='h-48 w-full md:h-80 md:w-72 object-cover rounded-xl' src={doc2} alt="" />
                        <div className='mt-3 w-full md:w-72'>
                            <p className='font-medium text-sm md:text-xl'>Dr. Rajesh Kumar, MD</p>
                            <p className='hidden md:block text-gray-600 text-sm md:text-base'>Occupational Health Physician</p>
                            <p className='mt-2 text-gray-600 text-sm md:text-base'>Dr. Rajesh Kumar specializes in occupational health and has been instrumental in developing workplace health programs. He is passionate about promoting health and safety in the workplace.</p>
                        </div>
                    </div>

                    <div className='h-fit w-fit shrink-0 rounded-2xl hover:scale-105 transition-all'>
                        <img className='h-48 w-full md:h-80 md:w-72 object-cover rounded-xl' src={doc3} alt="" />
                        <div className='mt-3 w-full md:w-72'>
                            <p className='font-medium text-sm md:text-xl'>Dr. Lucy Crawford, DO</p>
                            <p className='hidden md:block text-gray-600 text-sm md:text-base'>Family Medicine Physician</p>
                            <p className='mt-2 text-gray-600 text-sm md:text-base'>Dr. Lucy Crawford is a family medicine physician who provides comprehensive care for patients of all ages. She is committed to building long-term relationships with her patients and their families.</p>
                        </div>
                    </div>

                    <div className='h-fit w-fit shrink-0 rounded-2xl hover:scale-105 transition-all'>
                        <img className='h-48 w-full md:h-80 md:w-72 object-cover rounded-xl' src={doc4} alt="" />
                        <div className='mt-3 w-full md:w-72'>
                            <p className='font-medium text-sm md:text-xl'>Dr. Elena Rodriguez, MD</p>
                            <p className='hidden md:block text-gray-600 text-sm md:text-base'>Urgent Care Specialist</p>
                            <p className='mt-2 text-gray-600 text-sm md:text-base'>Dr. Elena Rodriguez is an urgent care specialist with a focus on providing immediate and effective care for acute medical conditions. She is known for her quick decision-making and compassionate approach.</p>
                        </div>
                    </div>

                    <div className='h-fit w-fit shrink-0 rounded-2xl hover:scale-105 transition-all'>
                        <img className='h-48 w-full md:h-80 md:w-72 object-cover rounded-xl' src={doc5} alt="" />
                        <div className='mt-3 w-full md:w-72'>
                            <p className='font-medium text-sm md:text-xl'>Jacob Santana</p>
                            <p className='hidden md:block text-gray-600 text-sm md:text-base'>Customer Success Director</p>
                            <p className='mt-2 text-gray-600 text-sm md:text-base'>Jacob Santana is the Customer Success Director, ensuring that all patients have a seamless and positive experience. He is dedicated to addressing patient needs and improving service quality.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className='mt-16 md:mt-28 mx-auto md:w-4/5 py-32 px-8 md:px-20 bg-black flex flex-col rounded-xl relative overflow-hidden'>
                <h3 className='text-white text-4xl font-semibold'>Ready To Get Your Note?</h3>
                <p className='mt-4 mb-5 md:mt-2 md:mb-3.5 text-lg text-gray-400'>Our service ensures you receive a legitimate and verifiable note in minutes, so you can focus on your recovery without any added stress.</p>
                <button onClick={()=>handleCtaClick("our-team-page")} className='z-10 w-fit bg-white py-3 px-5 rounded-xl font-medium'>Get Your Doctors Note</button>

                <img className='hidden md:block absolute -top-[60%] -right-[20%] h-[120%] object-cover' src={whiteCircle} alt="White circle designs" />
                <img className='hidden md:block absolute -bottom-[75%] -left-[20%] h-[120%] object-cover' src={whiteCircle} alt="White circle designs" />
                <img className='absolute h-14 left-[55%] top-[10%] rotate-[10deg] object-cover' src={star7} alt="White star icon" />
                <img className='absolute h-10 right-[62%] bottom-[15%] rotate-[-25deg] object-cover' src={star7} alt="Whit star icon" />
            </section>

            <Footer/>

            <Analytics />
        </div>
    );
};

export default OurTeam;