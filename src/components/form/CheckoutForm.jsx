import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useStripe, useElements, PaymentElement } from '@stripe/react-stripe-js';


const CheckoutForm = (formData) => {
    const stripe = useStripe();
    const elements = useElements();
    const [isProcessing, setIsProcessing] = useState(false);

    const handleSubmit = async () => {
        if(!stripe || !elements) return;

        setIsProcessing(true);

        const {error, paymentIntent} = await stripe.confirmPayment({
            redirect: 'if_required',
            elements,
            confirmParams: {
                return_url: `${window.location.origin}/confirmed`,
            }
        });

        if(error) {
            console.log(error);
        }

        if (paymentIntent && paymentIntent.status === 'succeeded') {
            console.log('Success!');
            try {
                const testFormData = {
                    firstName: 'tim',
                    lastName: 'duncan',
                    pronouns: { id: 1, label: 'He/Him/His' },
                    state: 'Texas',
                    purpose: { id: 1, label: 'Work' },
                    reasoning: { id: 2, label: 'Illness' },
                    detailedReasoning: { id: 3, label: 'Stomach Bug' },
                    symptoms: 'j',
                    conditionDisclosure: { id: 1, label: 'Yes' },
                    cannotSupport: { id: 1, label: 'I accept' },
                    startDate: '2024-12-13T05:00:00.000Z',
                    returnDate: '2024-12-15T05:00:00.000Z',
                    additionalInfo: '',
                    email: 'topperbrown2k@gmail.com',
                    finalReview: { id: 1, label: 'I accept' }
                };

                const transformObject = (inputObj) => {
                    const transformed = {};
                    
                    for (const [key, value] of Object.entries(inputObj)) {
                      // Check if the value is an object with a label property
                      if (value && typeof value === 'object' && 'label' in value) {
                        transformed[key] = value.label;
                      } else {
                        transformed[key] = value;
                      }
                    }
                    
                    return transformed;
                };

                try {
                    await axios.post('https://doctorsnotev2backend.onrender.com/typeformV5', transformObject(testFormData));

                    setIsProcessing(false);

                    window.location.href = '/confirmed';
                } catch (error) {
                    console.log(error);
                }
            } catch (error) {
                console.log(error);
            }
        };

        setIsProcessing(false);
    }
    
    return (
        <form>  
            <PaymentElement />
            <button onClick={handleSubmit} disabled={isProcessing} className='mt-10 mb-14 z-20 w-full flex justify-center items-center gap-3 bg-black text-white py-2 px-4 rounded-xl font-medium'>{!isProcessing ? "Complete Purchase" : "Processing..."} <img className={!isProcessing ? 'h-8' : 'hidden'} loading="lazy" src="https://img.icons8.com/windows/50/ffffff/long-arrow-right.png" alt="Long arrow" /></button>
        </form>
    );
};

export default CheckoutForm;