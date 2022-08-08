import { NextFunction, Request, Response, Router } from "express";
import Conversation from "../models/Conversation";
import Message from "../models/Message";
const route = Router();


route.post('/', async (req: Request, res: Response, next: NextFunction) => {
    const newConversation = new Conversation({
        members: [req.body.senderId, req.body.receiverId]
    });

    try {
        const savedConversation = await newConversation.save();
        res.json(savedConversation)
    } catch (err) {
        next(err)
    }
});

route.get('/:userId', async (req: Request, res: Response, next: NextFunction) => {

    try {
        const conversation = await Conversation.find({ members: { $in: [req.params.userId] } });

        res.json(conversation)

    } catch (err) {
        next(err)
    }
})




export default route;