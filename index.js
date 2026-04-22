const http = require("http");
const fs = require("fs");
const server = require("./src/core/server.js");
const { env, port } = require("./src/core/config.js");

const path = require("path");
const mongoose = require("mongoose");

require("dotenv").config();

const ports = process.env.PORT;

const app = http.createServer(server);

app.listen(port);
console.log(`Server running on port number: ${port}`);
