1. git clone https://github.com/hedge0/cs326-final-nu.git
2. cd cs326-final-nu
3. npm update
4. create secrets.json in the root directory with the following json schema and add in valid credentials: 
    { 
        "accessKeyId": "", 
        "secretAccessKey": "", 
        "region": ""
    }
5. node server/server.js