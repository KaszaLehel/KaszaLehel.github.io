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
        if (window.innerWidth <= 3000 || window.innerHeight <= 3000) { //window.innerWidth <= 1024 || window.innerHeight <= 600
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

let currentIndex = 0;



const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        
        if (entry.isIntersecting) {
            //console.log(entry.target.id + ' szekció látható!');
            currentIndex = Array.from(sections).indexOf(entry.target);
            //console.log(currentIndex);

            if (currentIndex == 3) { //entry.target.id === 'projects'
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
            
            if (currentIndex == 0) //entry.target.id === 'person'
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
    threshold: 0.3,
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





const distanceThreshold = 300;
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
            //console.log('Az egér közel van a menu elemhez!');
            menuItems.forEach(item => item.classList.add('visible'));
        } else {
            //console.log('Az egér nincs közel a menu elemhez.');
            menuItems.forEach(item => item.classList.remove('visible'));
        }
    }
});


    function setFullHeight(){
        const fullHeightDiv = document.getElementById('content');
        //console.log(`${window.innerHeight}px`);
        fullHeightDiv.style.height = `${window.innerHeight}px`;
    }

    window.addEventListener('load', setFullHeight);
    window.addEventListener('resize', setFullHeight);



    document.addEventListener('keydown', (event) => {
        if (event.key === 'ArrowDown') {
            // Lefelé nyíl: Következő szekcióra ugrik
            if (currentIndex < sections.length - 1) {
                currentIndex++;
                sections[currentIndex].scrollIntoView({ behavior: 'smooth' });
            }
        } else if (event.key === 'ArrowUp') {
            // Felfelé nyíl: Előző szekcióra ugrik
            if (currentIndex > 0) {
                currentIndex--;
                sections[currentIndex].scrollIntoView({ behavior: 'smooth' });
            }
        }
    });





});







