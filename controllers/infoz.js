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

module.exports = {
    showNewForm,
    create,

}