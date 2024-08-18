import express from "express"

import secureRoute from "../middleware/secureRoute.js";
import { getMessage, sendMessage } from "../controllers/messagecontroller.js";

const router = express.Router();

router.post('/send/:id',secureRoute,sendMessage)
router.get('/get/:id',secureRoute,getMessage)



export default router