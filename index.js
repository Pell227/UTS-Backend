const http = require("http");
const server = require("./src/core/server.js");
const { env, port } = require("./src/core/config.js");
const mongoose = require("mongoose");
const config = require("./src/core/config.js");

require("dotenv").config();

const connectionString = `${config.database.connection}/${config.database.name}`;

mongoose
  .connect(connectionString)
  .then(() => {
    console.log("Connected to MongoDB:", connectionString);

    const app = http.createServer(server);
    app.listen(port, () => {
      console.log(`Server running on port number: ${port}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err.message);
    process.exit(1);
  });
