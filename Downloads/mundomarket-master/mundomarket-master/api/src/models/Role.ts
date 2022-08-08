import { Schema, model } from 'mongoose';

const RoleSchema = new Schema({
    name: String
}, {
    versionKey: false
});


const Role = model("Role", RoleSchema)

export default Role;