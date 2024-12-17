import React, { useState, Suspense, lazy } from 'react';
import logo from '../../../public/assets/fullOnlineMed.webp';
import Header from '../../components/form/Header';
import Footer from '../../components/Footer';

const steps = [
    lazy(() => import('../../components/form/steps/Step1')),
    lazy(() => import('../../components/form/steps/Step2')),
    lazy(() => import('../../components/form/steps/Step3')),
    lazy(() => import('../../components/form/steps/Step4')),
    lazy(() => import('../../components/form/steps/Step5')),
    lazy(() => import('../../components/form/steps/Step6')),
    lazy(() => import('../../components/form/steps/Step7')),
    lazy(() => import('../../components/form/steps/Step8')),
    lazy(() => import('../../components/form/steps/Step9')),
    lazy(() => import('../../components/form/steps/Step10')),
    lazy(() => import('../../components/form/steps/Step11')),
    lazy(() => import('../../components/form/steps/Step12')),
    lazy(() => import('../../components/form/steps/Step13')),
    lazy(() => import('../../components/form/steps/Step14')),
    lazy(() => import('../../components/form/steps/Step15')),
    lazy(() => import('../../components/form/steps/Step16')),
    lazy(() => import('../../components/form/steps/Step17')),
];

const Form = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        pronouns: '',
        state: 'Texas',
        purpose: '',
        reasoning: '',
        detailedReasoning: '',
        symptoms: '',
        conditionDisclosure: '',
        cannotSupport: '',
        startDate: new Date(),
        returnDate: '',
        additionalInfo: '',
        email: '',
        finalReview: '',
    });

    const handleNext = () => {
        setCurrentStep(currentStep + 1);
    };

    const handleBack = () => {
        console.log(currentStep);
        setCurrentStep(currentStep - 1);
    }

    const updateFormData = (newData) => {
        setFormData(newData);
        console.log(formData)
    };

    const StepComponent = steps[currentStep - 1];

    return (
        <div className='flex flex-col items-center md:justify-center w-screen h-screen relative form'>
            <nav className='md:absolute md:top-0 py-2 px-5 w-full h-fit'>
                <a href="/">
                    <img className='h-11 object-cover' src={logo} alt="" />
                </a>
            </nav>

            <div className={`${currentStep === 17 ? 'md:w-3/4' : 'md:w-[55%]'} w-full h-fit flex flex-col items-center md:justify-center md:pt-10 pb-14 md:pb-14 md:bg-gray-50 md:rounded-xl md:border border-gray-100 md:shadow-md`}>
                {currentStep !== 1 && currentStep !== 16 && <Header step={currentStep} back={handleBack}/>}
                <Suspense fallback={
                    <div className='flex'>
                        <p>{/* Loading... */}</p>
                    </div>
                }>
                    <StepComponent next={handleNext} formData={formData} updateFormData={updateFormData}/>
                </Suspense>
            </div>

            {/* <div className='absolute -bottom-5'>
                <Footer/>
            </div> */}
        </div>
    );
};

export default Form;