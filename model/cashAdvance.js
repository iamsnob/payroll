const mongoose = require('mongoose')
const Schema = mongoose.Schema

const cashAdvanceSchema = new Schema({
    start_date:String,
    end_date:String,
    amount: Number,
    deduction:Number,
    balance:Number,
    status:String,
    empD_id:{type:Schema.Types.ObjectId,ref:'employeedetail'}
})

module.exports = mongoose.model('cashAdvance',cashAdvanceSchema)