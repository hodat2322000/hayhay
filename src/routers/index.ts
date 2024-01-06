import * as express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.render("index");
});
router.get("/login", (req, res) => {
  res.render("index");
});
router.post("/login", (req, res) => {
  const { uname, psw } = req.body;
  if (uname === "admin" && psw === "admin")
    res.json({ login: true, mes: "ok" });
  else res.json({ login: false, mes: "acc sai" });
});
export default router;
