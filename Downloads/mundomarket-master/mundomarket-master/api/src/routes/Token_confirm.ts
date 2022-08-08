import {Router} from "express";
import Token from '../models/Token'
import User from '../models/User'

const route=Router()

route.get('/', async(req,res, next)=>{
    try {
      const token = await Token.find()
      res.json(token)
     } catch (error) {
         next(error)
     }
  })


route.get("/:tokenId", async(req:any, res:any, next:any)=>{
  
   try {
    const token = await Token.findOne({token: req.params.tokenId})
    if(!token) return res.send("no se encontro el token")
    const user = await User.findById(token._userId)
    console.log(user)
    if(!user) return res.send("no se encontro el user")
    if(user.verificado) return res.send('usuario verificado')  
    const verificarUser = await User.findByIdAndUpdate(user.id, {verified: true})
    return res.send("token verificado")
   } catch (error) {
       next(error)
   }


});



export default route