require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const config = require('./config/config.js'); // Memanggil file config yang baru

const app = express();
const env = process.env.NODE_ENV || 'development';

// Middleware
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoURI = config[env].url;

mongoose.connect(mongoURI)
  .then(() => {
      console.log(`✓ Koneksi ke MongoDB berhasil (Mode: ${env})`);
  })
  .catch((err) => {
      console.error('❌ Gagal terhubung ke MongoDB:', err.message);
  });


// --- Basic Routes ---
app.get("/", (req, res) => {
    res.json({
        message: "Server berjalan dengan baik",
        status: "active",
        timestamp: new Date()
    });
});

app.get("/api/info", (req, res) => {
    res.json({
        message: "API User Management Built with Express.js & MongoDB", // Teks MySQL dihapus
        version: "1.0.0",
        status: "active",
        database: "Connected with Mongoose", // Teks Sequelize dihapus
        environment: env, // Menambahkan info environment untuk memudahkan debugging
        timestamp: new Date()
    });
});

// --- API Routes ---
const userRoutes = require("./routes/userRoutes");
app.use("/api/users", userRoutes);

// --- 404 Handler ---
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

// --- Error Handler ---
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        success: false,
        message: "Internal server error",
        error: err.message
    });
});

// --- Start Server ---
// Menggunakan API_PORT sesuai dengan format .env yang kita bahas
const PORT = process.env.API_PORT || process.env.PORT || 3002;

app.listen(PORT, () => {
    console.log(`✓ Server running on port ${PORT}`);
    console.log(`✓ API available at http://localhost:${PORT}`);
});