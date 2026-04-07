const http = require("http");
const router = require("./router");

const port = 3200;
const app = http.createServer(router);

app.listen(port);
console.log(`Server running on port number: ${port}`);

console.log("Hello World!");

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

app.put("/api/products/:id", (req, res) => {
  const productId = req.params.id;
  res.json({ message: `Product ${productId} updated successfully` });
});

//will-Transactions

let transactions = [];
let detail = [];

app.post("/api/transactions", (req, res) => {
  const { amount, type, description } = req.body;
   if (!amount || !type) 
  {
    return res.status(400).json({ error: "amount and type are required" });
  }

  const newTransaction= { 
    tanggal: new Date(),
    id: Date.now().toString(), amount,
    type,
    description: description || "",
    harga: 0,
    subtotal: 0,
    total: 0,
    bayar: 0, 
    Kembalian: 0,
  };
  transactions.push(newTransaction);
  res.status(201).json(newTransaction);
});

app.get("/api/transactions", (req, res) => {
  res.json(transactions);
});

app.post("/api/transactions/:id", (req, res) => {
  const { id } = req.params;
  const {id_produk, jumlah} = req.body;

  const transaction = transactions.find(t => t.id == id);
  if (!transaction) 
  {
    return res.status(404).json({ error: "Transaction not found" });
  }
  const product = products.find(p => p.id == id_produk);
  if (!product) 
  {
    return res.status(404).json({ error: "Product not found" });
  }
  if (product.stock < jumlah) 
  {
    return res.status(400).json({ error: "not enough stock" });
  }

  const subtotal = product.harga * jumlah;

  const detail = {
    id_produk,
    jumlah,
    harga: product.price,
    subtotal,
  };

  push(detail);
  res.json(detail);
});

app.delete("/api/transactions", (req, res) => {
  transactions = [];
  res.status(204).send();
});

app.delete("/api/transactions/:id", (req, res) => {
  const transaction = findTransaction(req.params.id);

  if (!transaction) 
    return res.status(404).json({ error: "Not found" });

  transaction.deleted_at = new Date();

  res.status(204).send();
});

app.get("/api/transactions/:id/total", (req, res) => {
  const { id } = req.params;

  const transaction = transactions.find(t => t.id == id);
  
  if (!transaction) 
  {
    return res.status(404).json({ error: "Transaction not found" });
  }

  const total = transaction.details.reduce((sum, detail) => sum + detail.subtotal, 0);
  
  res.json({ total });
});


// part mongodb
const mongoose = require("mongoose");

const connectionString =
  "mongodb://<USN>:<PASSWORD>@ac-hpzj89u-shard-00-00.dturini.mongodb.net:27017,ac-hpzj89u-shard-00-01.dturini.mongodb.net:27017,ac-hpzj89u-shard-00-02.dturini.mongodb.net:27017/?ssl=true&replicaSet=atlas-104wvz-shard-0&authSource=admin&appName=Cluster0";

mongoose.connect(connectionString)
