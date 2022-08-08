import { model, Schema } from "mongoose"

const messageSchema = new Schema({
    conversationId: {
        type: String,
    },

    sender : {
        type : String
    },

    text : {
        type : String
    }
},
{
    timestamps : true
})
const Message = model("Message", messageSchema)
export default Message