let slidersState = {
    'slider-games': {
        active: 2,
        items: document.querySelectorAll('#slider-games .item'),
        isDragging: false,
        startX: 0,
        currentX: 0
    },
    'slider-design': {
        active: 0,
        items: document.querySelectorAll('#slider-design .item'),
        isDragging: false,
        startX: 0,
        currentX: 0
    },
    'slider-else': {
        active: 2,
        items: document.querySelectorAll('#slider-else .item'),
        isDragging: false,
        startX: 0,
        currentX: 0
    }
};



window.onload = function()
{
    loadShow("slider-games");
    loadShow("slider-design");
    loadShow("slider-else");

    let resizeTimeout;

    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout); 
        resizeTimeout = setTimeout(() => {
            loadShow("slider-games"); 
            loadShow("slider-design");
            loadShow("slider-else");
        }, 200); 
    });

    setupDragEvents("slider-games");
    setupDragEvents("slider-design");
    setupDragEvents("slider-else");

    showButtonText("slider-games");
    showButtonText("slider-design");
    showButtonText("slider-else");
};


//let next = document.getElementById('next');
//let prev = document.getElementById('prev');




function loadShow(sliderId)
{
    /*let items = document.querySelectorAll(`#${sliderId} .item`);
    let active = 0;*/

    const state = slidersState[sliderId];
    const items = state.items;
    const active = state.active;

    items.forEach(item => item.classList.remove('active'));

    requestAnimationFrame(() => {

    
    let stt = 0;
    items[active].classList.add('active');
    items[active].style.transform = `none`;
    items[active].style.zIndex = items.length + 1;
    items[active].style.filter = `none`;
    items[active].style.opacity = 1;

    let Width = items[active].offsetWidth;
    let leftPosition = `calc(50% - ${Width * 0.5}px)`;
    items[active].style.left = leftPosition;

    for(var i = active + 1; i< items.length; i++)
    {
        stt++;

        let Width = items[active].offsetWidth;
        let leftPosition = `calc(50% - ${Width * 0.5}px)`;
        items[i].style.left = leftPosition;

        items[i].style.transform = `translateX(${(Width * 0.5)*stt}px) scale(${1 - 0.2*stt}) perspective(16px) rotateY(-1deg)`;
        items[i].style.zIndex = items.length-stt;
        items[i].style.filter = `blur(5px)`;
        items[i].style.opacity = stt > 2 ? 0 : 0.4;
    }

    stt = 0;
    for(var i = active - 1; i >= 0; i--)
    {
        stt++;

        let Width = items[active].offsetWidth;
        let leftPosition = `calc(50% - ${Width * 0.5}px)`;
        items[i].style.left = leftPosition;

        items[i].style.transform = `translateX(${-(Width * 0.5)*stt}px) scale(${1 - 0.2*stt}) perspective(16px) rotateY(1deg)`;
        items[i].style.zIndex = items.length-stt;
        items[i].style.filter = `blur(5px)`;
        items[i].style.opacity = stt > 2 ? 0 : 0.4;
    }

    });
}

/*
next.onclick = function()
{
    active = active + 1 < items.length ? active + 1 : active;
    loadShow(); 
};

prev.onclick = function()
{
    active = active - 1 >= 0 ? active -1 : active;
    loadShow();
};
*/

function showButtonText(sliderId) {

    let state = slidersState[sliderId];
    const items = state.items;

    resetItems(sliderId);

    items.forEach((item, index) => {
        const hoverButton = item.querySelector(".info-button"); //info-button hover-button
        const hiddenText = item.querySelector(".hidden-text");
        const image = item.querySelector(".image");

        if (!hoverButton || !hiddenText || !image) return;

        if (index !== state.active) {
            image.style.opacity = 1;
            hiddenText.style.opacity = 0;
            hoverButton.style.visibility = 'visible';
            hiddenText.style.pointerEvents = 'none';
        }

        hoverButton.addEventListener("click", (event) => {
            event.preventDefault(); // Megakadályozza az alapértelmezett viselkedést
            event.stopPropagation(); // Megakadályozza az esemény továbbadását
            handleButtonClick(event);
        });
        
        hoverButton.addEventListener("touchstart", (event) => {
            event.preventDefault();
            event.stopPropagation();
            handleButtonClick(event);
        });
        
        hiddenText.addEventListener("click", (event) => {
            if (event.target.tagName === 'A')
            {
                console.log("Link clicked!");
                return;
            }
            else{
                console.log("HiddenText clicked!");
                handleHiddenTextClick(event);
            }
            
        });
        
        hiddenText.addEventListener("touchstart", (event) => {
            if (event.target.tagName === 'A')
            {
                console.log(" Mobile Link clicked!");
                return;
            }
            else{
                console.log("Mobile HiddenText clicked!");
                handleHiddenTextClick(event);
            }
        });

        function handleButtonClick(event) {
            if (index === state.active) {
                image.style.opacity = 0;
                hiddenText.style.opacity = 1;
                hoverButton.style.visibility = 'hidden';
                hiddenText.style.pointerEvents = 'auto';
            }
        }
        
        function handleHiddenTextClick(event) {
            if (index === state.active) {
                image.style.opacity = 1;
                hiddenText.style.opacity = 0;
                hoverButton.style.visibility = 'visible';
                hiddenText.style.pointerEvents = 'none';
            }
        }
/*
        hoverButton.addEventListener("click", (event) => {
            event.stopPropagation();
            if(index === state.active)
            {
                //console.log("ACTIVE: " + state.active);

                image.style.opacity = 0;
                hiddenText.style.opacity = 1;
                hoverButton.style.visibility = 'hidden';
                hiddenText.style.pointerEvents = 'auto';
            }
        });
*/

        hiddenText.addEventListener("click", (event) => {
            event.stopPropagation();
            if (index === state.active)
            {
                image.style.opacity = 1;
                hiddenText.style.opacity = 0;
                hoverButton.style.visibility = 'visible';
                hiddenText.style.pointerEvents = 'none';
            }
        });
    });

    loadShow(sliderId);

}

function resetItems(sliderId) {
    const state = slidersState[sliderId];
    const items = state.items;

    items.forEach((item, index) => {
        const hoverButton = item.querySelector(".info-button"); //hover-button
        const hiddenText = item.querySelector(".hidden-text");
        const image = item.querySelector(".image");

        if (!hoverButton || !hiddenText || !image) return;

        // Minden elem visszaállítása az alapállapotba
        image.style.opacity = 1;
        hiddenText.style.opacity = 0;
        hoverButton.style.visibility = 'visible';
        hiddenText.style.pointerEvents = 'none';
    });
}

function setupDragEvents(sliderId) {
    const state = slidersState[sliderId];
    const slider = document.querySelector(`#${sliderId}`); //('.slider')

    /*let startX = 0; 
    let currentX = 0; 
    let isDragging = false;*/

    slider.addEventListener("mousedown", startDrag);
    slider.addEventListener("mousemove", onDrag);
    slider.addEventListener("mouseup", endDrag);
    slider.addEventListener("mouseleave", endDrag);

    slider.addEventListener("touchstart", startDrag);
    slider.addEventListener("touchmove", onDrag);
    slider.addEventListener("touchend", endDrag);

    function startDrag(e) {
        state.isDragging = true;
        state.startX = e.type.includes("mouse") ? e.pageX : e.touches[0].pageX;
        state.currentX = state.startX;
    }

    function onDrag(e) {
        if (!state.isDragging) return;
        state.currentX = e.type.includes("mouse") ? e.pageX : e.touches[0].pageX;
        const deltaX = state.currentX - state.startX;
    
        state.items[state.active].style.transform = `translateX(${deltaX}px)`;
    }

    function endDrag() {

        if (!state.isDragging) return;
        state.isDragging = false;
        const deltaX = state.currentX - state.startX;
    
        if (deltaX < -50) {
            state.active = state.active + 1 < state.items.length ? state.active + 1 : state.active;
        }
        else if (deltaX > 50) {
            state.active = state.active - 1 >= 0 ? state.active - 1 : state.active;
        }

        resetItems(sliderId);
    
        loadShow(sliderId);
    }
}
