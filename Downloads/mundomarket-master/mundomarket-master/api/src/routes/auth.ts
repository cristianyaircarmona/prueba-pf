const passport = require("passport");
const router= require("express").Router();
import Token from '../models/Token'
import crypto from "crypto"
import User from "../models/User"
import jwt from "jsonwebtoken";
const CLIENT_URL = "https://mundomarket.vercel.app"//front
import config from '../config'

router.get("/login/failed", (req:any,res:any)=>{
res.status(401).json({
    success: false,
    message: "failure",
});
});
router.get("/login/success", (req:any, res:any) => {
    if (req.user) {
      res.status(200).json({
        success: true,
        message: "successfull",
        user: req.user,
        // cookies: req.cookies
      });
    }
  });
router.get("/logout", (req:any, res:any)=>{
    req.logout();
    res.redirect(CLIENT_URL);
});
router.get("/google",passport.authenticate("google",{ scope: ["profile", "email"]}))

router.get("/google/callback", passport.authenticate("google", {
  scope: ['https://www.googleapis.com/auth/plus.login']
      //  ,successRedirect: CLIENT_URL,
      //  failuredRedirect: "/login/failed"
      }),
  async function (req:any, res:any) {
    console.log(req.user)
  if (req.user) {
    //creando token en bd
    const tokenBus= await Token.findOne({ _userId: req.user._id})
    if (!tokenBus) {
      const token = jwt.sign({ id: req.user._id }, config.SECRET_JWT, { expiresIn: 86400 })
      // })
      const ObjToken = new Token();
      ObjToken._userId= [req.user._id];
      ObjToken.token = token;
      await ObjToken.save();
      res.cookie('x-access-token',token)
    //-------------------------------
    }else{
      res.cookie('x-access-token',tokenBus.token)
    }
    res.redirect(CLIENT_URL+"/home")
  } else {
    res.redirect(CLIENT_URL)
  }
}
);
// router.get("/google/callback", passport.authenticate("google", {
//     successRedirect: CLIENT_URL,
//     failuredRedirect: "/login/failed"
// }))

module.exports = router