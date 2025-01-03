window.onload = function() {
    const output = document.getElementById('output');
    const input = document.getElementById('input');
    const terminal = document.getElementById('terminal');

    
    setTimeout(() => {
        terminal.classList.add('visible');

        
        let initialMessage = 'Kasza Lehel terminal [Version 10.0.22631.4602]. You can use the following commands: "help", "projects", "informations", "exit".\n';
        typeMessage(initialMessage, 50, () => {
            input.focus(); 
            input.disabled = false; 
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

    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !isTyping) {
            let userInput = input.value.trim();
            input.value = ''; 

            output.innerHTML += `C:\\User> ${userInput}\n`;

            if (userInput === 'exit' || userInput === 'Exit') {
                typeMessage(commands[userInput] + '\n');
                
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

    function typeMessage(message, speed = 60, callback = null) {
        let index = 0;
        isTyping = true; 

        function type() {
            if (index < message.length) {
                output.innerHTML += message.charAt(index);
                index++;
                typingTimeout = setTimeout(type, speed); 
            } else {
                isTyping = false; 
                input.disabled = false; 
                input.focus(); 
                if (callback) {
                    callback(); 
                }
                limitOutputLines();
            }
        }

        input.disabled = true; 
        type();
    }

    function limitOutputLines() {
        const terminalHeight = terminal.clientHeight; // A terminál magassága
        const lineHeight = parseFloat(window.getComputedStyle(output).lineHeight); // Egy sor magassága
        const maxLines = Math.floor(terminalHeight / lineHeight)-2; // Maximális sorok száma

        const lines = output.innerHTML.split('\n');

        if (lines.length > maxLines) {
            output.innerHTML = lines.slice(lines.length - maxLines).join('\n');
        }
    }

    window.addEventListener('resize', limitOutputLines);
};
