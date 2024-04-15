
import { Router } from 'express'
import * as deviceController from './controller/device.js';


const router = Router();

router.get("/", deviceController.getAll);
router.post("/information", deviceController.getInformation);
router.get("/:ip", deviceController.get);
router.post("/", deviceController.add);
router.delete("/:id", deviceController.deleteOne);



export default router;