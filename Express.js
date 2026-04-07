// part mongodb
const mongoose = require("mongoose");
const { type } = require("os");

const connectionString =
  "mongodb://<USN>:<PASSWORD>@ac-hpzj89u-shard-00-00.dturini.mongodb.net:27017,ac-hpzj89u-shard-00-01.dturini.mongodb.net:27017,ac-hpzj89u-shard-00-02.dturini.mongodb.net:27017/?ssl=true&replicaSet=atlas-104wvz-shard-0&authSource=admin&appName=Cluster0";

mongoose.connect(connectionString);
