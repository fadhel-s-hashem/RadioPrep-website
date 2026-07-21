const Info = require("../models/info")

const createComment = async (req, res) => {
const foundInfo = await Info.findById(req.params.infoId)

const commentData = {}

    commentData.text = req.body.text
    commentData.commentType = req.body.commentType
    commentData.author = req.session.user._id
   
    console.log(req.session.user._id)

    foundInfo.comments.push(commentData)
    await foundInfo.save()

    res.redirect(`/info/${req.params.infoId}`)
    // let createdComment = await Comment.create(commentData)
    
}

const deleteComment = async (req, res) => {
  const foundInfo = await Info.findById(req.params.infoId);
  if (!foundInfo) return res.redirect("/info/index");

  foundInfo.comments.pull(req.params.commentId);
  await foundInfo.save();

  res.redirect(`/info/${req.params.infoId}`);
}


module.exports = {
    createComment,
    deleteComment,
}