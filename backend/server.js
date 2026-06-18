require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const eventRoutes = require("./routes/events");

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("MONGO_URI is not defined");
  process.exit(1);
}

app.use(cors());
app.use(express.json());

app.use("/api", eventRoutes);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`TrackFlow backend running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to start server:", err.message);
  });
