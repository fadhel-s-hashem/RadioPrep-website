const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
    },

    CPR: {
        type: Number,
        require: true,
        unique: true,
        minlength: 9,
        maxlength: 9

    },

    password: {
        type: String,
        required: true,
    },

    staff: {
        type:Boolean,
        required: true,
    }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
