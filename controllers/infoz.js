const Info = require('../models/info')
const Comment = require('../models/comment')

const showNewForm = async (req, res) => {
    res.render("info/newInfo.ejs")
}

const create = async (req,res) => {
    console.log(req.body)

    const infoData = {}

    infoData.name = req.body.name
    infoData.radiologyUnit = req.body.radiologyUnit
    infoData.duration = req.body.duration
    infoData.generalInfo = req.body.generalInfo
    infoData.image = req.body.image
    infoData.notice = req.body.notice

    let createInfo = await Info.create(infoData)
    res.redirect('/info/index')
}

const index = async (req, res) => {
    let allInfo = await Info.find()

    res.render('info/index.ejs', 
       {allInfo: allInfo} 
    )
}

const showInfo = async (req, res) => {
    let foundInfo = await Info.findById(req.params.infoId)

    const comments = await Info.find({ info: req.params.infoId }).populate('owner').populate("comments.author")
    // foundInfo.push( req.body.notice)
    // await foundInfo.save()

    res.render('info/ShowInfo.ejs', {
        foundInfo: foundInfo
    })
}

const deleteInfo = async (req, res) => {
    let deleteInfo = await Info.findByIdAndDelete(req.params.infoId)
    res.redirect('/info/index')

}

const editInfo = async (req,res) => {
   
    let updatedInfo = await Info.findById(req.params.infoId)
    res.render('info/editInfo.ejs', 
      { foundInfo: updatedInfo }
    )
}

const updatedInfo = async (req,res) => {
    const editedInfo = {}

     editedInfo.name = req.body.name
    editedInfo.radiologyUnit = req.body.radiologyUnit
    editedInfo.duration = req.body.duration
    editedInfo.generalInfo = req.body.generalInfo
    editedInfo.image = req.body.image
    editedInfo.notice = req.body.notice

    await Info.findByIdAndUpdate(req.params.infoId , editedInfo, {new: true})
    res.redirect(`/info/${req.params.infoId}`)
}
module.exports = {
    showNewForm,
    create,
    index,
    showInfo,
    deleteInfo,
    editInfo,
    updatedInfo,
}
