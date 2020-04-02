var express =  require("express");

var app = express();

app.use(express.static("./public"));

var server = require("http").Server(app);

var io = require("socket.io")(server);

server.listen(process.env.PORT || 3000);

io.on("connection", function (socket) {
    console.log("New user: " + socket.id);

    socket.on("SendMSG", function (data) {
        console.log("New chat: " + socket.id + " : " + data);

        io.sockets.emit("DataMSG", {id:socket.id, c:data});
    });
});

app.get("/", function (req, res) {
    res.render("index.ejs");
});