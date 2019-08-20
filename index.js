import scss from '@/scss/cui.scss';
import cui from '@/js';

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js').then(registration => {
            console.log('SW registered: ', registration);
        }).catch(registrationError => {
            console.log('SW registration failed: ', registrationError);
        });
    });
}
cui(window, {
    googleMapKey: 'key=AIzaSyBtspK44Jc-DabkyA6knFuQ6LSp_8VXZgc'
});