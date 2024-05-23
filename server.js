// const app = require("./app");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
const WebSocket = require("ws"); // Import WebSocket module
const http = require("http");
const PORT = process.env.PORT || 4000;

require("dotenv").config();

//route imports
const product = require("./routes/productRoutes");
const auth = require("./routes/authRoutes");
const user = require("./routes/userRoutes");
const admin = require("./routes/adminRoutes");
const category = require("./routes/categoryRoutes");
const order = require("./routes/orderRoutes");
const payment = require("./routes/paymentRoutes");

//Connecting to db
connectDB();

//Init Middleware
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
  })
);

app.use(
  cors({
    origin: "e-commerce-front-end-nishi-singhs-projects.vercel.ap",
    methods: "GET, POST, PUT, DELETE",
    credentials: true,
  })
);

app.use(express.static("public/images"));

app.use("/api/v1/", auth);
app.use("/api/v1/", user);
app.use("/api/v1/", admin);
app.use("/api/v1/", product);
app.use("/api/v1/", order);
app.use("/api/v1/", payment);
app.use("/api/v1/", category);


// app.listen(PORT, () => console.log(`Server is running on ${PORT}`));

// Create HTTP server
const server = http.createServer(app);

// Initialize WebSocket server
const wss = new WebSocket.Server({ server });

// WebSocket connection handling
wss.on("connection", (ws) => {
  console.log("Client connected to WebSocket");

  ws.on("close", () => {
    console.log("Client disconnected from WebSocket");
  });
});

// Start server
server.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
