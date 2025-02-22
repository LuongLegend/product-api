const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config;

const user = require("./routes/user");
const products = require("./routes/product");
const login = require("./routes/login");

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/product", products);
app.use("/user", user);
app.use(login);

app.get("/", (req, res) => {
  console.log("hihi");
  return res.json({ msg: "hello world" });
});

app.listen(PORT, () => console.log(`app is listening port: ${PORT}`));
