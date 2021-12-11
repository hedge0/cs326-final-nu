1. Clone the repository on a local machine.
    `git clone https://github.com/hedge0/cs326-final-nu.git`
2. Cd into the correct directory for the app.
    `cd cs326-final-nu`
3. Update node modules.
    `npm update`
4. create secrets.json in the root directory with the following json schema and add in valid credentials: 
    { 
        "accessKeyId": "", 
        "secretAccessKey": "", 
        "region": ""
    }
5. Run the server for the app.
    `node server/server.js`