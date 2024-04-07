
import { Router } from 'express'
import * as userController from './controller/user.js';


const router = Router();

router.get("/", userController.getAll);
router.get("/:ip", userController.get);
router.post("/", userController.add);
router.delete("/:id", userController.deleteOne);



export default router;