import { Request, Response } from 'express';
import User from '../models/User';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import config from '../config';
import Role from '../models/Role';
import { validationResult } from 'express-validator'


export const encryptPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt);
}


export const comparePasswords = async (savedPassword: string, receivedPassword: string) => {
    return await bcrypt.compare(savedPassword, receivedPassword)
}




export const signUp = async (req: Request, res: Response) => {
    const { name, email, password, avatar, country, city, adress, phone, cuil } = req.body;
    const errors =  validationResult(req)
    if(!errors.isEmpty()){
        return res.json(errors.array())
    }


    const found = await User.find({ email });

    if (found.length > 0) {
        res.send('There is an account already created with this email')
    } else {
        
        const newUser = new User({ name, email, password: await encryptPassword(password), avatar, country, city, adress, phone, cuil });

        //le agrega el rol 'User' de manera predet. Solo el dev crea admin/s. 
        const role = await Role.findOne({ name: 'user' }); //si quiero crear un Admin, puedo cambiar el string 'user' por 'admin'
        newUser.roles = [role._id]

        // verificación cuenta vía mail
        newUser.email_Welcome();

        //aunque se haya guardado, nnecesita confirmar la cuenta para poder logearse
        await newUser.save();

        // no creo token para esperar la confirmación del mail y luego logeo manual
        // const token = jwt.sign({ id: newUser._id }, config.SECRET_JWT, { expiresIn: 86400 /*24hs*/ })

        // https://rajaraodv.medium.com/securing-react-redux-apps-with-jwt-tokens-fcfe81356ea0
        res.json({ user: newUser.name})
    }
}



export const logIn = async (req: Request, res: Response) => {

    const { email, password } = req.body;

    const found = await User.findOne({ email }).populate('roles')

    if (!found) return res.status(400).json({ message: 'Incorrect mail' });

    // ban => ver modelo User
    if(found.suspendedAccount) return res.status(401).json({ message: 'Your account it´s temporary suspended.' })
    //if(!found.verified) return res.status(401).json({message : 'You need to verify your account first.'})

    const matchPassword = await comparePasswords(password, found.password);

    if (!matchPassword) return res.status(401).json({ message: 'Incorrect password' })

    const token = jwt.sign({ id: found._id }, config.SECRET_JWT, { expiresIn: 86400 })

    // lo mando para que el Front lo capte y guarde, cookies, localStorage, reducer, donde sea más cómodo
    // https://rajaraodv.medium.com/securing-react-redux-apps-with-jwt-tokens-fcfe81356ea0
    res.json({ user : found, token });
}