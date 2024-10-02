const express = require("express");
const http = require("http");

const app = express();

const server = http.createServer(app);
const path = require("path");

const { Server } = require("socket.io");
const io= new Server(server)

// socket io functionalities

io.on("connection", (socket)=>{
    console.log("A new connection is established with id::",socket.id);
    socket.on("user-message", (message) => {
        console.log("message from user::",message)
        io.emit("message",message)
    })
});

app.use(express.static(path.resolve("./public")));

app.get("/", (req, res) => {
    return res.sendFile("/public/index.html ")
})

server.listen(9000, () => console.log(
    "Server listening at port::9000"
))

