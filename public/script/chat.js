const socket = io();
const sendMessage = document.getElementById('sendMessage');
const userMessage = document.getElementById('userMessage');
const usernameField = document.getElementById('username');
const messages = document.getElementById('messages');
const signup = document.getElementById('signup');
let username;

const submitButton = document.getElementById('submitButton');

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    socket.emit('chat message', document.getElementById('message').value);
});

socket.on('chat message broadcast', (msg) => {
    const li = document.createElement('li');
    li.textContent = msg;

    document.getElementById('messages').appendChild(li);
});

function getRandomWelcomeMessage(username) {
    const greetings = [
        'A wild @ appeared.',
        'Welcome, @. We hope you brought pizza.',
        'Good to see you, @.',
        '@ just landed.',
        '@ hopped into the chatroom.',
        'Welcome @. Say hi!',
        'Everyone welcome @!',
        '@ joined the party!',
        'Glad you are here @.'
    ];

    return greetings[Math.floor(Math.random() * greetings.length)].replace('@', username);
}