const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
require("dotenv").config;

const user = require("./routes/user");
const products = require("./routes/product");
const login = require("./routes/login");

const PORT = process.env.PORT || 3000;
const app = express();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 phút
  max: 100, // Giới hạn 100 request mỗi phút
  message: "Bạn đã gửi quá nhiều yêu cầu, vui lòng thử lại sau!",
  headers: true, // Trả về thông tin giới hạn trong headers
});

app.use(cors());
app.use(helmet());
app.use(limiter);
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
