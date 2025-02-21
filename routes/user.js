const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  const u = {
    name: "l",
    age: 20,
  };
  return res.json(u);
});

router
  .route(":/id")
  .get((req, res) => {
    const { id } = req.params;
    const u = {
      id,
      name: "",
      age: 20,
    };
    return res.json(u);
  })
  .put((req, res) => {
    const { id } = req.params;
    const { name, age } = req.body;
    const newU = {
      id,
      name,
      age,
    };
    return res.json(newU);
  });

module.exports = router;
