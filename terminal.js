window.onload = function() {
    const output = document.getElementById('output');
    const input = document.getElementById('input');

    const commands = {
        'help': 'Available commands: help, start, exit',
        'start': 'Starting the system...',
        'exit': 'Exiting...'
    };

    let initialMessage = 'Welcome to the web terminal. Type "help" to see available commands.\n';
    typeMessage(initialMessage, 50, () => {
        input.focus();
    });

    input.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            let userInput = input.value.trim();
            input.value = '';

            output.innerHTML += `> ${userInput}\n`;

            if (commands[userInput]) {
                typeMessage(commands[userInput] + '\n');
            } else {
                typeMessage('Error: Invalid command. Type "help" for a list of commands.\n');
            }

            // Scroll to bottom
            output.scrollTop = output.scrollHeight;
        }
    });

    function typeMessage(message, speed = 50, callback = null) {
        let index = 0;

        function type() {
            if (index < message.length) {
                output.innerHTML += message.charAt(index);
                index++;
                setTimeout(type, speed);
            } else if (callback) {
                callback();
            }
        }

        type();
    }
};
