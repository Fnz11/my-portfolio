const express = require("express");
const app = express();
const cors = require('cors')
const mongoose = require("mongoose");
const webRoutes = require("./routes/webRoutes");
const webTopRoutes = require("./routes/webTopRoutes");
const webShowRoutes = require("./routes/webShowRoutes")
const miscRoutes = require("./routes/miscRoutes");
const sosmedRoutes = require('./routes/sosmedRoutes')
const messageRoutes = require('./routes/messageRoutes')
const userRoutes = require('./routes/userRoutes')
const { connect } = require("http2");
require("dotenv").config();

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PATCH', 'DELETE'], // Tambahkan PATCH di sini
};

// MIDDLEWARE
app.use(cors(corsOptions))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// ROUTES
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
  // res.setHeader("Access-Control-Allow-Origin", "http://localhost:8000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use("/api/webs", webRoutes);
app.use("/api/webstop", webTopRoutes);
app.use("/api/websshow", webShowRoutes);
app.use("/api/misc", miscRoutes);


app.use("/api/user", userRoutes);
app.use("/api/sosmed", sosmedRoutes);
app.use("/api/message", messageRoutes);

// CONNTET TO DB
mongoose
  .connect(process.env.MONGO_URL)
  .then((result) => {
    // LISTEN EXPRESS
    app.listen(process.env.PORT, () => {
      console.log(
        `Connect to DB & listening on http://localhost:${process.env.PORT}`
      );
    });
  })
  .catch((err) => {
    console.log("error db: ", err.message);
  });
