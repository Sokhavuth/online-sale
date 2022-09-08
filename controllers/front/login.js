// controllers/front/login.js
import config from "../../config.js"
import bcrypt from 'bcryptjs'
import userdb from "../../models/user.js"

class Login{
    async getItem(req,res){
        this.config = await config()
        this.config.pageTitle = 'ផ្ទៀងផ្ទាត់​ពាក្យ​សំងាត់'
        this.config.route = '/login'

        res.render('base',{data:this.config})
    }

    async checkUser(req,res){
        this.config = await config()
        this.config.pageTitle = 'ផ្ទៀង​ផ្ទាត់​ពាក្យ​សំងាត់'

        let user = await userdb.checkUser(req)
      
        if(user){
            if(user.role in {'Admin':1,'Editor':1,'Author':1}){
                if(bcrypt.compareSync(req.body.password, user.password)){
                    req.session.user = user
                    res.redirect('/admin/post')
                }else{
                    this.config.message = 'ពាក្យ​សំងាត់​មិន​ត្រឹមត្រូវ​ទេ'
                    this.config.route = '/login'
                    res.render('base',{data:this.config})
                }
            }else if(user.role in {'subscriber':1}){
                this.config.message = 'សូម​ចុច​បញ្ជាក់ការចុះ​ឈ្មោះ​ក្នុង Email របស់​អ្នក​'
                this.config.route = '/login'
                res.render('base',{data:this.config})
            }
        }else{
            this.config.message = 'Email មិន​ត្រឹមត្រូវទេ'
            this.config.route = '/login'
            res.render('base',{data:this.config})
        }

    }

    async checkFBuser(req,res){
        const user = await userdb.editItem(req,req.body.id)
        if(user){
            req.session.user = user
            const redirectUrl = req.protocol + "://" + req.get('host') + '/admin/post'
            res.json({redirect:redirectUrl})
        }else{
            const redirectUrl = req.protocol + "://" + req.get('host') + '/signup'
            res.json({message:'​​​​​​​​​​​​​​​​​​​​​​​​​​​​​អ្នកមិន​ទាន់​ចុះ​ឈ្មោះ​នៅ​ឡើយ​ទេ',redirect:redirectUrl})
        }
    }
}

export default new Login()