
import { Router } from 'express'
import * as mediaController from './controller/media.js';
import { fileUpload } from '../../utils/multer.js';


const router = Router();

router.get("/", mediaController.getAll);
router.get("/view/:mobile_Id", mediaController.getOne);
router.get("/get/:mobile_Id", mediaController.getOneAndDelete);
router.post("/", fileUpload().single('file'), mediaController.add);
router.delete("/:mobile_Id", mediaController.deleteOne);

export default router;