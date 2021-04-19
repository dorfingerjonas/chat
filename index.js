const express = require('express');
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
let connectedUsers = 0;

app.use(express.static('public'));
app.use(express.static('public/script'));
app.use(express.static('public/style'));

io.on('connection', (socket) => {
    socket.on('new user', (username) => {
        connectedUsers++;
        sendUsersCounter();
        io.emit('message broadcast: new user', username, getRandomWelcomeMessage(username));
    });

    socket.on('disconnect', () => {
        if (connectedUsers - 1 >= 0) connectedUsers--;
        sendUsersCounter();
    });

    socket.on('send message', (msg) => {
        io.emit('message broadcast', msg);
    });
});

http.listen(80, () => {
    console.log('listening on http://localhost/');
});

function sendUsersCounter() {
    io.emit('user counter', connectedUsers);
}

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