var express =  require("express");

var app = express();

app.use(express.static("./public"));

var server = require("http").Server(app);

var io = require("socket.io")(server);

server.listen(process.env.PORT || 3000);

var NameList = ["a"];

io.on("connection", function (socket) {
    console.log("New user: " + socket.id);

    socket.on("SetN", function (data) {
        console.log("New name: " + socket.id + " : " + data);

        if (NameList.indexOf(data)>=0) {
            socket.emit("NameX");
        } else {
            NameList.push(data);
            socket.Name = data;
            socket.emit("NameV", data);
        }
    });

    socket.on("SendMSG", function (data) {
        console.log("New chat: " + socket.id + " : " + data);

        io.sockets.emit("DataMSG", {id:socket.id, c:data});
    });

    socket.on("Logout", function () {
        console.log("New logout: " + socket.id);

        NameList.splice(
            NameList.indexOf(socket.Name), 1
        );

        socket.emit("Out");
    });
});

app.get("/", function (req, res) {
    res.render("index.ejs");
});