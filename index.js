const http = require("http");
const router = require("./router");

const port = 3000;
const app = http.createServer(router);

app.listen(port);
console.log(`Server running on port number: ${port}`);

// part mongodb
const mongoose = require("mongoose");

const connectionString =
  "mongodb://<USN>:<PASS>@ac-hpzj89u-shard-00-00.dturini.mongodb.net:27017,ac-hpzj89u-shard-00-01.dturini.mongodb.net:27017,ac-hpzj89u-shard-00-02.dturini.mongodb.net:27017/?ssl=true&replicaSet=atlas-104wvz-shard-0&authSource=admin&appName=Cluster0";

mongoose.connect(connectionString);
