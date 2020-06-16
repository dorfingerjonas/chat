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
        io.emit('message broadcast: new user', username);
    });

    socket.on('disconnect', () => {
        if (connectedUsers - 1 >= 0) connectedUsers--;
        sendUsersCounter();
    });

    socket.on('send message', (msg) => {
        io.emit('message broadcast', msg);
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});

function sendUsersCounter() {
    io.emit('user counter', connectedUsers);
}