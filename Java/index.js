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



const menuItems = document.querySelectorAll('.menu-item');
const menu = document.querySelector('#menu');
const sections = document.querySelectorAll('section'); 
const personSection = document.querySelector('#person');

let isMouseTrackingEnabled = false;




const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        
        if (entry.isIntersecting) {
            //console.log(entry.target.id + ' szekció látható!');

            if (entry.target.id === 'projects') {
                menuItems.forEach(item => {
                    item.classList.remove('white');
                    item.classList.add('black');
                });
            }else {
                menuItems.forEach(item => {
                    item.classList.remove('black');
                    item.classList.add('white');
                });
            }
            
            if (entry.target.id === 'person') 
            {
                menuItems.forEach(item => item.classList.remove('visible'));
                //console.log('LÁTHATATLAN');
                isMouseTrackingEnabled = true;
            } 
            else 
            {
                menuItems.forEach(item => item.classList.add('visible'));
                isMouseTrackingEnabled = false;
            }
        }
    });
}, {
    threshold: 0.5 
    });

    sections.forEach(section => {
    observer.observe(section);
});

    
    menuItems.forEach(item => {
        item.addEventListener('click', function () {
            const targetSection = document.getElementById(item.getAttribute('data-target'));
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });





const distanceThreshold = 100;
function isMouseNearElement(e) {
    const rect = menu.getBoundingClientRect();
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    if (
        mouseX >= rect.left - distanceThreshold &&
        mouseX <= rect.right + distanceThreshold &&
        mouseY >= rect.top - distanceThreshold &&
        mouseY <= rect.bottom + distanceThreshold
    ) {
        return true;  
    }
    return false;  
}

document.addEventListener('mousemove', (e) => {

    if (isMouseTrackingEnabled) {
        if (isMouseNearElement(e)) {
            //console.log('Az egér közel van a div elemhez!');
            menuItems.forEach(item => item.classList.add('visible'));
        } else {
            //console.log('Az egér nincs közel a div elemhez.');
            menuItems.forEach(item => item.classList.remove('visible'));
        }
    }
});


    function setFullHeight(){
        const fullHeightDiv = document.getElementById('content');
        console.log(`${window.innerHeight}px`);
        fullHeightDiv.style.height = `${window.innerHeight}px`;
    }

    window.addEventListener('load', setFullHeight);
    window.addEventListener('resize', setFullHeight);



});







