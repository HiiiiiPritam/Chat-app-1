import express from "express";
import secureRoute from "../middleware/secureRoute.js";
import { getAllUsers } from "../controllers/v3/UserControllers.js";
import { startConversation } from "../controllers/v3/ConversationControllers.js";


const router = express.Router();

router.get('/user/getAllUsers',secureRoute,getAllUsers)
router.post('/conversation/start',secureRoute,startConversation)

export default router;