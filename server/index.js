'use strict';



const express = require('express');
const bodyParser = require('body-parser'); 
const http = require('http');
const url = require('url');
const fs = require('fs');
const app = express();




const server = http.createServer(async (req, res) => {
    if (req.method === 'POST') {
        res.writeHead(200, { "Content-Type": "application/json" });

    }

    else {
        res.writeHead(404, { "Content-Type": "application/json" });
        res.end();
    }
});

server.listen(8080);



