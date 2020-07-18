const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TLSchema = new Schema({
    name:String
})

module.exports = mongoose.model('teamleader',TLSchema)