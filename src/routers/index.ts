import * as express from "express";
import index from "../controller/index"
import login from "../controller/login"


const router = express.Router();

router.get("/",index);
router.get("/login", login.login);
router.post("/login", login.postLogin);
export default router;
