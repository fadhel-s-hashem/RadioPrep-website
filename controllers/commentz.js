const Info = require("../models/info")

const createComment = async (req, res) => {
let foundInfo = await Info.findById(req.params.infoId)

const commentData = {}
    commentData.text = req.body.text
    commentData.commentType = req.body.commentType
    commentData.author = req.session.user._id
   
    

    console.log(req.session.user._id)

    foundInfo.comments.push(commentData)
    await foundInfo.save()

    // res.redirect(`/info/${req.params.infoId}`)
    // let createdComment = await Comment.create(commentData)
    res.send(' comment test work')

}


module.exports = {
    createComment,
}