import { Router, Request, Response, NextFunction } from "express";
import Message from "../models/Message";
const route = Router();



route.post('/', async(req: Request, res: Response, next: NextFunction)=>{
    const newMessage = new Message(req.body);

    try{
        const savedMessage = await newMessage.save();
        res.json(savedMessage)
    } catch(err){
        next(err)
    }
});

route.get('/:conversationId', async(req: Request, res: Response, next: NextFunction)=>{
    try {
        const messages = await Message.find({
            conversationId : req.params.conversationId
        });
        res.json(messages)
    } catch(err){
        next(err)
    }
})



export default route;