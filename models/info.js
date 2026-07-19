const mongoose = require("mongoose")

const infoSchema = new mongoose.Schema({

    name: {
        type:String,
        require:true,
    },

    image: {
        type: String,
        required: true,
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

    // contraindicate: {
    //     type: [String],
    //     // required: true,
    // },

    generalInfo: {
        type: String,
        required: true,
    },

}, { timestamps: true })

const Info = mongoose.model("Info", infoSchema);

module.exports = Info;