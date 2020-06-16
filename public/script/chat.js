const socket = io();

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