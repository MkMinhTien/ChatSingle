var socket = io();
$(document).ready(function () {
    $("#Login").show(500);
    $("#Chat").hide(500);

    $("#SetName").click(function () {
        socket.emit("SetN", $("#TextName").val());
    });

    socket.on("NameX", function (data) {
        alert("Try Again");
    });

    socket.on("NameV", function (data) {
        $("#Login").hide(500);
        $("#Chat").show(500);
    });

    $("#SendMsg").click(function () {
        socket.emit("SendMSG", $("#TextChat").val());
    });

    socket.on("DataMSG", function (data) {
        $("#Data").append("<div><b style='color: aqua'>" + data.id + "</b> : " + data.c + "</div>");
    });

    $("#LogMsg").click(function () {
        socket.emit("Logout");
    });

    socket.on("Out", function (data) {
        $("#Login").show(500);
        $("#Chat").hide(500);
    });
});

document.onkeydown = function (e) {
    if (event.keyCode == 123) {
        return false;
    };
    if (e.ctrlKey && e.keyCode == 123) {
        return false;
    };
    if (e.ctrlKey && e.shiftKey && e.keyCode == "I".charCodeAt(0)) {
        return false;
    };
    if (e.ctrlKey && e.shiftKey && e.keyCode == "J".charCodeAt(0)) {
        return false;
    };
    if (e.ctrlKey && e.shiftKey && e.keyCode == "C".charCodeAt(0)) {
        return false;
    };
    if (e.ctrlKey && e.keyCode == "U".charCodeAt(0)) {
        return false;
    };
    if (event.keyCode == 27) {
        $("#LogMsg").click(function () {
            socket.emit("Logout");
        });
        return false;
    };
};
