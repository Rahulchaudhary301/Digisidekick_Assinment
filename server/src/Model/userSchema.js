const mongoose=require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId;
const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        lowercase : true,
        trim : true
    },
    age: {
        type: String,
        required:true,
        trim : true
    },
    mobile:{
        type: String,
        required: true,
        trim : true
    },
    email:{
        type: String,
        required: true,
        trim : true
    },
    userId:{
        type:objectId,
            required:true,
            ref:"Login"
    },
    isDeleted: {
        type: Boolean,
        default: false,
    }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema)