const mongoose = require("mongoose")

const infoSchema = new mongoose.Schema({

    image: {
        type: String,
        required: true,
    },

    radiologyUnit: {
        type: String,
        enum: ['xray','CT','MRI','US','fluor','BMD'],
        default: 'xray',
        required: true,
    },

    duration: {
        type: Number,
        required: true,
    },

    contraindicate: {
        type: [String],
        required: true,
    },

    generalInfo: {
        type: String,
        required: true,
    },

}, { timestamps: true })

const Info = mongoose.model("Info", infoSchema);

module.exports = Info;