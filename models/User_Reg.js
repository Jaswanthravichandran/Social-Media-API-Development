const mongoose = require('mongoose');
const bcrypt = require('bcrypt');


//Database Schema for User Account Creation.
const User_Reg_Schema = new mongoose.Schema({
    
    user_mail: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    user_name: {
        type: String,
        required: true
    },
    user_pass: {
        type: String,
        required: true
    },
    user_repass: {
        type: String,
        required: true
    },
});

// Hashing the Password and RE-Password here..
User_Reg_Schema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(this.user_pass, salt);

        const hashedRePassword = await bcrypt.hash(this.user_repass, salt);
    
        this.user_pass = hashedPassword;
        this.user_repass = hashedRePassword;

        next();
    } catch (error) {
        next(error);
    }
});


module.exports = mongoose.model('User_Reg',User_Reg_Schema);