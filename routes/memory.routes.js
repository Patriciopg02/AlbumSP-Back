import { Router } from "express";
import { getMemory, postMemory, putMemory } from '../controllers/memory.controller.js'
const router = Router();

router.route('/').get(getMemory).post(postMemory).put(putMemory);

export default router;