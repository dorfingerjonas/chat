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
    socket.emit('send message', {msg: userMessage.value, author: username, id: msgId});
    userMessage.value = '';
});

socket.on('message broadcast: new user', (user) => {
    const newRow = document.createElement('div');

    const text = document.createElement('p');
    text.textContent = getRandomWelcomeMessage(user);

    text.setAttribute('class', 'message');
    newRow.setAttribute('class', 'serverMessageRow message');

    newRow.appendChild(text);
    messages.appendChild(newRow);
});

socket.on('message broadcast', (data) => {
    const newRow = document.createElement('div');
    let classNames = '';
    
    const text = document.createElement('p');
    text.textContent = data.msg;
    
    if (msgIds.includes(data.id)) {
        classNames = 'ownMessageRow';
    } else {
        classNames = 'row';
    }
    
    text.setAttribute('class', 'message');
    newRow.setAttribute('class', classNames);
    
    newRow.appendChild(text);
    messages.appendChild(newRow);
});

socket.on('user counter', (counter) => {
    // TODO
    // print message useful
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