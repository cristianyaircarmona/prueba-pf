import { NextFunction, Request, Response, Router } from "express";
import Order from "../models/Order";
import Role from "../models/Role";
import Product from "../models/Product";
import { verifyToken, isAdmin } from "../controllers/authJwt";
import User from "../models/User";
import axios from 'axios';
const ObjectId = require('mongoose').Types.ObjectId; 
const route = Router()

import * as IPaypal from '../paypalInterface'

route.get("/", verifyToken, async (req: Request, res: Response, next: NextFunction) => {
    try {

        const actualUser = await User.findById(req.userId);
        const roles = await Role.find({_id: {$in : actualUser.roles}});
        const allOrders = await Order.find().populate(['products', 'user']);   
        if(roles[0].name === 'admin'){
            return res.send(allOrders)
        } else {
            const userOrders = allOrders.filter(order => order.user._id.toString() === actualUser._id.toString());
            return res.send(userOrders)
        }

    } catch (error) {
        next(error)
    }
});


route.get("/:id", verifyToken,  async(req:any, res:any) => {
    const { id } = req.params
    try {
        const found:any[]|null=await Order.findById(id).populate({path: 'user', model : 'User'})
        res.send(found? found : "Order not found" )
    } catch (error) {
        res.send({error: "Order not found"})
    }
 
});




route.post('/', verifyToken, async (req: Request, res: Response, next: NextFunction) => {
    try {

    const newOrder = new Order(req.body); //adress, paymentId, totalPrice, products : [{},{}]
    newOrder.user = req.userId 
    //newOrder.user = "62818cbf2ac82b39cd2d0783"      
    
    await newOrder.save()
   
    const updatedUser = await User.findByIdAndUpdate(
        req.userId,
        {$push: {"orders": newOrder._id}},
        {upsert: true, new : true})

    console.log(updatedUser)
    
    return res.send(newOrder)
        
    } catch (err) {
        next(err)
    }
});


route.put('/:id', verifyToken, async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { id } = req.params;
        await Order.findByIdAndUpdate({_id: id}, req.body);
        const updatedOrder = await Order.findById({_id: id});
        res.send(updatedOrder);
    } catch(err){
        next(err)
    }

});

route.delete('/:id', [verifyToken, isAdmin], async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { id } = req.params;
        const found = await Order.findByIdAndRemove({_id: id })
        res.json({ message: `Order : ${found.name} successfully deleted` })
    } catch (err) {
        next(err)
    }
});





route.post('/pay',async(req: Request, res: Response) => {

    // Todo: validar sesión del usuario
    // TODO: validar mongoID

    const getPaypalBearerToken = async():Promise<string|null> => {
    
        const PAYPAL_CLIENT = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID;
        const PAYPAL_SECRET = process.env.PAYPAL_SECRET;
    
        const base64Token = Buffer.from(`${'AQ0xQs7KJfypFz2RqDQlSnT9qYlzBaGyXFsPaTVDQIbgpvD8n1TXUV5Qh-h6vzVdlzd4QjGDFdqOJrup'}:${'EKxV7dEu_rbAR5eJEaEGZnWxUcLTxy6VHTOUT27sYUI_3FzBzXbOBpMiAqRBq93epypbnlf2JqpbzHuI'}`, 'utf-8').toString('base64');
        const body = new URLSearchParams('grant_type=client_credentials');
    
    
        try {
            
            const { data} = await axios.post( process.env.PAYPAL_OAUTH_URL || '', body, {
                headers: {
                    'Authorization': `Basic ${ base64Token }`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            });
    
            return data.access_token;
    
    
        } catch (error) {
            if ( axios.isAxiosError(error) ) {
                console.log(error.response?.data);
            } else {
                console.log(error);
            }
    
            return null;
        }
    
    
    }




    const paypalBearerToken = await getPaypalBearerToken();

    if ( !paypalBearerToken ) {
        return res.status(400).json({ message: 'No se pudo confirmar el token de paypal' })
    }

    const { transactionId = '', orderId = ''  } = req.body;


    const { data } = await axios.get<IPaypal.PaypalOrderStatusResponse>( `${ process.env.PAYPAL_ORDERS_URL }/${ transactionId }`, {
        headers: {
            'Authorization': `Bearer ${ paypalBearerToken }`
        }
    });

    if ( data.status !== 'COMPLETED' ) {
        return res.status(401).json({ message: 'Orden no reconocida' });
    }


    //await db.connect();
    const dbOrder = await Order.findById(orderId);

    if ( !dbOrder ) {
        //await db.disconnect();
        return res.status(400).json({ message: 'Orden no existe en nuestra base de datos' });
    }
    
    
    if ( dbOrder.totalPrice !== Number(data.purchase_units[0].amount.value) ) {
        //await db.disconnect();
        return res.status(400).json({ message: 'Los montos de PayPal y nuestra orden no son iguales' });
    }


    dbOrder.paymentId = transactionId;
    dbOrder.isPaid = true;
    dbOrder.products.forEach(async (producto:any)=>{
        await Product.findByIdAndUpdate(producto._id,{stock:(producto.stock-producto.quantity)})
        
    })
    await dbOrder.save();
   // await db.disconnect();

    
     res.status(200).json({ message: "Orden pagada con éxito" });
})

export default route;