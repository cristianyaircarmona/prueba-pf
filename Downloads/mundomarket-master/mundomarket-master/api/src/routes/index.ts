import {Router} from "express";

import user from "./Users";
import product from "./Products";
import category from "./Categories";
import token_confirmed from "./Token_confirm";
import order from './Orders';
import conversation from "./Conversations";
import message from "./Messages";
const authRoute= require("./auth")


const route=Router() ;

route.use("/users", user) //CRUD de usuario - ADMIN lee y borra => implementar ban y permaban?
route.use('/auth/tokenConfirmed', token_confirmed)   

route.use("/products", product) //CRUD - User y Admin
route.use("/categories",category) // CRUD - Admin
// route.use("/products-cart", productCart) // CRUD - User y Admin
route.use('/oauth', authRoute)
route.use("/orders", order) 

route.use('/conversations', conversation)
route.use('/messages', message)





export default route