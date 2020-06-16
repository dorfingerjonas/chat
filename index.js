const express = require('express');
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));
app.use(express.static('public/script'));
app.use(express.static('public/style'));

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('new user', (username) => {
        io.emit('chat message broadcast: new user', username);
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });

    socket.on('chat message', (msg) => {
        console.log('message: ' + msg);

        io.emit('chat message broadcast', msg);
    });
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});