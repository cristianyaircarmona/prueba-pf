const googleStrategy = require('passport-google-oauth20').Strategy;
import User from "./models/User"
import Role from './models/Role';
import passport from "passport";


const GOOGLE_CLIENT_ID= "1012946720515-gl7k319pvkodekehls7rdg80tiabf0qp.apps.googleusercontent.com"
const GOOGLE_CLIENT_SECRET= "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"

passport.use("google",new googleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/oauth/google/callback"//back   
  },
  async function(accessToken:any, refreshToken:any, profile:any, done:any) {
    //{name, email, password: await encryptPassword(password), avatar, country, city, adress, phone, cuil }
    const usuario= await User.findOne({ googleId: profile.id})
    //console.log(usuario)
    if (!usuario) {
      const ObjUser = new User();
      ObjUser.googleId=profile.id;
      ObjUser.name= profile._json.name;
      ObjUser.email= profile._json.email;
      ObjUser.password= null;
      ObjUser.avatar= profile.photos[0].value;
      ObjUser.country= " ";
      ObjUser.city= " ";
      ObjUser.adress= " ";
      ObjUser.phone= " ";
      ObjUser.cuil= " ";
      const role = await Role.findOne({ name: 'user' }); //si quiero crear un Admin, puedo cambiar el string 'user' por 'admin'
      ObjUser.roles = [role._id];
      ObjUser.orders=[];
      await ObjUser.save();
      //console.log("profile,",profile._json, "photo:",profile.photos[0].value)
      done(null,ObjUser)
      //crear usuario y token
    }else{
      done(null,usuario)
    }
    // const token= jwt.sing({id:usuario.id},'top_secret',{expiresIn: 60*60*24});
    // res.cookies('token', token);
  }
));
passport.serializeUser((user:any,done:any)=>{
    done(null,user)
})
passport.deserializeUser((user:any,done:any)=>{
    done(null,user)
})