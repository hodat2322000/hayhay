import * as express from "express";
import index from "../controller/index";
import login from "../controller/login";
import random from "../controller/random";
import checkProxy from "../controller/checkProxy";
import message from "../controller/messageTele";

const router = express.Router();

router.get("/", index);
router.get("/random", random.random);
router.post("/handleClick", random.handleClick);
router.get("/login", login.login);

router.post("/login", login.postLogin);
router.get("/checkProxy", checkProxy.proxy);
router.post("/checkProxy", checkProxy.handleCheckProxy);
message;

export default router;
