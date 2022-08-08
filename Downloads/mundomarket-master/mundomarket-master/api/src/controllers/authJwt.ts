// Authorization
// verifica token (user registrado y logueado) y rol

import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from '../config'
import Role from "../models/Role";
import User from "../models/User";
//var parse=require('parse-headers')

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    //console.log("reeeeeeeeeeeeeeeeeq:",req.headers['x-access-token'])
    try {
        const token: any = req.headers['x-access-token'];
        if (!token) return res.status(403).json({ message: 'No token provided' })

        const decoded: any = jwt.verify(token, config.SECRET_JWT)
        console.log("decoded.id",decoded.id)
        req.userId =  decoded.id
        console.log(req.userId)
        const user = await User.findById(req.userId, { passsword: 0 })
        if (!user) return res.status(404).json({ message: 'User Not Found' })
        next();

    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' })
    }
};

export const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const user = await User.findById(req.userId);
    const roles = await Role.find({_id: {$in : user.roles}});
    
    console.log('Role => ', roles[0].name);
    roles[0].name === 'admin' ? next() : res.status(403).json({message : 'Unauthorized action'})
}