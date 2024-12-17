import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Analytics } from '@vercel/analytics/react';

const Hipaa = () => {
    return (
        <div className='w-screen h-fit flex flex-col justify-center items-center px-10 relative'>
            <Navbar absolute={true} button={false}/>
            <div className='w-4/5 h-fit py-40'>
                <h1 className='mb-2 text-2xl font-medium text-center'>HIPAA Consent Agreement for Email, Telephone, and Fax Communications</h1>
                <p className='text-gray-500 text-xl mb-12 text-center'>Last updated September 25, 2024</p>

<p>Patient Consent for Email and Telephone Communication</p>
<p>As part of our commitment to providing the best care and service, we occasionally need to send Protected Health Information (PHI) via email, telephone, and fax. This agreement seeks your consent to use these methods for certain communications related to your healthcare.</p>
<p>Understanding HIPAA and Communication Risks</p>
<p>The Health Insurance Portability and Accountability Act (HIPAA) establishes standards for the protection of health information. While we strive to ensure the security and confidentiality of your PHI, it is important to understand the inherent risks associated with email, fax, and telephone communications, including but not limited to:</p>
<p>Emails, faxes, and phone calls may be intercepted, altered, or used without authorization or detection.<br />
Emails and faxes may be accidentally sent to the wrong recipient.<br />
Telephone conversations may be overheard by others.<br />
Email, fax, and phone communications may be used for purposes not intended or authorized by the patient.</p>
<p>Our Communication Practices</p>
<p>We will only send emails, faxes, and make phone calls that are appropriate for delivering your documents, verifying the authenticity of your documents, diagnosis or other healthcare-related reasons. These may include:<br />
Emailing your requested documents<br />
Verifying the validity of documents at your employer's request<br />
Treatment plans and follow-up instructions<br />
Billing communications<br />
Health education materials</p>
<p>Patient Consent</p>
<p>By requesting an excuse note with OnlineMed, you acknowledge that you understand the risks associated with email and telephone communications and agree to the following:</p>
<p>I consent to the use of email, fax, and telephone for communication of my PHI.</p>
<p>I understand that emails, faxes, and phone calls to or from my healthcare provider may contain sensitive health information and that the security of these communications cannot be guaranteed.</p>
<p>I agree to notify my healthcare provider immediately if my email address or phone number changes or if I become aware of any security breaches or inappropriate use of my email or phone.</p>
<p>Patient Acknowledgment</p>
<p>I have read and understand the above information and consent to email and telephone communication of my PHI.</p>
<p>For any questions or concerns regarding this consent form, please contact us at hello@OnlineMed.tech</p>
            </div>

            <Footer absolute={true}/>
            
            <Analytics />
        </div>
    );
};

export default Hipaa;