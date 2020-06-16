const socket = io();
const sendMessage = document.getElementById('sendMessage');
const userMessage = document.getElementById('userMessage');
const usernameField = document.getElementById('username');
const messages = document.getElementById('messages');
const signup = document.getElementById('signup');
const msgIds = [];
let username;

signup.addEventListener('click', () => {
    const accountView = document.getElementById('accountView');
    const chatView = document.getElementById('chatView');

    if (usernameField.value.trim() !== '') {
        username = usernameField.value;

        while (messages.firstChild) {
            messages.removeChild(messages.firstChild);
        }

        accountView.classList.add('hide');
        chatView.classList.remove('hide');

        socket.emit('new user', username);
    }
});

sendMessage.addEventListener('click', (event) => {
    const msgId = new Date().getTime();
    msgIds.push(msgId);
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
        'Swoooosh. @ just landed.',
        '@ hopped into the chatroom. Kangaroo!!',
        'Welcome @. Say hi!',
        'Everyone welcome @!',
        '@ joined the party!',
        'Glad you are here, @.',
        '@ just showed up!',
        '@ is here.',
        '@ just joined. Everyone, look busy!',
        'Welcome, @. Stay a while and listen.',
        'Welcome, @. We were expecting you ( ͡° ͜ʖ ͡°)',
        '@ just joined. Hide your bananas.',
        '@ just showed up. Hold my beer.'
    ];

    return greetings[Math.floor(Math.random() * greetings.length)].replace('@', username);
}