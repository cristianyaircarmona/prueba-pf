//const cookieSession = require("cookie-session");
import express from "express";
import morgan from "morgan";
import cors from "cors";
import session from 'express-session'
import router from "./routes/index"
const passport = require("passport");
import {createRoles} from './controllers/initialSetUp';
import User from './models/User'
const passportSetup= require("./passport");

const app = express();
createRoles();

app.use(session({
  cookie:{maxAge: 240 * 60 * 60 *1000},
  saveUninitialized : false,  //true
  resave : false,  // true
  secret : 'keyboard__cat/..5/' 
}))
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user:any, done:any)=>{
  done(null, {id: user._id, name: user.name, email: user.email});
})

passport.deserializeUser(async(user:any, done:any)=>{
  const userDb = await User.findById(user.id)
  return done(null, {id: userDb._id, name: userDb.name, email:userDb.email})
})

app.use(cors({
  origin: "https://mundomarket.vercel.app",
  credentials: true,
}));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(router);
app.use((req:any, res:any, next:any) => {
    const error: any = new Error("Not found");
    error.status = 404;
    next(error);
  }
  );
  
  app.use((error: any, req: any, res: any, next: any) => {
    res.status(error.status || 500);
    res.json({
      error: {
        message: error.message,
      },
    });
  })
export default app;
