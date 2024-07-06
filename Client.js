const login = require("./Views/login.js");
const chat = require("./Views/chat.js");
const net = require("net");



class CLient
{

    constructor(host, port){
        this.client = net.createConnection({host,port});
        this.client.on("close" , () => {
            console.log();
            console.log("Server Exited");
            process.exit();
        })
    }

    async start(){
        await login(this.client);
        const result = await chat(this.client);

        if(result)
        {
            this.client.end();
            process.exit();
        }
    }


};


const client = new CLient("127.0.0.1", "3000");

client.start();
