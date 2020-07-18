const mongoose = require('mongoose')
const Schema = mongoose.Schema

const positionSchema = new Schema({
    name:String
})

module.exports = mongoose.model('position',positionSchema)