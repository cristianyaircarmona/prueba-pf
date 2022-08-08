import {model,Schema} from "mongoose"


const categorySchema= new Schema({
    name:{
        type:String,
        required:true,
        maxLength:60
    }

})
const Category= model("Category",categorySchema)
export default Category