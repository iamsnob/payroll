const mongoose = require('mongoose')
const Schema = mongoose.Schema

const dtrSchema = new Schema({
 start_date:String,
 end_date:String,
 no_of_days:Number,
 reg_holiday:Number,
 spc_holiday:Number,
 ot:Number,
 late:Number,
 empD_id:{type:Schema.Types.ObjectId,ref:'employeedetail'}
})

module.exports = mongoose.model('dtr', dtrSchema)