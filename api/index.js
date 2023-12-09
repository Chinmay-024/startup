const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const startupRoute = require("./Routes/startupRoutes");

const app = express();
dotenv.config({ path: "./.env" });

mongoose
  .connect(process.env.DB)
  .then(() => console.log("DB Connection Successfull"))
  .catch((err) => {
    console.error(err);
  });

// Implement CORS
app.use(cors());
app.options("*", cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Routes
app.use("/api/startups", startupRoute);

const port = process.env.PORT || 5000;

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});
