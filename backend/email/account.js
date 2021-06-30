const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport(
{
    service: 'gmail' ,
    auth:
    {
        user: process.env.EMAIL ,
        pass: process.env.PASSWORD
    }
})

const sendWelcomeMail = (email , name) =>
{
    transporter.sendMail({
                            to: email ,
                            from: process.env.email ,
                            subject: 'Thanks for joining ShoppiKart!' ,
                            text: `Welcome : ${name} ... This is Debarshi .. Thank you for visiting my project`
                        
                        })
        }

const sendCancelationMail = (email , name) =>
{
    transporter.sendMail({
                            to: email,
                            from: 'yoda99.dm@gmail.com' ,
                            subject: 'Sorry to see you go!' ,
                            text: `Accout deleted : ${name}`
                        
                        })
}

module.exports = {
                     sendWelcomeMail ,
                     sendCancelationMail
                 }