const dotenv = require("dotenv");
dotenv.config();
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
const users = require("./src/routes/user.js");

//Connect Database
mongoose.connect(mongoString);
const database = mongoose.connection;

//error sẽ được gọi khi gặp error.
database.on("error", (error) => {
  console.log(error);
});

database.once("connected", () => {
  console.log("Database Connected");
});

app.use(express.json());

//Router
app.use("/users", users);

const port = process.env.PORT || process.env.APP_PORT;
app.listen(port, () => {
  console.log("Server up and running on PORT: ", port);
});
