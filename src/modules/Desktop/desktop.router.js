
import { Router } from 'express'
import * as desktopController from './controller/desktop.js';


const router = Router();

router.get("/", desktopController.getAll);
router.post("/information", desktopController.getInformation);
router.get("/:ip", desktopController.get);
router.post("/", desktopController.add);
router.delete("/:id", desktopController.deleteOne);



export default router;