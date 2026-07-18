const Listing = require('../models/info')

const showNewForm = (req, res) => {
    res.render("info/newInfo.ejs")
}


module.exports = {
    showNewForm,

}