import { Router } from "express";
import Product from "../models/Product"
import {verifyToken, isAdmin} from '../controllers/authJwt'
import { Request, Response, NextFunction } from "express";
import User from "../models/User";
const route= Router()




route.get("/", async (req:any, res:any,next:any) => {

    const {name, names, sort, filterName, filterOrder} = req.query
    
    if(name){
        try {
            const productName: any[] = await Product.find({ name: {$regex: req.query.name, $options:'i'}})
            return productName.length === 0 ? res.json({"message" : "not found product"}) : res.json(productName)
            } catch (error) {
            next(error)
        }
    } 
    else if(names || sort || filterName || filterOrder) {
        try {
            if (typeof(names) === 'string' && typeof(filterName) === 'string' ) {
                
                const objFilter: any = {}
                objFilter[filterName] = filterOrder
              
                 const objOrder: any = {}
                objOrder[names] = sort
                
                const product = await Product.find(objFilter).sort(objOrder)
                res.json(product.length === 0? "not found product" : product)
            
            } else {
                res.send("not found product")
            }
           
        } catch (error) {
            next(error)
        }
    }else {
        
        try {
            const allProduct  = await Product.find({})
            return res.json(allProduct)
        } catch (error) {
            next(error)
        }
    }
   
});


route.post('/', verifyToken, async (req:any, res:any) => {

    try {
            const found = await Product.findOne({ name: req.body.name })

        if (found) {
            res.send('You can´t post the same product twice')
        }
        else {
            const newProduct = new Product(req.body);

            newProduct.user = [req.userId]            
           
            await newProduct.save()
            
            const updatedUser = await User.findByIdAndUpdate(
                req.userId,
                {$push: {"products": newProduct._id}},
                {upsert: true, new : true})

            console.log(updatedUser)
            return res.send('Product created')
        }

    } catch (err) {
        res.send(err)
    }
});


route.get("/:id",  async(req:any, res:any) => {
    console.log(req.userId)
    let id:string=req.params.id;
    try {
        let resultado:any[]|null=await Product.findById(id).populate(['user'])
        res.send(resultado? resultado : "No se encuentra el producto" )
    } catch (error) {
        res.send({error: "No se encuentra el producto"})
    }
 
});


route.put('/:id', verifyToken, async (req: Request, res: Response, next: NextFunction) => {

    try {
        const { id } = req.params;
        await Product.findByIdAndUpdate({_id: id}, req.body);
        const updatedProduct = await Product.findById({_id: id});
        res.send(updatedProduct);
    } catch(err){
        next(err)
    }

});


route.delete("/:id", verifyToken, async (req:any, res:any, next:any)=>{
    try {
        const id = req.query.id
        if(id){
        await Product.findByIdAndDelete(id)
        return res.send("Removed product")
        }
        res.send("Product ID needed")
 
    } catch (error) {
        next(error)
    }
 });


             

export default route