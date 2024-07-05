const net = require('net');
const readline = require('readline/promises');
const rl = require("./readline.js")


function clearLine() {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
}

function moveUp(){
    process.stdout.moveCursor(0,-1);
}

async function chat(socket) {
    return new Promise(async (resolve, reject) => {
        socket.on("data", dataHandler);

        await ask();

        function parse(answer) {
            if (answer === "/logout") {
                socket.removeListener("data", dataHandler);
                return resolve("logout");
            } else if (answer === "/close") {
                socket.removeListener("data", dataHandler);
                return resolve("close");
            } else {
                const message = {
                    type: "message",
                    message: answer
                };

                socket.write(JSON.stringify(message));
                moveUp();
            }
        }

        async function dataHandler(data) {
            clearLine();

            if (data.toString().startsWith("message")) {
                processMessage(data.toString());
            } else {
                console.log(data.toString());
            }

            await ask();
        }

        async function ask() {
            try {
                const answer = await rl.question("Enter A Message: ");
                parse(answer);
            } catch (err) {
                console.error('Error asking question:', err);
                reject(err);
            }
        }

        function processMessage(message) {
            const [type, username, msg] = message.split("-");
            console.log(`${username}: ${msg}`);
        }
    });
}

module.exports = chat;
