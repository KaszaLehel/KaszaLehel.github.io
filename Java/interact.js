window.addEventListener("load", () => {
    const output = document.getElementById("output");
    const input = document.getElementById("input");
    const inputLine = document.getElementById("input-line");
    const terminal = document.getElementById("commands");
    const content = document.getElementById("content");


    let currentMessage = "";
    let index = 0;

    let commands = "";

    fetch('commands.json')
        .then(response => response.json())
        .then(data => {
            commands = data;
        })
        .catch(error => {
            console.error("Hiba a parancsok betöltése közben:", error);
        });


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
            let userInput = input.value.trim();
            input.value = ''; 

            output.innerHTML += `C:/> ${userInput}\n`;

            if (userInput === 'exit' || userInput === 'Exit') {
                typeMessage(commands[userInput] + '\n');
                input.disabled = true;
                setTimeout(() => {
                    console.log("EXIT");
                    //window.location.href = 'index.html';
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
                //inputLine.disabled = false; 
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
        const terminalHeight = terminal.clientHeight;
        const lineHeight = parseFloat(window.getComputedStyle(output).lineHeight);
        const maxLines = Math.floor(terminalHeight / lineHeight)-2;

        const lines = output.innerHTML.split('\n');

        if (lines.length > maxLines) {
            output.innerHTML = lines.slice(lines.length - maxLines).join('\n');
        }
        output.scrollTop = output.scrollHeight;
    }

    window.addEventListener('resize', limitOutputLines);


});