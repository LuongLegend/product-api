const express = require("express");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const router = express.Router();
const defaultUser = "admin";
const defaultPassword = "admin";

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  let msg = "Login failed!";
  if ( username !== defaultUser || !password ) return res.json({ msg });
  //check pass
  const hashedPassword = bcrypt.hashSync(defaultPassword, saltRounds);
  const isValid = bcrypt.compareSync(password, hashedPassword);

  if (isValid) {
    msg = "Login success";
  }

  return res.json({
    msg,
  });
});

module.exports = router;
