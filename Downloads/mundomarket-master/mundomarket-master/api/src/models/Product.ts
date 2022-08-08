import {model,Schema} from "mongoose"


const productSchema=new Schema({
    name:{
        type:String,
        required:true, 
        unique: true        

    },
    price:{
        type:Number,
        required:true,
        default:0
    },
    description:{
        type:String,
        required:true,
        maxLength: 1000
    },
    stock:{
        type:Number,
        required:true,
        default:0
    },
    imageProduct:{
        type:Array
    },
    review:{
        type:Number,
        required:true,
        default:0
        
    },
    rating:{
        type:Number,
        required:true,
        default:0
    },
    category:{
        type: String,
        ref:"Category",
        required:true
    },

    inCart : {
        type : Boolean,
        default : false
    },
    
    envio:{
        type:String,
        required:false
    },
    
    user : {
        type : Schema.Types.ObjectId,
        ref : 'User'
   },
})

const Product=model("Product",productSchema)

export default Product

