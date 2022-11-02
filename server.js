const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);


io.on("connection", (socket) => {
    console.log("new connection" + socket);
    
    socket.on("client-message", (message) => {
        //message {sender, text, timestamp}
        //push message to mes[]
        //broadcast msg[]
        socket.broadcast.emit("server-message", message);
        console.log(message);
      });
});

app.use(express.static('public'));

http.listen(8080, async () => {
  console.log("server listening...");
});
