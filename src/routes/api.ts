import { Router } from "express";

// import UserControler from "../controllers/users";
import Aula07Router from "../controllers/07";
import Aula08Router from "../controllers/08";
import Aula09Router from "../controllers/09";

const router = Router();
// router.use("/users", UserControler);

router.use("/aulas/07", Aula07Router);
router.use("/aulas/08", Aula08Router);
router.use("/aulas/09", Aula09Router);

export default router;
