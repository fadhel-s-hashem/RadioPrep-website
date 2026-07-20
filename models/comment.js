// const mongoose = require("mongoose")

// const commentSchema = new mongoose.Schema({
//     text: {
//         type: String,
//         required: true,
//     }, 

//     commentType: {
//         type: String,
//         enum: ['question','suggestion','complaint','urgent'],
//         required: true,
//     },

//      author: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "User",
//         required: true,
//     },

//     info: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "Info",
//         required: true,
//     },
//     comments: [commentSchema],

// }, { timestamps: true })

// const Comment = mongoose.model("Comment", commentSchema)

// module.exports = Comment;