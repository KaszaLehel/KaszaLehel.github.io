window.addEventListener("load", () => {
    const output = document.getElementById("output");
    const input = document.getElementById("input");
    const inputLine = document.getElementById("input-line");
    const terminal = document.getElementById("commands");
    const content = document.getElementById("content");


    let currentMessage = "";
    let index = 0;

    let commands = "";
    let retryCount = 0;
/*  
    fetch('commands.json')
        .then(response => response.json())
        .then(data => {
            commands = data;
        })
        .catch(error => {
            console.error("Hiba a parancsok betöltése közben:", error);
        });
*/
        function loadCommands() {
            fetch('JSON/commands.json')
                .then(response => {
                    if (!response.ok) throw new Error("HTTP hiba: " + response.status);
                    return response.json();
                })
                .then(data => {
                    commands = data;
                    console.log(commands);
                })
                .catch(error => {
                    console.error("Hiba a parancsok betöltése közben:", error);
                    retryCount++;
                    if (retryCount <= 5) {
                        console.log(`Újrapróbálás ${retryCount}. alkalommal...`);
                        setTimeout(loadCommands, 1500); 
                    } else {
                        console.error("A parancsok betöltése sikertelen. Kérjük, frissítse az oldalt.");
                    }
                });
        }
    
    loadCommands();

    setTimeout(() => {
        terminal.classList.add('visible');
        inputLine.disabled = true;
        inputLine.classList.add('invisible');
        
        let initialMessage = '[Version 10.0.22631.4602]\n';
        typeMessage(initialMessage, 60, () => {
            inputLine.classList.remove('invisible');
            inputLine.disabled = false; 
            input.focus(); 
            
        });
    }, 2200);

    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            let userInput = input.value.trim().toLowerCase();
            input.value = ''; 

            output.innerHTML += `C:/> ${userInput}\n`;

            if (userInput === 'exit' || userInput === 'Exit') {
                console.log("EXIT");
                typeMessage(commands[userInput].short + '\n');
                content.innerHTML = commands[userInput].long;
                input.disabled = true;
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500); 
            }else if(userInput === 'help' || userInput === 'Help'){
                listCommands();
            }else if (commands[userInput]) {
                typeMessage(commands[userInput].short + '\n', 60, () => {
                    setTimeout(() => {
                        content.innerHTML = commands[userInput].long;
                    }, 1000);
                });
            } else {
                typeMessage('Error: Invalid command. Type "help" for a list of commands.\n');
            }
            output.scrollTop = output.scrollHeight;
            limitOutputLines();
        }
    });

    function listCommands() {
        let commandList = Object.keys(commands).map(command => `++${command}++`).join('\n');
        typeMessage(`Available commands:\n\n${commandList}\n\n`);
    }

    function typeMessage(message, speed = 60, callback = null) {
        isTyping = true; 
        let index =0;
        currentMessage = message;
        inputLine.classList.add('invisible');

        function type() {
            if (index < message.length) {
                output.innerHTML += message.charAt(index);
                index++;
                output.scrollTop = output.scrollHeight;
                limitOutputLines();
                typingTimeout = setTimeout(type, speed); 
            } else {
                inputLine.classList.remove('invisible');
                isTyping = false;  
                input.focus(); 
                if (callback) {
                    callback(); 
                }
                limitOutputLines();
            }
        }
        type();
    }

    function limitOutputLines() {
     /*   
        const terminalHeight = terminal.clientHeight;
        const lineHeight = parseFloat(window.getComputedStyle(output).lineHeight);
        const maxLines = Math.floor(terminalHeight / lineHeight)-2;

        const lines = output.innerHTML.split('\n');

        if (lines.length > maxLines) {
            output.innerHTML = lines.slice(lines.length - maxLines).join('\n');
        }

        output.scrollTop = output.scrollHeight;
        */

        while (output.scrollHeight > terminal.clientHeight) {
            let lines = output.innerText.split('\n');
            let excessLines = Math.ceil((output.scrollHeight - terminal.clientHeight) / parseFloat(window.getComputedStyle(output).lineHeight));
            
            lines = lines.slice(excessLines);
            output.innerText = lines.join('\n');
        }
        
    }

    window.addEventListener('resize', () => {
        const currentWidth = window.innerWidth;
        const currentHeight = window.innerHeight;
        console.log(`Ablakméret változott: Szélesség: ${currentWidth}px, Magasság: ${currentHeight}px`);
        output.scrollTop = output.scrollHeight;
        limitOutputLines();
    });

    limitOutputLines();
});