const express = require('express');
const app = require('express')();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

app.use(express.static('public'));
app.use(express.static('public/script'));

io.on('connection', (socket) => {
    console.log('a user connected');
    
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

http.listen(3000, () => {
    console.log('listening on *:3000');
});
