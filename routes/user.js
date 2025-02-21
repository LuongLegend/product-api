const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const u = {
    name: "l",
    age: 20,
  };
  return res.json(u);
});
module.exports = router;
