const mongoose=require('mongoose')

const LoginSchema = new mongoose.Schema({
    Nice_name: {
        type: String,
        required: true,
        lowercase : true,
        trim : true
    },
    email:{
        type: String,
        required: true,
        trim : true
    },
    password:{
        type:String,
        trim:true,
        require:true
    },
   
}, { timestamps: true });

module.exports = mongoose.model('Login', LoginSchema)