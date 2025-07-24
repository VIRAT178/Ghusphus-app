import express from 'express';

import { getMessages, getUserForSidebar, markMessageAsSeen, sendMessage } from '../controller/message_Controller.js';
import { protectRoute } from '../Middlewares/auth.js';

const messageRouter = express.Router();

messageRouter.get("/users", protectRoute ,getUserForSidebar);
messageRouter.get("/:id", protectRoute, getMessages);
messageRouter.put("/mark/:id", protectRoute, markMessageAsSeen);
messageRouter.post("/send/:id", protectRoute, sendMessage);
export default messageRouter;