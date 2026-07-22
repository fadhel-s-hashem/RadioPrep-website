const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },

    CPR: {
        type: String,
        require: true,
        trim: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
        trim: true,
        
    },

    staff: {
        type:Boolean,
        required: true,
    }, 

    // passkey: {
    //     type: String,
    // }
})

const User = mongoose.model("User", userSchema)

module.exports = User
