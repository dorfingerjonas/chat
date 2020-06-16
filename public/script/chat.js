const socket = io();

const submitButton = document.getElementById('submitButton');

submitButton.addEventListener('click', (event) => {
    event.preventDefault();
    socket.emit('chat message', document.getElementById('message').value);
});