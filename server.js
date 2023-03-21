const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server,{
    cors: {
      origin: ["http://65.2.39.126:5173/","http://13.234.219.0/","http://65.1.154.156/"]
    }});

app.get('/', (req, res) => {
    res.end("Hello");
});

io.on('connection', (socket) => {
    socket.on('sendURL', (msg) => {
        console.log('message: ' + msg);
        io.emit("getURL", msg)
    });

    socket.on('nextPS', (msg) => {
        console.log('message: ' + msg);
        socket.emit("nextPSClient", msg)
    });
});

server.listen(3001, () => {
    console.log('listening on *:3000');
});