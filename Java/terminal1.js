window.onload = function () {
    const output = document.getElementById("output");
    const input = document.getElementById("input");
    const inputLine = document.getElementById("input-line");
    const terminal = document.getElementById("terminal");

    let currentMessage = "";
    let index = 0;

    setTimeout(() => {
        terminal.classList.add('visible');
        inputLine.disabled = true;
        inputLine.classList.add('invisible');
        
        let initialMessage = 'Kasza Lehel terminal [Version 10.0.22631.4602]. You can use the following commands: "help", "projects", "informations", "exit".\n';
        typeMessage(initialMessage, 60, () => {
            inputLine.classList.remove('invisible');
            inputLine.disabled = false; 
            input.focus(); 
            
        });
    }, 200);

    const commands = {
        'help': 'Available commands: "help", "projects", "informations", "exit"',
        'Help': 'Available commands: "help", "projects", "informations", "exit"',
        'informations': 'Informations are under loading...',
        'Informations': 'Informations are under loading...',
        'projects': 'Projects are under uploading....',
        'Projects': 'Projects are under uploading....',
        'exit': 'Exiting...',
        'Exit': 'Exiting...'
    };

    let isTyping = false;
    let typingTimeout = null;

    function typeMessage(message, speed = 60, callback = null) {
        isTyping = true; 
        let index =0;
        currentMessage = message;
        //inputLine.disabled = true;
        inputLine.classList.add('invisible');

        function type() {
            if (index < message.length) {
                output.innerHTML += message.charAt(index);
                index++;
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

    let isFirstKeyPress = true;

    window.addEventListener('keydown', function(e) {
        if (isTyping && e.key === 'Enter') 
        {
            if(isFirstKeyPress)
            {
                clearTimeout(typingTimeout);
                let lines = output.innerHTML.split('\n');

            
                lines[lines.length - 1] = currentMessage;

            
                output.innerHTML = lines.join('\n'); 

                //output.innerHTML += currentMessage;
                isFirstKeyPress = false;
                inputLine.classList.remove('invisible');
                isTyping = false;

                input.disabled = false;
                input.focus();
                limitOutputLines();
            }
        }
    });


    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !isTyping) {
            let userInput = input.value.trim();
            input.value = ''; 

            output.innerHTML += `C:\\User> ${userInput}\n`;

            if (userInput === 'exit' || userInput === 'Exit') {
                typeMessage(commands[userInput] + '\n');
                input.disabled = true;
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1500); 
            } else if (commands[userInput]) {
                typeMessage(commands[userInput] + '\n');
            } else {
                typeMessage('Error: Invalid command. Type "help" for a list of commands.\n');
            }

            output.scrollTop = output.scrollHeight;
            limitOutputLines();
        }
    });

    function limitOutputLines() {
        const terminalHeight = terminal.clientHeight;
        const lineHeight = parseFloat(window.getComputedStyle(output).lineHeight);
        const maxLines = Math.floor(terminalHeight / lineHeight)-2;

        const lines = output.innerHTML.split('\n');

        if (lines.length > maxLines) {
            output.innerHTML = lines.slice(lines.length - maxLines).join('\n');
        }
    }

    window.addEventListener('resize', limitOutputLines);
  };