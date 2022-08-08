
import {model,Schema} from "mongoose"

const tokenSchema= new Schema({
    _userId:[{
        type: Schema.Types.ObjectId,
        ref: "User", 
        required:true       
    }],
    token:{
        type: String,
        required:true
    },
    createdAt:{
        type: Date,
        required:true,
        default:new Date(),
        expires: 43200,
    }

})
const Token= model("Token",tokenSchema)
export default Token;