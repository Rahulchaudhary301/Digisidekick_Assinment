const express=require('express')
const mongoose=require('mongoose')
const app=express()
const cors=require('cors')
const Route=require('./Router/Route')
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://RahulChaudhary:Rahul321@cluster1.42h1ws9.mongodb.net/CompanyAssinment?retryWrites=true&w=majority", { useNewUrlParser: true })
.then(()=>console.log("mongoDB is connected"))
.catch((err)=>console.log(err))

app.use('/',Route)


app.listen(5000,()=>console.log('Express is listen on 5000 PORT'))