const net = require("net");
const tcpServer = net.createServer();
const tcpPort = 1515;

const clients = [];

exports.relayServer = (tcpPort) => {

    tcpServer.on("connection", (socket) => {
        if(clients.length == 0){
            clients.push(socket);
            console.log(clients[0].remoteAddress.split(":")[3] + " connected.");
            console.log("wait IchigoJam connection...");
        }else if(clients.length == 1){
            clients.push(socket);
            console.log(clients[1].remoteAddress.split(":")[3] + " connected.");
            console.log("Ready to conected!");
        }else {
            console.log("aleady to connected...");
            socket.write("'another IchigoJam alrady connected...");
        }

        socket.on("data", (data) => {
            let DATA = data.toString();

            if(clients.length == 1) return true;

            if(socket == clients[0]){
                DATA = "@" + String.fromCharCode(DATA.length) + DATA;
                clients[1].write(DATA);
                console.log("browser > " + DATA);
            }else{
                console.log("IchigoJam > " + DATA);
            }
        })

    })

}

tcpServer.listen(tcpPort, () => {
    console.log(`listening on ${tcpPort}`);
})
