import express from "express";
import secureRoute from "../middleware/secureRoute.js";
import { addMembersToGroup, createGroup, sendMessage2 } from "../controllers/messagecontroller.js";
import { getAllConversations, getConvoMessage } from "../controllers/groupControllers.js";


const router = express.Router();

router.post('/send2/:conversationId',secureRoute,sendMessage2);
router.post('/createGroup',secureRoute,createGroup);
router.post('/addMembers',secureRoute,addMembersToGroup);
router.get('/getAllConversations',secureRoute,getAllConversations);
router.get('/getConversationMessages/:conversationId',secureRoute,getConvoMessage);



export default router;