import { Router } from "express";

import AuthControler from "../controllers/auth-ctrl";
import UserControler from "../controllers/user-ctrl";
import ComicControler from "../controllers/comic-ctrl";
import ChapterControler from "../controllers/chapter-ctrl";

const router = Router();
router.use("/auth", AuthControler);
router.use("/users", UserControler);
router.use("/comics", ComicControler);
router.use("/chapters", ChapterControler);

export default router;
