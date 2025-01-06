
window.addEventListener("load", () => {

    const userAgent = navigator.userAgent.toLowerCase();
    if (/android|iphone|ipad|ipod|blackberry|opera mini|iemobile|mobile|tablet/.test(userAgent)) {
        document.body.innerHTML = "<h1>Can only be opened on a computer and in full screen page.</h1>";
    }

    if (window.innerWidth <= 1024 || window.innerHeight <= 600) {
        alert("Can only be opened on a computer and in full screen page.");
        window.location.href = "https://kaszalehel.github.io/";
    }
    console.log(window.innerWidth, window.innerHeight);

    const felsoTerminal = document.getElementById("felso-terminal");
    const iras = document.getElementById("iras");
    const kozepsoTerminal = document.getElementById("kozepso-terminal");
    const oldalsoTerminal = document.getElementById("oldalso-termianl");
    const felsoIdo = document.getElementById("felso-ido");

    const module = document.getElementById("azonosito");
    const autodecount = document.getElementById("autodecount");
    const autodecount1 = document.getElementById("autodecount1");
    const berserk = document.getElementById("berserk");

    const doubleplusIcons = document.querySelectorAll(".doubleplus-icon");
    console.log(doubleplusIcons);

    const line = document.getElementById("line");
    const horizontalLine = document.getElementById("horizontalLine");
    let height = 0;
    let width = 0;
    let maxHeight; 
    let maxWidth;

    const message = "Initiating terminal K.Lehel..."; 
    const moduleMessage = "module";
    let autodecountMessage = "";
    const autodecountMessage1 = "request";

    let index = 0;
    let moduleIndex = 0;
    let autodecountIndex = 0;
    let autodecountIndex1 = 0;

    const cursor = document.createElement("span");
    cursor.id = "cursor";
    iras.appendChild(cursor);

    setTimeout(() => {
        showWithBorder(felsoTerminal, () => {

        });

    }, 0);

    setTimeout(() => {
        showWithBorder(felsoIdo);
        showWithBorder(module);
        showWithBorder(autodecount);
        showOrangeBorder(berserk);
        animateLine();

        autodecount1.style.opacity = "1";
        autodecount1.style.transform = "scale(1)"

        doubleplusIcons.forEach(icon => {
            icon.style.opacity = "1";
            icon.style.transform = "scale(1)";
        });

    }, 750);

    setTimeout(() => {
        showWithBorder(kozepsoTerminal);
    }, 125);

    setTimeout(() => {
        showWithBorder(oldalsoTerminal);   
        
    }, 250);

    setTimeout(typeText, 1000);
    setTimeout(updateTime, 1750); 
    setTimeout(typeModuel, 1750);
    setTimeout(typeAuto, 1750);
    setTimeout(() => {
        maxHeight = 20; //oldalsoTerminal.offsetHeight * 0.2; 
        maxWidth = 5; //oldalsoTerminal.offsetWidth * 0.05;
        animateLine(); 
    }, 1500);

    function showWithBorder(element, callback) {
        element.style.opacity = "1";
        element.style.transform = "scale(1)";
        element.style.border = "2px solid rgba(0, 255, 0, 0.7)";
        element.style.animation = "borderRun 0.5s forwards";
        if (callback) setTimeout(callback, 500);
    }

    function showOrangeBorder(element, callback){
        element.style.opacity = "1";
        element.style.transform = "scale(1)";
        element.style.border = "2px solid rgba(255, 76, 37, 0.7)";
        element.style.animation = "borderRunOrange 0.5s forwards";
        if (callback) setTimeout(callback, 500);
    }

    function typeText()
    {
        if (index < message.length) 
        {
            iras.textContent += message[index];
            iras.appendChild(cursor);
            index++;
            setTimeout(typeText, 75); 
        }else
        {
            setTimeout(() => {
                cursor.style.opacity = 0;
                cursor.style.animation = "none";
            }, 1000);
        }
    }

    function typeModuel()
    {
        if(moduleIndex < moduleMessage.length)
        {
            module.textContent += moduleMessage[moduleIndex];
            moduleIndex++;
            setTimeout(typeModuel, 100);
        }
    }

    fetch("https://api.ipify.org?format=json")
    .then(response => response.json())
    .then(data => {
        autodecountMessage = `${data.ip}`;
        setTimeout(typeAutodecount, 1750); 
    })
    .catch(error => {
        console.error("IP lekérése sikertelen:", error);
        autodecountMessage = "125.24.26.365";
        setTimeout(typeAutodecount, 1750);
    });

    function typeAutodecount()
    {
        if(autodecountIndex< autodecountMessage.length)
        {
            autodecount.textContent += autodecountMessage[autodecountIndex];
            autodecountIndex++;
            setTimeout(typeAutodecount, 100);
        }
    }

    function typeAuto()
    {
        if(autodecountIndex1< autodecountMessage1.length)
        {
            autodecount1.textContent += autodecountMessage1[autodecountIndex1];
            autodecountIndex1++;
            setTimeout(typeAuto, 100);
        }
    }


    function animateLine() {

        verticalStep();

        function verticalStep() {
            if (height < maxHeight) {
                height += 0.7;
                line.style.height = height + "%";
                requestAnimationFrame(verticalStep);
            } else {
                horizontalLine.style.top = maxHeight + "%"; 
                requestAnimationFrame(horizontalStep);
            }
        }
    
        function horizontalStep() {
            if (width < maxWidth) {
                width += 0.7;
                horizontalLine.style.width = width + "%";
                requestAnimationFrame(horizontalStep);
            }
        }
        
    }


    function updateTime() {
        const now = new Date();
        let hours = String(now.getHours()).padStart(2, "0");
        let minutes = String(now.getMinutes()).padStart(2, "0");
        let seconds = String(now.getSeconds()).padStart(2, "0");
        let timeString = `opened: ${hours}:${minutes}:${seconds}`;

        let timeIndex = 0;

        function typeTime() {
            if (timeIndex < timeString.length) {
                felsoIdo.textContent += timeString[timeIndex];
                timeIndex++;
                setTimeout(typeTime, 75);
            }
        }

        
        felsoIdo.textContent = ""; 
        typeTime();
    }


});

