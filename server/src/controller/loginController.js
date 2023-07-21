const Loging=require('../Model/Login')
const jwt=require('jsonwebtoken')







const SingUp=async (req,res)=>{
  try{
    const data=req.body;
    const {Nice_name,email,password}=data
    if(!Nice_name) return res.status(400).send({ status: false, msg:"Please Enter Nice_Name !!!"})
    if(!email) return res.status(400).send({ status: false, msg:"Please Enter Email !!!"})
    if(!password) return res.status(400).send({ status: false, msg:"Please Enter Password !!!"})
    const user = await Loging.findOne({email:email})
    if(user) return res.status(201).send({ status: false, msg:"this email is already in use  !!!"})
     await Loging.create(data)
    res.status(200).send({ status: true, msg:"Create successfully..."})

  }
  catch(err){
    res.status(500).send({ status: false, message: err.message })
  }
}






const login=async (req,res)=>{
  try{
    const data=req.body;
    const {email,password}=data

    const user = await Loging.findOne({email:email})
    if(!user)  return res.status(400).send({status:false,msg:"email is not present on dataBase !!!"})
    
    if(user.password !== password) return res.status(400).send({status:false,msg:"Wrong Password !!!"})
    
    let token = jwt.sign({ userId:user._id}, "rahul301")
    
    res.status(200).send({ status: true, msg:"login successfully...",data:token ,usId:user._id, na:user.Nice_name})

  }
  catch(err){
    res.status(500).send({ status: false, message: err.message })
  }
}





module.exports={SingUp,login}