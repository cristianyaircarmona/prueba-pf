
import nodemailer from 'nodemailer';


// const config ={
//   host: "smtp.mailtrap.io",
//   port: 2525,
//   auth: {
//     user: "fd61c5f9d084e3",
//     pass: "ab3046da4614aa"
//   }
 


//cambiar credenciales de mailtrap  para recibir el mail

const config ={
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "22a944af9ea5a7",
    pass: "3cd71d8a33081f"
  }
}


const mailer = nodemailer.createTransport(config)
export default mailer;