document.addEventListener('DOMContentLoaded', () => {
    let btn = document.querySelector('#button-style');
    let buttonContainer = document.querySelector('#button');
    
    btn.onmousemove = function(e) {
        let rect = btn.getBoundingClientRect(); 
        let x = e.clientX - rect.left; 
        let y = e.clientY - rect.top; 
        
        btn.style.setProperty('--x', `${x}px`);
        btn.style.setProperty('--y', `${y}px`);
    };

    function toggleButtonVisibility() {
        if (window.innerWidth <= 1024 || window.innerHeight <= 600) { 
            buttonContainer.style.visibility = 'hidden';
        } else {
            buttonContainer.style.visibility = 'visible';
        }
    }

    window.addEventListener('resize', toggleButtonVisibility);
    toggleButtonVisibility();
});
