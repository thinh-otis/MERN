"use strict";

require('dotenv').config();
var express = require('express');
var cors = require('cors');
var cookieParser = require('cookie-parser');
require('dotenv').config();
var connectDB = require('./config/db');
var router = require('./routes');
var app = express();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));
if (!process.env.FRONTEND_URL) {
  console.error('FRONTEND_URL is not defined in .env');
  process.exit(1); // Dừng server nếu không có biến môi trường
}
app.use(express.json());
app.use(cookieParser());
app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json({
    message: 'Something went wrong!'
  });
});

//Tăng cường bảo vệ cho server
var helmet = require('helmet');
app.use(helmet());

//để ghi lại các yêu cầu HTTP
var morgan = require('morgan');
app.use(morgan('dev'));

// Routes
app.use("/api", router);

// Set port
var PORT = process.env.PORT || 8080;

// Connect to DB and start server
connectDB().then(function () {
  app.listen(PORT, function () {
    console.log("Connected to DB");
    console.log("Server is running on port ".concat(PORT));
  });
})["catch"](function (err) {
  console.error("Database connection error:", err);
  process.exit(1); // Exit the process if DB connection fails
});