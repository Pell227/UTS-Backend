const http = require("http");
const fs = require("fs");

const path = require("path");
const mongoose = require("mongoose");

const app = http.createServer(router);

app.listen(port);
console.log(`Server running on port number: ${port}`);
