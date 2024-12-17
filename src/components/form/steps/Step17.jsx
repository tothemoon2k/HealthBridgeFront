import React, {useState, useEffect} from 'react';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import {PaymentElement, useStripe, useElements} from '@stripe/react-stripe-js';
import axios from 'axios';
import CheckoutForm from '../CheckoutForm';
import CheckoutCountdown from '../CheckoutCountdown';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY || process.env.VITE_STRIPE_PUBLIC_KEY);

const Step17 = ({ next, formData, updateFormData }) => {
    const [clientSecret, setClientSecret] = useState('');

    useEffect(() => {
        const fetchPaymentIntent = async () => {
            const res = await axios.post('https://doctorsnotev2backend.onrender.com/create-payment-intent', {
                amount: 2900
            });
            setClientSecret(res.data.clientSecret);

            console.log(res.data.clientSecret);
        };
        fetchPaymentIntent();
    }, []);

    return (
        <div className='flex flex-col w-[80%] md:flex-row md:grid md:grid-cols-2 md:gap-10'>
            <div className='md:w-full'>
                <h1 className="mt-6 text-2xl font-medium">Complete Your Purchase</h1>

                <ul className='mt-6'>
                    <li className='flex gap-2'><img className='mt-0.5 h-5 object-cover' src="https://img.icons8.com/ios-filled/50/16A34A/checkmark--v1.png" alt="" />100% Employer Acceptance Rate</li>
                    <li className='flex gap-2'><img className='mt-0.5 h-5 object-cover' src="https://img.icons8.com/ios-filled/50/16A34A/checkmark--v1.png" alt="" />Fully Verifiable</li>
                    <li className='flex gap-2'><img className='mt-0.5 h-5 object-cover' src="https://img.icons8.com/ios-filled/50/16A34A/checkmark--v1.png" alt="" />5-minute delivery guaranteed or your money back</li>
                </ul>

                <div className='mt-8 h-fit w-full border border-gray-200 rounded-2xl'>
                    <div className='py-4 px-5 border-b border-gray-200'>
                        <p className='font-medium text-lg'>Checkout</p>
                    </div>

                    <div className='px-5 py-5 gap-4 flex flex-col border-b border-gray-200'>
                        <p className='text-sm'>Doctors Note (Fast Delivery)</p>
                        
                        <CheckoutCountdown />

                        {/* <button className='text-sm underline text-start'>
                            Add coupon code
                        </button> */}
                    </div>

                    <div className='flex justify-between px-5 py-4'>
                        <div className='flex flex-col gap-1.5'>
                            <p className='text-sm text-gray-500'>Taxes</p>
                            <p className='font-medium'>Total</p>
                        </div>

                        <div className='flex flex-col items-end gap-1.5'>
                            <p className='text-gray-500 text-sm'>$0</p>
                            <div className='flex items-baseline gap-2'>
                                <div className=''>
                                    <p className='text-sm font-medium text-red-500 line-through'>$45</p>
                                </div>

                                <p className='font-medium'>$29</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className='mt-10 md:mt-10 md:w-full'>
                <h2 className='text-lg font-medium md:hidden'>Payment</h2>

                <div className='mt-6 md:mt-0'>
                    {stripePromise && clientSecret &&(
                        <Elements stripe={stripePromise} options={{clientSecret}}>
                            <CheckoutForm formData={formData}/>
                        </Elements>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Step17;