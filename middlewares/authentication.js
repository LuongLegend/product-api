import jwt from "jsonwebtoken";
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "12";

const verifyUser = (req, res, next) => {
  try {
    const bearerHeader = req.headers["authorization"];
    if (!bearerHeader) return res.sendStatus(401).send("unauthorized");
    const token = bearerHeader.split(" ")[1];
    const verifyToken = jwt.verify(token, ACCESS_TOKEN_SECRET);
    req.userInfo = verifyToken;
    return next();
  } catch (error) {
    console.log(error.message);
    return res.sendStatus(403).send("invalid token");
  }
};

export { verifyUser };
