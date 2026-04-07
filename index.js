const http = require("http");
const router = require("./router");

const port = 3200;
const app = http.createServer(router);

app.listen(port);
console.log(`Server running on port number: ${port}`);


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

//punya Azzarqy
app.get("/api/payment-methods", (req, res) => {
  res.json([
    {id : 1, name : "Ovo", type : "e-Wallet"},
    {id : 2, name : "Dana", type : "e-Wallet"},
    {id : 3, name : "Gopay", type : "e-Wallet"},
    {id : 4, name : "Mandiri", type : "Bank"},
    {id : 5, name : "BCA", type : "Bank"},
    {id : 6, name : "BRI", type : "Bank"},
    {id : 7, name : "Uang tunai", type : "Cash"}
  ]);
});

app.put("/api/payment-methods", (req, res) => {
  const {name, type} = req.body;
  const newData = {
    id : Date.now(), name, type
  };

  res.status(201).json( {
    message : "Payment method created",
    data : newData
  });
});

app.put("/api/payment/methods/:id", (req, res) => {
  const id = req.params.id;

  res.json({
    message : `Payment method ${id} updated`,
    data: req.body
  });
});

app.delete("/api/payment-methods/:id", (res,  req) => {
  const id = req.params.id;
  
  res.json({
    message : `Payment method ${id} deleted`,
  });
});

app.patch("/api/payment-methods/:id/status", (req, res) => {
  const id = req.params.id;
  const {isActive} = req.body;

  res.json({
    message : `Status Payment method ${id} updated`, isActive
  })
});