require("dotenv").config();
const routes = require("./src/routes/user.js");
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const mongoString = process.env.DATABASE_URL;
const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

const use = require("./src/routes/user.js");

//Connect Database
mongoose.connect(mongoString);
const database = mongoose.connection;

database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

app.use(express.json());

//Router
app.use("/users", use);

const port = process.env.PORT || process.env.APP_PORT;
app.listen(port, () => {
  console.log("Server up and running on PORT: ", port);
});
