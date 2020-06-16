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