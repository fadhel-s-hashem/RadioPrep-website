const Info = require('../models/info')

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
    // infoData.contraindicate = req.body.contraindicate

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
    

}
module.exports = {
    showNewForm,
    create,
    index,
    showInfo,
    deleteInfo,
    editInfo,
}