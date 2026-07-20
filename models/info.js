const mongoose = require("mongoose");
// const { array } = require("../config/multer");

const commentSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
    }, 

    commentType: {
        type: String,
        enum: ['question','suggestion','complaint','urgent'],
        required: true,
    },

     author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

}, { timestamps: true })

const infoSchema = new mongoose.Schema({

    name: {
        type:String,
        require:true,
    },

    image: {
        type: String,
        
    },

    radiologyUnit: {
        type: String,
        enum: ['general-xray','CT','MRI','US','fluor','BMD'],
        required: true,
    },

    duration: {
        type: Number,
        required: true,
        min:0,
    },

    notice: [{
        type: String,
        // required: true,
    }],

    generalInfo: {
        type: String,
        required: true,
    },

     owner: {
        // to specfie it blong to the User
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    comments: [commentSchema],
}, { timestamps: true })

const Info = mongoose.model("Info", infoSchema)

module.exports = Info;