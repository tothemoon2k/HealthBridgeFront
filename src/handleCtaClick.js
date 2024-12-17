import { Analytics, track } from '@vercel/analytics/react';

export const handleCtaClick = (location) => {
    track('cta_click', {
        location: location,
    });

    if(location.includes('b')) {
        window.location.href = '/form';
    } else {
        window.location.href = '/form';
    }
}