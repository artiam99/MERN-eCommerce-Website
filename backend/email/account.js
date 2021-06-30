const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport(
{
    service: 'gmail' ,
    auth:
    {
        user: 'shoppikart.maitra@gmail.com' ,
        pass: 'maytheforcebewithyou'
    }
})

const sendWelcomeMail = (email , name) =>
{
    transporter.sendMail({
                            to: email ,
                            from: process.env.EMAIL ,
                            subject: 'Thanks for joining ShoppiKart!' ,
                            text: `Welcome : ${name} ... This is Debarshi .. Thank you for visiting my project`
                        
                        })
}

const sendCancelationMail = (email , name) =>
{
    transporter.sendMail({
                            to: email,
                            from: process.env.EMAIL ,
                            subject: 'Sorry to see you go!' ,
                            text: `Accout deleted : ${name}`
                        
                        })
}

module.exports = {
                     sendWelcomeMail ,
                     sendCancelationMail
                 }