
document.addEventListener('DOMContentLoaded', () => {
    const cakeDiv = document.getElementById('cakeDiv');
    
    
    if (cakeDiv) {
        setTimeout(() => {
            window.location.href = 'candles.html';
        }, 3000); 
    }
});