const express=require('express')
const router=express.Router()
const UserController=require('../controller/userController')
const middilewhere=require('../middileWhere/middilewhere')
const LoginController=require('../controller/loginController')



router.get('/',(req,res)=>{
    res.send({msg:'connect successfully....'})
})

 router.post('/signup',LoginController.SingUp)

 router.post('/login',LoginController.login)

router.post('/create',UserController.CreateUser)

router.get('/allUser',UserController.allUser)

router.put('/delete',UserController.DeleteUser)

router.post('/getSinleData',UserController.SingleData)

router.put('/updateData',UserController.UpdateData)

router.post('/myData',UserController.MyData)




module.exports=router