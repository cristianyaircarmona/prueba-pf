import {model,Schema} from "mongoose"
import Token from './Token'
import crypto from "crypto"
import uniqueValidator from "mongoose-unique-validator";
import mailer from '../controllers/nodemailer'

const validateEmail = (email:any)=>{
    const validate = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return validate.test(email)
} 

const userSchema = new Schema({

    name:{
        type:String,
        trim: true,
        required: [true, "el nombre es requerido"]
    },
    email:{
        type: String,
        trim: true,
        required: [true, "el email es requerido"],
        lowercase: true,
        unique: true,
        validate: [validateEmail, "email invalido"]
    },
    password:{
        type:String,
        required: [false, "el password es requerido"]
    },

    avatar:{
        type:String,   
    },

    orders:[
        {
            type : Schema.Types.ObjectId,
            ref : 'Order'
        }
    ],
    
    country : {
        type: String,
        required : true
    },

    city : {
        type: String,
        required : true
    },

    adress:{
        type: String,
        required: true
    },

    phone : {
        type : String,
        required : true
    },

    cuil : {
        type : String,
        required : true
    },
    googleId : {
        type : String,
        required : false
    },
    roles: [
        {
            type : Schema.Types.ObjectId,
            ref : 'Role'
        }
    ],

    products: [
        {
            type : Schema.Types.ObjectId,
            ref : 'Product'
        }
    ],

    verified : {
        type : Boolean,
        default : true,
        required : true
    },

    suspendedAccount : {
        type : Boolean,
        default : false,
        required : true
    }


}, {
    versionKey : false
});


userSchema.plugin(uniqueValidator, {message: "El {PATH} ya existe con otro usuario"})

userSchema.methods.email_Welcome= function (cb:any){
    const token = new Token({_userId: this.id, token: crypto.randomBytes(16).toString('hex')});
    const email_destination = this.email;
    token.save( (err:any)=>{
        if(err) { return console.log(err.message)}

        const emailOptions = {
            from: 'mundomarket@mundomarket.com',
            to: email_destination,
            subject: "check e-mail",
            html: `<a href= "http://localhost:3000/auth/tokenConfirmed/${token.token}">verifique su cuenta aqui</a>`

            //'Bienvenido a  MUNDOMARKET \n\n' + 'Verifique su cuenta haciendo click aqui: \n'+ 'http://localhost:3000'+ '\/token/confirmation\/' + token.token 
        };
        mailer.sendMail(emailOptions, (err:any)=>{
            if(err){return console.log(err.message)};
            console.log("A verification email has been sent to ", email_destination)
        })
    })
 
}

const User=model("User", userSchema)

export default User