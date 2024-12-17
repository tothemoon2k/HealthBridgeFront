import React, {useState, useEffect} from 'react';
import { CookiesProvider, useCookies, Cookies } from 'react-cookie';

const CheckoutCountdown = () => {
    const [cookies, setCookie] = useCookies(['timeLeft'])
    const [timeLeft, setTimeLeft] = useState(300);

    useEffect(() => {
        try {
            const existingTimeLeft = cookies['timeLeft'] ;
            if (existingTimeLeft) {
                setTimeLeft(existingTimeLeft);
            }
        } catch (err) {
          console.log('Error reading cookies: ' + err.message);
        }
      }, []);

      useEffect(() => {
        const timerInterval = setInterval(() => {
          setTimeLeft(timeLeft => timeLeft - 1);
          setCookie('timeLeft', timeLeft, { path: '/' });
        }, 1000);
    
        return () => clearInterval(timerInterval);
      }, [timeLeft]);

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;

        const paddedSeconds = remainingSeconds.toString().padStart(2, '0');
        
        return `${minutes}:${paddedSeconds}`;
    }

    return (
        <div>
            <p className='-ml-1 bg-[#0055FF] rounded-xl bg-opacity-25 px-4 py-1 text-sm'>Save <span className='font-medium'>$16</span> when you purchase in the next <span className='font-medium'>{formatTime(timeLeft)}</span></p>
        </div>
    );
};

export default CheckoutCountdown;