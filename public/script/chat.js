const socket = io();
const sendMessage = document.getElementById('sendMessage');
const userMessage = document.getElementById('userMessage');
const userCounter = document.getElementById('userCounter');
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

        userMessage.focus();
    }
});

window.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        if (document.activeElement.id === userMessage.id) {
            sendMessage.click();
        } else if (document.activeElement.id === usernameField.id) {
            signup.click();
        }
    }
});

sendMessage.addEventListener('click', (event) => {
    if (userMessage.value.trim() !== '') {
        const msgId = new Date().getTime();
        msgIds.push(msgId);
        event.preventDefault();
        socket.emit('send message', {msg: userMessage.value, author: username, id: msgId});
        userMessage.value = '';
        userMessage.focus();
    }
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
    let text;

    if (isUrl(data.msg)) {
        if (isImage(data.msg)) {
            text = document.createElement('img');
            text.src = data.msg;
        } else {
            text = document.createElement('a');
            text.href = data.msg;
        }
    } else {
        text = document.createElement('p');
    }

    text.textContent = data.msg;

    const time = document.createElement('span');
    const date = new Date(data.id);
    time.textContent = `${('0' + date.getHours()).slice(-2)}:${('0' + date.getMinutes()).slice(-2)}`;
    
    if (msgIds.includes(data.id)) {
        classNames = 'ownMessageRow';
    } else {
        classNames = 'row';

        const usernameText = document.createElement('span');
        usernameText.textContent = data.author;
        newRow.appendChild(usernameText);
    }
    
    text.setAttribute('class', 'message');
    newRow.setAttribute('class', classNames);
    
    newRow.appendChild(text);
    newRow.appendChild(time);
    messages.appendChild(newRow);

    messages.scrollTo({
        top: messages.scrollHeight,
        left: 0,
    });

});

socket.on('user counter', (counter) => {
    userCounter.textContent = `connected users: ${counter}`;
});

function getRandomWelcomeMessage(username) {
    const greetings = [
        `A wild ${username} appeared.`,
        `Welcome, ${username}. We hope you brought pizza.`,
        `Good to see you, ${username}.`,
        `Swoooosh. ${username} just landed.`,
        `${username} hopped into the chatroom. Kangaroo!!`,
        `Welcome ${username}. Say hi!`,
        `Everyone welcome ${username}!`,
        `${username} joined the party!`,
        `Glad you are here, ${username}.`,
        `${username} just showed up!`,
        `${username} is here.`,
        `${username} just joined. Everyone, look busy!`,
        `Welcome, ${username}. Stay a while and listen.`,
        `Welcome, ${username}. We were expecting you ( ͡° ͜ʖ ͡°)`,
        `${username} just joined. Hide your bananas.`,
        `${username} just showed up. Hold my beer.`
    ];

    return greetings[Math.floor(Math.random() * greetings.length)];
}

function isUrl(message) {
    return /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(message);
}

function isImage(message) {
    return /.(jpeg|jpg|gif|png)/i.test(message);
}