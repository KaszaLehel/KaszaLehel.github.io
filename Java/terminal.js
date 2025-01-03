window.onload = function() {
    const output = document.getElementById('output');
    const input = document.getElementById('input');

    const commands = {
        'help': 'Available commands: help, projects, informations, exit',
        'Help': 'Available commands: help, projects, informations, exit',
        'informations': 'Informations are under loading...',
        'Informations': 'Informations are under loading...',
        'projects': 'Projects are under uploading....',
        'Projects': 'Projects are under uploading....',
        'exit': 'Exiting...',
        'Exit': 'Exiting...'
    };

    let initialMessage = 'Welcome to the Kasza Lehel terminal. You can use the following commands: "help", "projects", informations, "exit".\n';
    let isTyping = false; 
    let typingTimeout = null; 

    // Első üzenet kiírása
    typeMessage(initialMessage, 50, () => {
        input.focus(); 
        input.disabled = false; 
    });

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
        }
    });

    function typeMessage(message, speed = 50, callback = null) {
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
            }
        }

        input.disabled = true; 
        type();
    }
};
