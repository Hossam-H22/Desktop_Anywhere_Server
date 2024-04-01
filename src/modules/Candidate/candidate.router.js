
import { Router } from 'express'
import * as candidateController from './controller/candidate.js';


const router = Router();

router.get("/", candidateController.getCandidateModule);


router.get("/callee/:ip", candidateController.getCallee);
router.post("/callee/:ip", candidateController.addCallee);
router.delete("/callee/:ip", candidateController.deleteCallee);

router.get("/caller/:ip", candidateController.getCaller);
router.post("/caller/:ip", candidateController.addCaller);
router.delete("/caller/:ip", candidateController.deleteCaller);


export default router;