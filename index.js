const http = require("http");
const router = require("./router");

const port = 3200;
const app = http.createServer(router);


app.listen(port);
console.log(`Server running on port number: ${port}`);

console.log("Helo");

app.get("/", (req, res));
res.send("Kelompok 2");

app.get("/api/products/:id", (req, res) => {
  const productId = req.params.id;
  const product = {
    id: productId,
    name: `Product ${productId}`,
    price: 10 * productId,
  };
  res.json(product);
});

app.get("/api/products", (req, res) => {
  const products = [
    { id: 1, name: "Product 1", price: 10 },
    { id: 2, name: "Product 2", price: 20 },
    { id: 3, name: "Product 3", price: 30 },
  ];
  res.json(products);
});

app.get("/api/products/test", (req, res) => {
  res.json({
    message: "GET tambahan berhasil",
  });
});

app.post("/api/products", (req, res) => {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const data = JSON.parse(body);

    const newProduct = {
      id: Date.now(),
      name: data.name,
      price: data.price,
    };

    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify(newProduct));
  });
});

app.put("/api/products/:id", (req, res) => {
  const productId = req.params.id;
  res.json({ message: `Product ${productId} updated successfully` });
});
// part mongodb
const mongoose = require("mongoose");

const connectionString =
  "mongodb://<USN>:<PASSWORD>@ac-hpzj89u-shard-00-00.dturini.mongodb.net:27017,ac-hpzj89u-shard-00-01.dturini.mongodb.net:27017,ac-hpzj89u-shard-00-02.dturini.mongodb.net:27017/?ssl=true&replicaSet=atlas-104wvz-shard-0&authSource=admin&appName=Cluster0";

mongoose.connect(connectionString)
