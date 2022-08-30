const express = require("express");
const app = express();
const webPort = 3000;

app.use(express.json());
app.use(express.urlencoded({
    extended: false,
}))

app.use(express.static("public"));

const tcpPort = 1515;
const tcpServer = require("./public/tcpServer.js");
tcpServer.relayServer(tcpPort);

const net = require("net");
const client = new net.Socket();
client.connect(tcpPort, "localhost");

app.get("/", (req,res) => {
    res.sendFile(__dirname + "/index.html");
})

app.post("/", (req,res) => {
    let MSG = req.body.msg;
    let ALEXA = req.body.alexa;
    if(ALEXA == "on"){
        MSG = "are'kusa.." + MSG;
    }
    client.write(MSG);
    res.sendFile(__dirname + "/index.html");
})

app.listen(webPort, () => {
    console.log(`listening on ${webPort}`)
});