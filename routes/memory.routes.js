import { Router } from "express";
import { getMemory, postMemory } from '../controllers/memory.controller.js'
const router = Router();

router.route('/').get(getMemory).post(postMemory);

export default router;