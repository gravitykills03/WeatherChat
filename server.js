const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);

//listen for socket connections
io.on("connection", (socket) => {
    console.log("new connection" + socket);
    //recieve client message
    socket.on("client-message", (message) => {
        //send message to every connection except sender
        socket.broadcast.emit("server-message", message);
      });
});

//send public folder on get request
app.use(express.static('public'));

//create server and listen to port 8080
http.listen(8080, async () => {
  console.log("server listening...");
});
