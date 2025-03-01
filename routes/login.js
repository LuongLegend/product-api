import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "12";
const saltRounds = 10;

const router = express.Router();
const defaultUser = "admin";
const defaultPassword = "admin";

function createToken(data) {
  const token = jwt.sign(data, ACCESS_TOKEN_SECRET, { expiresIn: "30m" });
  return token;
}
router.post("/login", (req, res) => {
  const { username, password } = req.body;

  let msg = "Login failed!";
  if (username !== defaultUser || !password) return res.json({ msg });
  //check pass
  const hashedPassword = bcrypt.hashSync(defaultPassword, saltRounds);
  const isValid = bcrypt.compareSync(password, hashedPassword);
  const response = { msg };
  if (isValid) {
    response.msg = "Login success";
    const token = createToken({ username });
    response.token = token;
  }
  //gen TOKEN
  return res.json(response);
});

export default router;
