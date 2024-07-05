const readline = require("readline/promises");
const rl = require("./readline.js");

function clearScreen(){
    console.clear();
}


async function login(client){

    const username = await rl.question("Username: ");
    const password = await rl.question("Password: ");

    return new Promise((resolve, reject) => {

        const message = {
            type: "login",
            username,
            password
        }

        client.on("data" , checkStatus)

        client.write(JSON.stringify(message));
    
        function checkStatus(data){
            let result = false;
    
            if(data === "success")
                result = true;
    
            client.removeListener("data", checkStatus);
            clearScreen();
            resolve(result);
        }
    });
}


module.exports = login;