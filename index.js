const http = require("http");
const router = require("./router");

const port = 3200;
const app = http.createServer(router);


app.listen(port);
console.log(`Server running on port number: ${port}`);

//Endpoint untuk point of sales


//Felisia - Staff
app.get("/api/staff", (req, res) => {
  const staff = [
    { id: 1, name: "Pasep", role: "Cashier" },
    { id: 2, name: "Aldo", role: "Manager" },
    { id: 3, name: "stella", role: "Staff" },
  ];
  res.json(staff);
});

app.post("/api/staff", (req, res) => {
  const { name, role } = req.body;
  const newStaff = {
    id: Date.now(),
    name,
    role,
  };
  res.status(201).json({
    message: "Staff created successfully",
    data: newStaff,
  });
});

app.post("/api/staff/:id", (req, res) => {
  const staffId = req.params.id;
  res.json({ message: `Staff ${staffId} updated successfully` });
});

// Bagian login 
const JWT_SECRET = process.env.JWT_SECRET || "rahasia_jwt_kasir";
const users = [];

app.post("/api/auth/register", (req, res) => {
  try{
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status (400).json ({
        success: false,
        massage: "Username, email, dan password wajib di isi",
      });
    }
    // untuk mengecek jika email sudah terdaftar atau belum
    const existingUser = users.find((u) => u.email == email);
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "Email sudah terdaftar",
      });
    }

    const saltRound = 10;
    const hashedPassword =  bcrypt.hash(password, saltRound);

    const sewUser = {
      id: users.lenght + 1,
      username,
      email,
      password: hashedPassword,
      created: new Date(),
    };
    users.push(newUser);


    return res.status(201).json ({
      success: true,
      message: "Resgistrasi Berhasil",
      data: {
        id: newUser.id,
        username: newUser.username,
        email:newUser.email,
      },
    });
  } catch (error) {
    console.error("Register error:, error ");
    return res.status(500).json({
      success:false,
      message: "Terjadi kesalahan pada server",
    });
  }
});

// auth regis
app.get("/api/auth/register"), (req, res) => {
  try {
    const { email, password } = req.body;


    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email dan password wajib diisi",
      });
    }

    const User = users.find((u) => u.email == email);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Email atau password salah",
      });
    }

    const isPasswordvalid =  bcrypt.compare(password, user.password);
    if(!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Email atau password salah",
      });
    }
    // JWT adalah mekanisme autentikasi berbasis token
    const token = jwt.sign(
    {
      id: user.id, 
      email: user.email,
      username: user.username,
    }, JWT_SECRET,
    { expiresIn: "1h"}
  );

  return res.status(200).json({
    seccess: true,
    message: "login berhasil",
    data: {
      token,
    user: { 
    id: user.id,
      username: user.username,
      email: user.email,
    },
  },
});

  } catch (error) {
    console.error("Login error: ", error);
    return res.status(500).json({
      success: false,
      message: "Terjadi kesalahan pada server",
    });
  }
}





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
    { id: 1, name: "Apple", price: 10 },
    { id: 1, name: "Grape", price: 10 },
    { id: 1, name: "Lychee", price: 10 },
    { id: 2, name: "Cabbage", price: 20 },
    { id: 2, name: "Spinach", price: 20 },
    { id: 2, name: "Cucumber", price: 20 },
    { id: 3, name: "Milk", price: 30 },
    { id: 3, name: "Chocolate", price: 30 },
    { id: 3, name: "Yoghurt", price: 30 },
  ];
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  const products = [
    { id: 1, name: "Product 1", price: 10 },
    { id: 2, name: "Product 2", price: 20 },
    { id: 3, name: "Product 3", price: 30 },
  ];
  const product = products.find(p => p.id === productId);

  if (product) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(product));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Product not found" }));
  }
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

app.put("/api/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);
  let body = "";
  req.on("data", chunk => body += chunk.toString());
  req.on("end", () => {
    const data = JSON.parse(body);
    const updatedProduct = {
      id: productId,
      name: data.name || `Product ${productId}`,
      price: data.price || 0
    };
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Product updated", product: updatedProduct }));
  });
});

app.delete("/api/products/:id", (req, res) => {
  const productId = parseInt(req.params.id);

  // dummy data sementara
  const products = [
    { id: 1, name: "Product 1", price: 10 },
    { id: 2, name: "Product 2", price: 20 },
    { id: 3, name: "Product 3", price: 30 },
  ];

  const product = products.find(p => p.id === productId);

  if (product) {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: `Product ${productId} deleted successfully` }));
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Product not found" }));
  }
});

// part mongodb
const mongoose = require("mongoose");

//Felisia - Resport Analytics

app.get("get/api/daily-sales", (req, res) => {
  const dailySales = [
    { date: "2024-01-01", totalSales: 1000 },
    { date: "2024-01-02", totalSales: 1500 },
    { date: "2024-01-03", totalSales: 2000 },
  ];
  res.json(dailySales);
});

app.get("api/reports/products/top-products", (req, res) => {
  const topProducts = [
    { id: 1, name: "Dove", sales: 500 },
    { id: 2, name: "Sensoden", sales: 300 },
    { id: 3, name: "ponds", sales: 200 },
  ];
  res.json(topProducts);
});

app.get("api/reports/products/low-stock", (req, res) => {
  const lowStockProducts = [
    { id: 2, name: "Sensoden", stock: 5 },
    { id: 1, name: "Dove", stock: 3 },
    { id: 3, name: "ponds", stock: 2 },
  ];
  res.json(lowStockProducts);
});

app.get("api/reports/staff/top-staff", (req, res) => {
  const topStaff = [
    { id: 1, name: "Pasep", sales: 1000 },
    { id: 2, name: "Aldo", sales: 800 },
    { id: 3, name: "Stella", sales: 600 },
  ];
  res.json(topStaff);
});

//Azzarqy - Metode Pembayaran
app.get("/api/payment-methods", (req, res) => {
  res.json([
    { id: 1, name: "Ovo", type: "e-Wallet" },
    { id: 2, name: "Dana", type: "e-Wallet" },
    { id: 3, name: "Gopay", type: "e-Wallet" },
    { id: 4, name: "Mandiri", type: "Bank" },
    { id: 5, name: "BCA", type: "Bank" },
    { id: 6, name: "BRI", type: "Bank" },
    { id: 7, name: "Uang tunai", type: "Cash" },
  ]);
});

app.put("/api/payment-methods", (req, res) => {
  const { name, type } = req.body;
  const newData = {
    id: Date.now(),
    name,
    type,
  };

  res.status(201).json({
    message: "Payment method created",
    data: newData,
  });
});

app.put("/api/payment/methods/:id", (req, res) => {
  const id = req.params.id;

  res.json({
    message: `Payment method ${id} updated`,
    data: req.body,
  });
});

app.delete("/api/payment-methods/:id", (res, req) => {
  const id = req.params.id;

  res.json({
    message: `Payment method ${id} deleted`,
  });
});

app.patch("/api/payment-methods/:id/status", (req, res) => {
  const id = req.params.id;
  const { isActive } = req.body;

  res.json({
    message: `Status Payment method ${id} updated`,
    isActive,
  });
});

//Tristan CATEGORIES
app.post("/api/categories", (req, res) => {
  const categories = req.params.id;
  res.json({ message: `Categories ${categories} updated succesfully`});
});

app.get("/api/categories", (req, res) => {
  const categories = [
    {id: 1, name: "Fruit", type: "fruit" },
    {id: 2, name: "Vegetables", type: "vege" },
    {id: 3, name: "Dairy Products", type: "dairy" }
    ];
    res.json(categories);
});