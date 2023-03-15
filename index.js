const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const moment = require("moment");
const cors = require("cors");
const mongoString = process.env.DATABASE_URL;
const app = express();
global.__basedir = __dirname;
var corsOptions = {
  origin: "https://ptud-api.fteamlp.top/images/",
};
//app.use(cors(corsOptions));
//==============================//
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
//================================//
//Cors
app.use(
  cors({
    origin: "*",
    corsOptions,
  })
);

//khai báo controller
const users = require("./src/routers/user.router.js");
const products = require("./src/routers/product.router.js");
const invoices = require("./src/routers/invoice.router");
const statistics = require("./src/routers/statistics.router");
const images = require("./src/routers/image.router.js");
//Router
app.use("/users", users);
app.use("/products", products);
app.use("/invoices", invoices);
app.use("/statistics", statistics);
app.use("/images", images);
//=================================//
mongoose.set("strictQuery", true); //trang thái true sẽ tắt cảnh báo trên mongoos 6
//Connect Database
mongoose.connect(mongoString);
const database = mongoose.connection;
database.once("connected", () => {
  console.log("Database Connected");
});
//error sẽ được gọi khi gặp error.
database.on("error", (error) => {
  console.log(error);
});

//==================================//
const port = process.env.PORT || process.env.APP_PORT;
app.listen(port, () => {
  console.log("Server up and running on PORT: ", port);
});
