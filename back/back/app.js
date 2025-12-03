var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var db = require("./db");

/* ------------------ ROUTERS ------------------ */
/* ------------------ ROUTERS ------------------ */
var authRouter = require("./routes/auth");
var productsRouter = require("./routes/products");
var orderRouter = require("./routes/order");
var branchRouter = require("./routes/branch");   // 🔥 THÊM ROUTE CHI NHÁNH

var cors = require("cors");

var app = express();

/* ------------------ ENABLE CORS ------------------ */
var corsOptions = {
  origin: [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175",
    "http://localhost:5176",
    "http://localhost:5177",
    "http://localhost:5178",
    "http://localhost:5179",
    "http://localhost:5180",
    "http://localhost:5181"
  ],
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
};

app.use(cors(corsOptions));

// FIX preflight cho OPTIONS
app.options("*", cors(corsOptions));

/* ------------------ MIDDLEWARE ------------------ */
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

/* ------------------ ROUTES ------------------ */
app.use("/api/auth", authRouter);
app.use("/api/products", productsRouter);
app.use("/api/order", orderRouter);
app.use("/api/branch", branchRouter);  // 🔥 THÊM ROUTE CHI NHÁNH

/* ------------------ 404 HANDLER ------------------ */
app.use(function (req, res, next) {
  res.status(404).json({ msg: "Không tìm thấy API" });
});

/* ------------------ ERROR HANDLER ------------------ */
app.use(function (err, req, res, next) {
  console.error("SERVER ERROR:", err);
  res.status(err.status || 500).json({
    msg: "Server error",
    error: err.message,
  });
});

module.exports = app;
