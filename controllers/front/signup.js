// controllers/front/signup.js
// npm install nodemailer
// npm install jsonwebtoken
import config from "../../config.js"
import userdb from '../../models/user.js'
import nodemailer from 'nodemailer'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config()

class Signup{
    async getItem(req,res){
        this.config = await config()
        this.config.pageTitle = 'ទំព័រ​ចុះ​ឈ្មោះ​'
        this.config.route = '/signup'

        res.render('base',{data:this.config})
    }

    async registerItem(req,res){
        this.config = await config()
        this.config.pageTitle = 'ទំព័រ​ចុះ​ឈ្មោះ​'
        this.config.route = '/signup'

        if(req.body.password === req.body.password1){
            if(await userdb.checkUser(req)){
                this.config.message = 'Email នេះ​មាន​គេ​ប្រើ​រួច​ហើយ ជ្រើសរើស​ Email ថ្មី​'
                res.render('base',{data:this.config})
            }else{
                this.config.message = `សារ​មួយ​ត្រូវ​បាន​ផ្ញើរ​ទៅ​ Email របស់​លោក​អ្នក សូម​ចុច​បញ្ជាក់​ពី​ការ​ចុះ​ឈ្មោះ​នេះ​`
                this.config.route = '/signup/confirm'
                const userid = await userdb.registerItem(req)
                await this.emailConfirm(req,userid)
                res.render('base',{data:this.config})
            }
        }else{
            this.config.message = 'ពាក្យ​សំងាត់​មិន​ដូច​គ្នា​ទេ សាកល្បង​ម្តង​ទៀត'
            res.render('base',{data:this.config})
        }
    }

    async emailConfirm(req,userid){
        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_SECRET
            }
        })
         
        let mailDetails = {
            from: process.env.EMAIL_USER,
            to: req.body.email,
            subject: 'Signup Confirmation',
            text: `ចុច​តំណរភ្ជាប់​នេះ​ដើម្បី​សំរេច​​ចុះ​ឈ្មោះ ${await this.generateToken(req,userid)}`
        }
         
        mailTransporter.sendMail(mailDetails, function(err, data) {
            if(err) {
                console.log(err)
            } else {
                console.log('Email sent successfully')
            }
        })
    }

    async generateToken(req,userid){
        const hostUrl = req.protocol + "://" + req.get('host')

        const date = (new Date()).toString()
        const mail = {
            id: userid,
            created: date
        }

        const token = jwt.sign(mail,process.env.SECRET_KEY,{expiresIn: '1d'})
        return (hostUrl + "/signup/verify/" + token)
    }

    async verifyToken(req,res){
        this.config = await config()
        const token = req.params.token
        if(token){
            try{
                jwt.verify(token,process.env.SECRET_KEY,(err,decoded)=>{
                    if(err){
                        console.log(err)
                        return res.sendStatus(403)
                    }else{
                        userdb.upgradeItem(req,decoded.id)
                        this.config.pageTitle = 'ផ្ទៀងផ្ទាត់​ពាក្យ​សំងាត់'
                        this.config.route = '/login'
                        this.config.message = 'អ្នក​អាច​​​​​​​​​​​​ចុះឈ្មោះចុះ​ផ្សាយ​លក់​ទំនិញ​បាន​ហើយ'

                        res.render('base',{data:this.config})
                    }
                })
            }catch(err){
                console.log(err)
                return res.sendStatus(403)
            }
        }else{
            return res.sendStatus(403)
        }
    }

    async postFBuser(req,res){
        const user = await userdb.editItem(req,req.body.id)
        const redirectUrl = req.protocol + "://" + req.get('host') + '/login'

        if(user){
            res.json({message:'Facebook នេះត្រូវ​បាន​ចុះ​បញ្ជី​រួចម្តង​​ហើយ',redirect:redirectUrl})
        }else{
            await userdb.postFBuser(req)
            res.json({message:'Facebook លោក​អ្នក​ត្រូវ​បាន​ចុះបញ្ជី​រួចរាល់​ហើយ',redirect:redirectUrl})
        }
    }
}

export default new Signup()