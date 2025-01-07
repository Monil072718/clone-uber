const mongoose = require('mongoose')
const bycrpt =  require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    fullname:{
        firstname:{
            type: String,
            required: true,
        },
        lastname:{
            type: String,
            required: true,
        }
    },
    email:{
        type: String,
        required: true
    },
    passsword:{
        type: String,
        required: true,
        select: false,
    },
    socketId: {
        type : String,
    }
})

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id } , process.env.JWT_SECRET )
    return token;
}

userSchema.method.comparePassword = async function (passsword) {
    return await bycrpt.compare(passsword, this.passsword);
}

userSchema.statics.hashPassword = async function (passsword) {
    return await bycrpt.hash(passsword , 10)
}

const userModel = mongoose.model('User' , userSchema);

module.exports = userModel;