import { model, Schema } from "mongoose"


const conversationSchema = new Schema({
    members: {
        type: Array,
    }

},
{
    timestamps : true
})
const Conversation = model("Conversation", conversationSchema)
export default Conversation