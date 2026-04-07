const http = require("http");
const router = require("./router");

const port = 3200;
const app = http.createServer(router);

app.listen(port);
console.log(`Server running on port number: ${port}`);


app.get("/", (req, res));
res.send("Kelompok 2");

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
// part mongodb
const mongoose = require("mongoose");

const connectionString =
  "mongodb://<USN>:<PASSWORD>@ac-hpzj89u-shard-00-00.dturini.mongodb.net:27017,ac-hpzj89u-shard-00-01.dturini.mongodb.net:27017,ac-hpzj89u-shard-00-02.dturini.mongodb.net:27017/?ssl=true&replicaSet=atlas-104wvz-shard-0&authSource=admin&appName=Cluster0";

mongoose.connect(connectionString)
