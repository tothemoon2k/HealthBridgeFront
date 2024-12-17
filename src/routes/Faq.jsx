import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import { track } from '@vercel/analytics';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import bg from "../../public/assets/bg.webp";
import whiteCircle from "../../public/assets/whiteCircle.png";
import star7 from "../../public/assets/star-7.png";
import { handleCtaClick } from '../handleCtaClick';

const Faq = () => {
    return (
        <div className="w-screen h-fit relative overflow-hidden px-8 md:px-0 flex flex-col items-center">
            <img className="w-screen absolute -z-10" src={bg} alt="Background pattern" />
            <Navbar />

            <h1 className="md:px-12 mt-12 md:mt-16 text-5xl font-medium md:text-center">
                You ask... <br className="hidden md:block" /> we answer!
            </h1>
            <p className="mt-3 md:text-lg md:text-center">
                Every answer you need, minus the endless searching. <br />If your question is not answered here, please email us at <span className='text-blue-600 font-medium'>support@onlinemed.tech</span>.
            </p>

            <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">

                <div className="max-w-2xl mx-auto mb-10 lg:mb-14">
                    <h2 className="text-2xl font-medium md:text-4xl md:leading-tight">You might be wondering...</h2>
                </div>

                <div className="max-w-2xl mx-auto divide-y divide-gray-200">
                    <div className="py-8 first:pt-0 last:pb-0">
                        <div className="flex gap-x-5">
                            <svg className="shrink-0 mt-1 size-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>

                            <div className="grow">
                            <h3 className="md:text-lg font-semibold text-gray-800">
                                Is this note legit?
                            </h3>
                            <p className="mt-1 text-gray-500">
                            Yes, all our notes are legitimate, verifiable doctor's excuse notes. Each note comes from a licensed and certified doctor who has reviewed your case. Our physicians are well-versed in creating properly formatted notes that meet standard requirements for both employers and educational institutions.
                            </p>
                            </div>
                        </div>
                    </div>

                    <div className="py-8 first:pt-0 last:pb-0">
                        <div className="flex gap-x-5">
                            <svg className="shrink-0 mt-1 size-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>

                            <div className="grow">
                            <h3 className="md:text-lg font-semibold text-gray-800">
                                What should I do if I haven't received my note?
                            </h3>
                            <p className="mt-1 text-gray-500">
                                Typically, you should receive your note within 5 mins after checkout. However, it can take up to 10 mins during peak hours. If it hasn't arrived after 10 mins, try these troubleshooting steps:
                                <br />
                                <br />
                                Check your email storage capacity
                                <br />
                                Look through your main inbox carefully
                                <br />
                                Use your email's search function with terms like "doctor's note" or "OnlineMed"
                                <br />
                                Review your spam/junk folders
                                <br />
                                Look in other email folders like "Updates" or "Promotions"
                                <br />
                                <br />
                                Still no luck? Contact hello@onlinemed.tech or call us at (984) 204-7128 and we'll send it to a different email address.
                            </p>
                            </div>
                        </div>
                    </div>

                    <div className="py-8 first:pt-0 last:pb-0">
                        <div className="flex gap-x-5">
                            <svg className="shrink-0 mt-1 size-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>

                            <div className="grow">
                            <h3 className="md:text-lg font-semibold text-gray-800">
                                What kinds of health conditions can I get an excuse note for?
                            </h3>
                            <p className="mt-1 text-gray-500">
                                Our service is designed for patients with mild, self-limiting conditions such as common respiratory viruses, stomach upset, and symptoms of previously diagnosed chronic conditions like migraines. We also provide notes for the care of a family member or child, as well as for absences due to medical appointments. Please email us at hello@onlinemed.tech if you have questions about whether our service is appropriate for your condition.
                            </p>
                            </div>
                        </div>
                    </div>

                    <div className="py-8 first:pt-0 last:pb-0">
                        <div className="flex gap-x-5">
                            <svg className="shrink-0 mt-1 size-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>

                            <div className="grow">
                            <h3 className="md:text-lg font-semibold text-gray-800">
                                What happens if my employer or school calls the number on the note?
                            </h3>
                            <p className="mt-1 text-gray-500">
                                If your employer calls the number on the note, they will be connected to our support team. We will confirm the name of the healthcare professional who conducted the evaluation, the date of the evaluation, the specific dates recommended for your absence, and your expected return to work date. During this verification process, we maintain a high level of confidentiality and professionalism. We do not disclose detailed personal medical information."
                            </p>
                            </div>
                        </div>
                    </div>

                    <div className="py-8 first:pt-0 last:pb-0">
                        <div className="flex gap-x-5">
                            <svg className="shrink-0 mt-1 size-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>

                            <div className="grow">
                            <h3 className="md:text-lg font-semibold text-gray-800">
                                Why isn't my doctor located in my state or city?
                            </h3>
                            <p className="mt-1 text-gray-500">
                                The doctor who evaluated your case and provided your document is fully licensed and qualified to provide telehealth services to patients in your state. It's quite common for telehealth practitioners to hold licenses in multiple states, allowing them to offer their services across state lines.
                            </p>
                            </div>
                        </div>
                    </div>

                    <div className="py-8 first:pt-0 last:pb-0">
                        <div className="flex gap-x-5">
                            <svg className="shrink-0 mt-1 size-6 text-gray-500" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>

                            <div className="grow">
                                <h3 className="md:text-lg font-semibold text-gray-800">
                                    Can I get a refund of my payment?
                                </h3>
                                <p className="mt-1 text-gray-500">
                                    Yes, a refund is available for first-time patients who are dissatisfied with their note.  To be eligible for a refund, you must request it within 24 hours of your note being issued. Once your payment has been refunded, your note will be invalidated and we will no longer be able to verify it by phone. Refunds are only available for first-time users of our service. If you meet these conditions, please contact us to process your refund.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className='mt-24 md:mt-36 mx-auto md:w-4/5 py-40 px-8 md:px-20 bg-black flex flex-col rounded-xl relative overflow-hidden'>
                <h3 className='text-white text-4xl font-semibold'>Ready To Get Your Note?</h3>
                <p className='mt-4 mb-5 md:mt-2 md:mb-3.5 text-lg text-gray-400'>Our service ensures you receive a legitimate and verifiable note in minutes, so you can focus on your recovery without any added stress.</p>
                <button onClick={()=>handleCtaClick("faq-page")} className='z-10 w-fit bg-white py-3 px-5 rounded-xl font-medium'>Get Your Doctors Note</button>

                <img className='hidden md:block absolute -top-[60%] -right-[20%] h-[120%] object-cover' src={whiteCircle} alt="White circle designs" />
                <img className='hidden md:block absolute -bottom-[75%] -left-[20%] h-[120%] object-cover' src={whiteCircle} alt="White circle designs" />
                <img className='absolute h-14 left-[55%] top-[10%] rotate-[10deg] object-cover' src={star7} alt="White star icon" />
                <img className='absolute h-10 right-[62%] bottom-[15%] rotate-[-25deg] object-cover' src={star7} alt="Whit star icon" />
            </section>

            <Footer />

            <Analytics/>
        </div>    
    )
};

export default Faq;