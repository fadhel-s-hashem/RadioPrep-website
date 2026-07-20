const Comment = require('../models/comment')

const createComment = async (req, res) => {
let foundInfo = await Comment.findById(req.params.infoId)

const commentData = {}
    commentData.text = req.body.text
    commentData.commentType = req.body.commentType
    commentData.author = req.session.user._id

    console.log(req.session.user._id)

    // foundInfo.Comment.push(commentData)
    // await foundInfo.save()

    // res.redirect(`/info/${req.params.infoId}`)
    res.send(' comment test work')

}


module.exports = {
    createComment,
}