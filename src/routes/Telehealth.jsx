import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Analytics } from '@vercel/analytics/react';

const Telehealth = () => {
    return (
        <div className='w-screen h-fit flex flex-col justify-center items-center px-10 relative'>
            <Navbar absolute={true} button={false}/>
            <div className='w-4/5 h-fit py-40'>
                <h1 className='mb-2 text-2xl font-medium text-center'>Telehealth Consent</h1>
                <p className='text-gray-500 text-xl mb-12 text-center'>Last updated September 25, 2024</p>

                <p>By using this service, I understand and agree with the following:</p>
<p>A telehealth visit is a remote medical consultation between a patient and a healthcare provider using electronic communication, such as video calls or phone calls, to diagnose, advise, or treat health conditions without an in-person meeting.</p>
<p>Benefits of Telehealth:<br />
Accessibility: Allows patients to receive medical care and consultation without the need to travel, especially beneficial for those in remote or underserved locations.<br />
Convenience: Patients can consult from the comfort of their home or workplace, reducing the need to take time off work or arrange transportation.<br />
Reduced Exposure: Limits potential exposure to infectious diseases in clinical settings, particularly beneficial during epidemics or pandemics.<br />
Continuity of Care: Ensures ongoing care for patients who might have mobility issues, transportation challenges, or other barriers to in-person visits.</p>
<p>Risks of Telehealth:<br />
Technical Issues: Connectivity problems, software glitches, or equipment malfunctions can interrupt consultations.<br />
Quality of Assessment: Some conditions might not be adequately assessed through video or digital communication, requiring an in-person visit for a thorough evaluation.<br />
Security Concerns: Despite encryption and security measures, there's a potential risk of a breach of confidentiality or cyberattacks.<br />
Misdiagnosis: Without a hands-on physical examination, there's a potential risk, though small, of misdiagnosis or oversight.<br />
Limitations in Emergency Situations: Telehealth is not suitable for emergencies. In case of a sudden severe condition, a patient should seek immediate in-person care.<br />
Dependency on Devices: The effectiveness of telehealth consultations depends on the proper functioning and accuracy of health monitoring devices used by the patient.</p>
<p>During a telehealth visit, various types of health information can be transmitted, including:</p>
<p>Medical History: This can encompass past surgeries, chronic illnesses, medications, allergies, and more.<br />
Symptoms: Patients can describe their current symptoms to the healthcare provider.<br />
Diagnostic Images: This can include X-rays, MRIs, CT scans, ultrasounds, and other imaging studies.<br />
Lab Results: Blood tests, urine tests, biopsy results, and other laboratory findings can be shared.<br />
Physical Examination Findings: Though limited compared to an in-person visit, some physical examination components can be conducted via video, such as observing a rash or assessing movement of a joint.<br />
Medication Prescriptions: Providers can prescribe or adjust medications based on the consultation.<br />
Treatment Plans: Recommendations for treatment or management of conditions.<br />
Mental Health Assessments: Discussions about mood, feelings, thoughts, and behaviors.<br />
Health Education: Providers can give information and advice about disease prevention, wellness, and lifestyle choices.</p>
<p>The laws that protect the privacy and confidentiality of health and care information also apply to telehealth. Information obtained during telehealth that identifies me will not be given to anyone without my consent except for the purposes of treatment, education, and healthcare operations.</p>
<p>By agreeing to use the telehealth services, I am consenting to OnlineMed's sharing of my protected health information with certain third parties, including pharmacies and lab services. I understand, agree, and expressly consent to OnlineMed obtaining, using, storing, and disseminating to necessary third parties, information about me as necessary to provide the telehealth services.</p>
<p>As with any Internet-based communication, I understand that there is a risk of security breach. Electronic systems used will incorporate network and software security protocols to protect the confidentiality of patient identification and imaging data and will include measures to safeguard the data and to ensure its integrity against intentional or unintentional corruption.</p>
<p>Telehealth sessions may not always be possible. Disruptions of signals or problems with the Internet's infrastructure may cause broadcast and reception problems (e.g., poor picture or sound quality, dropped connections, audio interference) that prevent effective interaction between consulting clinician(s) and patients. I hereby release and hold harmless OnlineMed and all members of my care team from any loss of data or information due to technical failures associated with the telehealth service.</p>
<p>I understand and agree that the health information I provide at the time of my telehealth/telemedicine service may be the only source of health information used by the medical professionals during the course of my evaluation and treatment at the time of my telehealth visit, and that such professionals may not have access to my full medical record or information.</p>
<p>I understand that I will be given information about test(s), treatments(s) and procedures(s), as applicable, including the benefits, risks, possible problems or complications, and alternate choices for my medical care through the telehealth/telemedicine visit. I have the right to withhold or withdraw consent to the use of telehealth/telemedicine services at any time.</p>
<p>All my questions have been answered to my satisfaction</p>
            </div>

            <Footer absolute={true}/>
            
            <Analytics />
        </div>
    );
};

export default Telehealth;