const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
require('dotenv').config()
const path = require('path');

//listen for socket connections
io.on("connection", (socket) => {
    console.log("new connection" + socket);
    //recieve client message
    socket.on("client-message", (message) => {
        //send message to every connection except sender
        socket.broadcast.emit("server-message", message);
        console.log(message);
      });
});

app.use(express.static(__dirname + '/public'));
// app.use(express.static('public'));
app.get('*', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

//send public folder on get request
const PORT = process.env.PORT || 8080;

http.listen(PORT, () => console.log(`server listening on port ${PORT}`));