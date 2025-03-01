import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import "dotenv/config";

import user from "./models/user.js";
import products from "./routes/product.js";
import login from "./routes/login.js";
import logger from "./utils/logger.js";

const PORT = process.env.PORT || 3000;
const app = express();

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
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

logger.log({
  level: "error",
  message: "Hello distributed log files!",
});

app.listen(PORT, () => console.log(`app is listening port: ${PORT}`));
