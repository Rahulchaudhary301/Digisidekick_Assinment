const UserSchema = require('../Model/userSchema');
const jwt=require('jsonwebtoken');



const CreateUser=async (req,res)=>{
  try{
    const data=req.body;
   
    const {name, age, mobile,email,userId}=data
    
    if(!name)  return res.status(400).send({ status: false, msg:"Name is require !!!"})
    if(!age)  return res.status(400).send({ status: false, msg:"Age is require !!!"})
    if(!mobile)  return res.status(400).send({ status: false, msg:"Mobile Number is require !!!"})
    if(!email)  return res.status(400).send({ status: false, msg:"Email is require !!!"})
    //if(!password)  return res.status(400).send({ status: false, msg:"Password is require !!!"})
    const isMobile=await UserSchema.find({mobile:mobile})
    if(isMobile.length !=0)  return res.status(400).send({ status: false, msg:"Mobile Number already in use !!!"})
    const isEmail=await UserSchema.find({email:email})
    if(isEmail.length !=0)  return res.status(200).send({ status: false, msg:"Email Id already in use !!!"})
    await UserSchema.create(data)
    res.status(201).send({ status: true, msg:"create successfully..."})

  }
  catch(err){
    res.status(500).send({ status: false, message: err.message })
  }
}







  const allUser=async (req,res)=>{
    try{
     
      
      const alluser = await UserSchema.find({isDeleted:false}).sort({_id:-1})
      if(alluser.length==0) return res.status(400).send({ status: false, msg:"No any user Found !!!"})

      res.status(200).send({ status: true, data:alluser})
  
    }
    catch(err){
      res.status(500).send({ status: false, message: err.message })
    }
  }


  
  const DeleteUser=async (req,res)=>{
    try{
     
      const data=req.body
      const{email,isDeleted,id,usId}=data
     
      const d = await UserSchema.findOne({_id:id})
      let x=d.userId
      let y=x.toString()
      if(usId!=y) return res.status(400).send({ status: false, msg:"You are not Authorized to delete other Data !!!"})
      const delet = await UserSchema.findOneAndUpdate({email:email},{$set:{isDeleted:isDeleted}})
      
      res.status(200).send({ status: true, msg:"Delete successfully !!!"})
  
    }
    catch(err){
      res.status(500).send({ status: false, message: err.message })
    }
  }



  const SingleData=async (req,res)=>{
    try{
     
      const data=req.body
      const{email}=data
      
      const user = await UserSchema.findOne({email:email})
      res.status(200).send({ status: true, data:user})
  
    }
    catch(err){
      res.status(500).send({ status: false, message: err.message })
    }
  }




  const UpdateData=async (req,res)=>{
    try{
    
      const id=req.body.header.id
      const usId=req.body.header.usId
      const data=req.body.data
      const{name,email,mobile,password,age}=data
      
      const d = await UserSchema.findOne({_id:id})
      let x=d.userId
      let y=x.toString()
      if(usId !=y) return res.status(400).send({ status: false, msg:"Sorry You are not Authorized to Update other Data !!!"})


      if( Object.keys(data).length==0) return res.status(200).send({ status: true, msg:'No Update'})
      if(name=='') return res.status(400).send({ status: false, msg:'Nothing Update'})
      if(age=='') return res.status(400).send({ status: false, msg:'Nothing Update'})
      if(email=='') return res.status(400).send({ status: false, msg:'Nothing Update'})
      if(mobile=='') return res.status(400).send({ status: false, msg:'Nothing Update'})
      if(password=='') return res.status(400).send({ status: false, msg:'Nothing Update'})

       await UserSchema.findOneAndUpdate({_id:id},{$set:data},{new:true})
      
      
      res.status(200).send({ status: true, msg:"Update successfully !!!"})
  
    }
    catch(err){
      res.status(500).send({ status: false, message: err.message })
    }
  }






  
  const MyData=async (req,res)=>{
    try{
     
      const data=req.body
      const{id}=data
      const user = await UserSchema.find({userId:id})
      res.status(200).send({ status: true, data:user})
  
    }
    catch(err){
      res.status(500).send({ status: false, message: err.message })
    }
  }












module.exports={CreateUser,allUser,DeleteUser,SingleData,UpdateData,MyData}