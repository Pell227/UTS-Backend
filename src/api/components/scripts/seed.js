require("dotenv").config();
const { connectDB } = require("../config/dbFactory");
const logger = require("../utils/logger");
 
const seed = async () => {
  await connectDB();
 
  const driver = (process.env.DB_DRIVER || "sql").toLowerCase();
  logger.info(`Seeding untuk driver: ${driver}`);
 
  let count = 0;
 
  if (driver === "mongodb") {
    const User = require("../models/mongo/UserMongo");
    count = await User.countDocuments();
 
    if (count > 0) {
      logger.info("Database MongoDB sudah ada data. Seed dilewati.");
      process.exit(0);
    }
 
    await User.create({
      nama: "Administrator",
      username: "admin",
      email: "admin@kasir.local",
      password: "Admin@1234",
      status: "admin",
      isActive: true,
      isApproved: true,
      nip: "ADMIN001",
    });
  } else {
    const { User } = require("../models");
    count = await User.count();
 
    if (count > 0) {
      logger.info("Database SQL sudah ada data. Seed dilewati.");
      process.exit(0);
    }
 
    await User.create({
      nama: "Administrator",
      username: "admin",
      email: "admin@kasir.local",
      password: "Admin@1234",
      status: "admin",
      isActive: true,
      isApproved: true,
      nip: "ADMIN001",
    });
  }
 
  logger.info("Seed berhasil!");
  logger.info("Username : admin");
  logger.info("Password : Admin@1234");
  logger.warn("SEGERA GANTI PASSWORD SETELAH LOGIN PERTAMA!");
 
  process.exit(0);
};
 
seed().catch((err) => {
  logger.error("Seed gagal:", err);
  process.exit(1);
});