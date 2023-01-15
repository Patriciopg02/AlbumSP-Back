import { Router } from "express";
import { deleteMemory, getMemory, postMemory, putMemory, uploadImage } from '../controllers/memory.controller.js'
const router = Router();

router.route('/').get(getMemory).post(postMemory);
router.route('/:idMemory').put(putMemory).delete(deleteMemory);
router.route('/upload').post(uploadImage);

export default router;