
import { Router } from 'express'
import * as offerController from './controller/offer.js';
import validation from '../../middleware/validation.js';
import * as validators from "./offer.validation.js"

const router = Router();

router.get("/offer/:ip", offerController.getOffer);
router.post("/offer/:ip", offerController.addOffer);
router.delete("/offer/:ip", offerController.deleteOffer);

router.get("/answer/:ip", offerController.getAnswer);
router.post("/answer/:ip", offerController.addAnswer);
router.delete("/answer/:ip", offerController.deleteAnswer);

export default router;