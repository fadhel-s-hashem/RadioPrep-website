const Listing = require('../models/comment')

const createComment = async (req, res) => {
let foundInfo = await Info.findById(req.params.infoId)

const commentData = {}
    commentData.text = req.body.text
    commentData.author = req.session.user._id

    console.log(req.session.user._id)

    res.redirect(`/info/${req.params.infoId}`)

}


module.exports = {
    createComment,
}