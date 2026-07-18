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
    res.send(req.body)
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

module.exports = {
    showNewForm,
    create,
    index,
    showInfo,

}