import { Router } from "express";

import UserControler from "../controllers/users";
import Aula07Router from "../controllers/aulas/aula07";
import Aula08Router from "../controllers/aulas/aula08";

const router = Router();
router.use("/users", UserControler);

router.use("/aulas/07", Aula07Router);
router.use("/aulas/08", Aula08Router);

export default router;
